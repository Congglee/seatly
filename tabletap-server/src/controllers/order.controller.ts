import { DishStatus, OrderStatus, TableStatus } from '@/constants/type'
import prisma from '@/database'
import { CreateOrdersBodyType, UpdateOrderBodyType } from '@/schemas/order.schema'

export const createOrdersController = async (orderHandlerId: string, body: CreateOrdersBodyType) => {
  const { guestId, orders } = body

  const guest = await prisma.guest.findUniqueOrThrow({
    where: { id: guestId }
  })

  if (guest.tableNumber === null) {
    throw new Error('Table associated with this guest has been deleted, please select another guest')
  }

  const table = await prisma.restaurantTable.findUniqueOrThrow({
    where: { number: guest.tableNumber }
  })

  if (table.status === TableStatus.Hidden) {
    throw new Error(`Table ${table.number} associated with this guest is hidden, please select another guest`)
  }

  const [ordersRecord, socketRecord] = await Promise.all([
    prisma.$transaction(async (tx) => {
      const ordersRecord = await Promise.all(
        orders.map(async (order) => {
          const dish = await tx.dish.findUniqueOrThrow({
            where: { id: order.dishId }
          })

          if (dish.status === DishStatus.Unavailable) {
            throw new Error(`Dish ${dish.name} is out of stock`)
          }

          if (dish.status === DishStatus.Hidden) {
            throw new Error(`Dish ${dish.name} cannot be ordered`)
          }

          const dishSnapshot = await tx.dishSnapshot.create({
            data: {
              description: dish.description,
              image: dish.image,
              name: dish.name,
              price: dish.price,
              dishId: dish.id,
              status: dish.status
            }
          })

          const orderRecord = await tx.order.create({
            data: {
              dishSnapshotId: dishSnapshot.id,
              guestId,
              quantity: order.quantity,
              tableNumber: guest.tableNumber,
              orderHandlerId,
              status: OrderStatus.Pending
            },
            include: {
              dishSnapshot: true,
              guest: true,
              orderHandler: true
            }
          })

          type OrderRecord = typeof orderRecord

          return orderRecord as OrderRecord & {
            status: (typeof OrderStatus)[keyof typeof OrderStatus]
            dishSnapshot: OrderRecord['dishSnapshot'] & {
              status: (typeof DishStatus)[keyof typeof DishStatus]
            }
          }
        })
      )

      return ordersRecord
    }),

    prisma.socket.findUnique({
      where: { guestId: body.guestId }
    })
  ])

  return { orders: ordersRecord, socketId: socketRecord?.socketId }
}

export const getOrdersController = async ({
  fromDate,
  toDate,
  page,
  limit
}: {
  fromDate?: Date
  toDate?: Date
  page: number
  limit: number
}) => {
  const data = await prisma.order.findMany({
    skip: (page - 1) * limit,
    take: limit,
    include: {
      dishSnapshot: true,
      orderHandler: true,
      guest: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      createdAt: {
        gte: fromDate,
        lte: toDate
      }
    }
  })

  const totalItem = await prisma.order.count({
    where: {
      createdAt: {
        gte: fromDate,
        lte: toDate
      }
    }
  })
  const totalPage = Math.ceil(totalItem / limit)

  return { items: data, totalItem, page, limit, totalPage }
}

// Controller to pay orders based on guestId
export const payOrdersController = async ({ guestId, orderHandlerId }: { guestId: string; orderHandlerId: string }) => {
  const orders = await prisma.order.findMany({
    where: {
      guestId,
      status: {
        in: [OrderStatus.Pending, OrderStatus.Processing, OrderStatus.Delivered]
      }
    }
  })

  if (orders.length === 0) {
    throw new Error('No orders need to be paid')
  }

  await prisma.$transaction(async (tx) => {
    const orderIds = orders.map((order) => order.id)
    const guest = await tx.guest.findUnique({
      where: { id: guestId }
    })

    await tx.order.updateMany({
      where: {
        id: { in: orderIds }
      },
      data: {
        status: OrderStatus.Paid,
        orderHandlerId
      }
    })

    await tx.guest.update({
      where: { id: guestId },
      data: {
        sessionStatus: 'Completed',
        endedAt: new Date(),
        refreshToken: null,
        refreshTokenExpiresAt: null,
        lastActivityAt: new Date()
      }
    })

    if (guest?.tableNumber !== null && guest?.tableNumber !== undefined) {
      await tx.restaurantTable.update({
        where: { number: guest.tableNumber },
        data: {
          isOccupied: false,
          lastActivityAt: new Date()
        }
      })
    }
  })

  const [ordersResult, sockerRecord] = await Promise.all([
    prisma.order.findMany({
      where: {
        id: { in: orders.map((order) => order.id) }
      },
      include: {
        dishSnapshot: true,
        orderHandler: true,
        guest: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    }),

    prisma.socket.findUnique({
      where: { guestId }
    })
  ])

  return { orders: ordersResult, socketId: sockerRecord?.socketId }
}

export const getOrderDetailController = (orderId: string) => {
  return prisma.order.findUniqueOrThrow({
    where: { id: orderId },
    include: {
      dishSnapshot: true,
      orderHandler: true,
      guest: true,
      table: true
    }
  })
}

export const updateOrderController = async (
  orderId: string,
  body: UpdateOrderBodyType & { orderHandlerId: string }
) => {
  const { status, dishId, quantity, orderHandlerId } = body

  const result = await prisma.$transaction(async (tx) => {
    const order = await prisma.order.findUniqueOrThrow({
      where: {
        id: orderId
      },
      include: {
        dishSnapshot: true
      }
    })

    let dishSnapshotId = order.dishSnapshotId

    if (order.dishSnapshot.dishId !== dishId) {
      const dish = await tx.dish.findUniqueOrThrow({
        where: { id: dishId }
      })

      const dishSnapshot = await tx.dishSnapshot.create({
        data: {
          description: dish.description,
          image: dish.image,
          name: dish.name,
          price: dish.price,
          dishId: dish.id,
          status: dish.status
        }
      })

      dishSnapshotId = dishSnapshot.id
    }
    const newOrder = await tx.order.update({
      where: { id: orderId },
      data: {
        status,
        dishSnapshotId,
        quantity,
        orderHandlerId
      },
      include: {
        dishSnapshot: true,
        orderHandler: true,
        guest: true
      }
    })

    return newOrder
  })

  const socketRecord = await prisma.socket.findUnique({
    where: { guestId: result.guestId! }
  })

  return { order: result, socketId: socketRecord?.socketId }
}
