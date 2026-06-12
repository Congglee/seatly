import { OrderStatus, PaymentMethod, PaymentProvider, PaymentStatus } from '@/constants/type'
import prisma from '@/database'
import { buildPaymentCode } from '@/utils/payment'
import { randomUUID } from 'crypto'

const billableOrderStatuses = [OrderStatus.Pending, OrderStatus.Processing, OrderStatus.Delivered]

type PaymentMethodValue = (typeof PaymentMethod)[keyof typeof PaymentMethod]
type PaymentProviderValue = (typeof PaymentProvider)[keyof typeof PaymentProvider]

const orderInclude = {
  dishSnapshot: true,
  orderHandler: true,
  guest: true
} as const

const getOrdersTotal = (orders: Array<{ dishSnapshot: { price: number }; quantity: number }>) => {
  return orders.reduce((total, order) => total + order.dishSnapshot.price * order.quantity, 0)
}

export const settleGuestOrdersPayment = async ({
  guestId,
  paymentId,
  method,
  provider,
  confirmedByAccountId
}: {
  guestId: string
  paymentId?: string
  method: PaymentMethodValue
  provider?: PaymentProviderValue
  confirmedByAccountId?: string
}) => {
  const result = await prisma.$transaction(async (tx) => {
    const guest = await tx.guest.findUniqueOrThrow({
      where: { id: guestId }
    })

    const billableOrders = await tx.order.findMany({
      where: {
        guestId,
        ...(paymentId ? { paymentId } : {}),
        status: {
          in: billableOrderStatuses
        }
      },
      include: orderInclude,
      orderBy: {
        createdAt: 'desc'
      }
    })

    if (billableOrders.length === 0) {
      const paidOrders = await tx.order.findMany({
        where: {
          guestId,
          ...(paymentId ? { paymentId } : {}),
          status: OrderStatus.Paid
        },
        include: orderInclude,
        orderBy: {
          createdAt: 'desc'
        }
      })

      if (paidOrders.length > 0) {
        return { orders: paidOrders, alreadySettled: true }
      }

      throw new Error('No orders need to be paid')
    }

    let settledPaymentId = paymentId

    if (!settledPaymentId) {
      const pendingPayment = await tx.payment.findFirst({
        where: {
          guestId,
          status: PaymentStatus.Pending
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      if (pendingPayment) {
        settledPaymentId = pendingPayment.id
      }
    }

    if (!settledPaymentId) {
      const newPaymentId = randomUUID()
      const amount = getOrdersTotal(billableOrders)

      const payment = await tx.payment.create({
        data: {
          id: newPaymentId,
          code: buildPaymentCode(newPaymentId),
          guestId,
          tableNumber: guest.tableNumber,
          amount,
          status: PaymentStatus.Succeeded,
          method,
          provider: provider ?? null,
          paidAt: new Date(),
          confirmedByAccountId
        }
      })

      settledPaymentId = payment.id
    } else {
      const amount = getOrdersTotal(billableOrders)

      await tx.payment.update({
        where: { id: settledPaymentId },
        data: {
          amount,
          status: PaymentStatus.Succeeded,
          method,
          provider: provider ?? null,
          paidAt: new Date(),
          confirmedByAccountId
        }
      })
    }

    await tx.order.updateMany({
      where: {
        id: {
          in: billableOrders.map((order) => order.id)
        }
      },
      data: {
        status: OrderStatus.Paid,
        orderHandlerId: confirmedByAccountId,
        paymentId: settledPaymentId
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

    if (guest.tableNumber !== null) {
      await tx.restaurantTable.update({
        where: { number: guest.tableNumber },
        data: {
          isOccupied: false,
          lastActivityAt: new Date()
        }
      })
    }

    const orders = await tx.order.findMany({
      where: {
        id: {
          in: billableOrders.map((order) => order.id)
        }
      },
      include: orderInclude,
      orderBy: {
        createdAt: 'desc'
      }
    })

    return { orders, alreadySettled: false }
  })

  const socketRecord = await prisma.socket.findUnique({
    where: { guestId }
  })

  return { ...result, socketId: socketRecord?.socketId }
}
