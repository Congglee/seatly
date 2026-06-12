import envConfig from '@/config/environment'
import { DishStatus, OrderStatus, PaymentStatus, Role, TableStatus } from '@/constants/type'
import prisma from '@/database'
import { type GuestCreateOrdersBodyType, type GuestLoginBodyType } from '@/schemas/guest.schema'
import { TokenPayload } from '@/types/jwt.type'
import { AuthError } from '@/utils/errors'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/utils/jwt'
import ms, { type StringValue } from 'ms'

export const guestLoginController = async (body: GuestLoginBodyType) => {
  let guest = await prisma.$transaction(async (tx) => {
    const table = await tx.restaurantTable.findUnique({
      where: { number: body.tableNumber, token: body.token }
    })

    if (!table) {
      throw new Error('Table does not exist or token is incorrect')
    }

    if (table.status === TableStatus.Hidden) {
      throw new Error('Table is hidden, please select another table to login')
    }

    if (table.status === TableStatus.Reserved) {
      throw new Error('Table is reserved, please contact staff for support')
    }

    const lockTableResult = await tx.restaurantTable.updateMany({
      where: {
        number: body.tableNumber,
        isOccupied: false
      },
      data: {
        isOccupied: true,
        occupiedAt: new Date(),
        lastActivityAt: new Date()
      }
    })

    if (lockTableResult.count === 0) {
      throw new Error('Table is currently occupied, please contact staff for support')
    }

    return tx.guest.create({
      data: {
        name: body.name,
        tableNumber: body.tableNumber,
        sessionStatus: 'Active',
        lastActivityAt: new Date(),
        endedAt: null
      }
    })
  })

  const refreshToken = signRefreshToken(
    { userId: guest.id, role: Role.Guest },
    { expiresIn: ms(envConfig.GUEST_REFRESH_TOKEN_EXPIRES_IN as StringValue) }
  )

  const accessToken = signAccessToken(
    { userId: guest.id, role: Role.Guest },
    { expiresIn: ms(envConfig.GUEST_ACCESS_TOKEN_EXPIRES_IN as StringValue) }
  )

  const decodedRefreshToken = verifyRefreshToken(refreshToken)

  const refreshTokenExpiresAt = new Date(decodedRefreshToken.exp * 1000)

  guest = await prisma.guest.update({
    where: { id: guest.id },
    data: { refreshToken, refreshTokenExpiresAt }
  })

  return { guest, accessToken, refreshToken }
}

export const guestLogoutController = async (id: string) => {
  const guest = await prisma.guest.findUniqueOrThrow({
    where: { id },
    include: {
      orders: {
        where: {
          status: {
            in: [OrderStatus.Pending, OrderStatus.Processing, OrderStatus.Delivered]
          }
        }
      }
    }
  })

  await prisma.$transaction(async (tx) => {
    await tx.guest.update({
      where: { id },
      data: {
        refreshToken: null,
        refreshTokenExpiresAt: null,
        sessionStatus: guest.orders.length > 0 ? guest.sessionStatus : 'LoggedOut',
        endedAt: guest.orders.length > 0 ? guest.endedAt : new Date(),
        lastActivityAt: new Date()
      }
    })

    if (guest.tableNumber !== null && guest.orders.length === 0) {
      await tx.restaurantTable.update({
        where: { number: guest.tableNumber },
        data: {
          isOccupied: false,
          lastActivityAt: new Date()
        }
      })
    }
  })

  return 'Logout successfully'
}

export const guestRefreshTokenController = async (refreshToken: string) => {
  let decodedRefreshToken: TokenPayload

  try {
    decodedRefreshToken = verifyRefreshToken(refreshToken)
  } catch (error) {
    throw new AuthError('Refresh token is invalid')
  }

  const newRefreshToken = signRefreshToken({
    userId: decodedRefreshToken.userId,
    role: Role.Guest,
    exp: decodedRefreshToken.exp
  })

  const newAccessToken = signAccessToken(
    { userId: decodedRefreshToken.userId, role: Role.Guest },
    {
      expiresIn: ms(envConfig.GUEST_ACCESS_TOKEN_EXPIRES_IN as StringValue)
    }
  )

  await prisma.guest.update({
    where: { id: decodedRefreshToken.userId },
    data: {
      refreshToken: newRefreshToken,
      refreshTokenExpiresAt: new Date(decodedRefreshToken.exp * 1000)
    }
  })

  return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}

export const guestCreateOrdersController = async (guestId: string, body: GuestCreateOrdersBodyType) => {
  const result = await prisma.$transaction(async (tx) => {
    const guest = await tx.guest.findUniqueOrThrow({
      where: { id: guestId }
    })

    await tx.payment.updateMany({
      where: {
        guestId,
        status: PaymentStatus.Pending
      },
      data: {
        status: PaymentStatus.Expired
      }
    })

    if (guest.tableNumber === null) {
      throw new Error('Table you are using has been deleted, please logout and login again to another table')
    }

    const table = await tx.restaurantTable.findUniqueOrThrow({
      where: { number: guest.tableNumber }
    })

    if (table.status === TableStatus.Hidden) {
      throw new Error(`Table ${table.number} is hidden, please logout and select another table`)
    }

    if (table.status === TableStatus.Reserved) {
      throw new Error(`Table ${table.number} is reserved, please logout and select another table`)
    }

    const orders = await Promise.all(
      body.map(async (order) => {
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
            orderHandlerId: null,
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

    return orders
  })

  return result
}

export const guestGetOrdersController = async (guestId: string) => {
  const orders = await prisma.order.findMany({
    where: { guestId },
    include: {
      dishSnapshot: true,
      orderHandler: true,
      guest: true
    }
  })
  return orders
}
