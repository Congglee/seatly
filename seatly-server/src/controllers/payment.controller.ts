import envConfig from '@/config/environment'
import { OrderStatus, PaymentMethod, PaymentProvider, PaymentStatus, PaymentTransactionStatus } from '@/constants/type'
import { settleGuestOrdersPayment } from '@/controllers/payment-settlement.controller'
import prisma from '@/database'
import { SepayWebhookBody, SepayWebhookBodyType } from '@/schemas/payment.schema'
import {
  buildPaymentCode,
  buildSepayQrUrl,
  getPaymentCodeCandidates,
  getPaymentExpiresAt,
  isPaymentExpired,
  parseSepayTransactionDate
} from '@/utils/payment'
import { randomUUID } from 'crypto'

const billableOrderStatuses = [OrderStatus.Pending, OrderStatus.Processing, OrderStatus.Delivered]

const getOrdersTotal = (orders: Array<{ dishSnapshot: { price: number }; quantity: number }>) => {
  return orders.reduce((total, order) => total + order.dishSnapshot.price * order.quantity, 0)
}

const reviewableTransactionStatuses = [
  PaymentTransactionStatus.Unmatched,
  PaymentTransactionStatus.NeedsReview
] as const

const findPaymentFromWebhookBody = async (body: SepayWebhookBodyType) => {
  const paymentCodeCandidates = getPaymentCodeCandidates({ code: body.code, content: body.content })

  if (paymentCodeCandidates.length === 0) {
    return null
  }

  return prisma.payment.findFirst({
    where: {
      code: {
        in: paymentCodeCandidates
      }
    }
  })
}

const canAutoSettlePayment = ({
  body,
  payment
}: {
  body: SepayWebhookBodyType
  payment: NonNullable<Awaited<ReturnType<typeof findPaymentFromWebhookBody>>>
}) => {
  const transferMatches = body.transferType === 'in'
  const amountMatches = body.transferAmount === payment.amount
  const accountMatches = body.accountNumber === envConfig.SEPAY_BANK_ACCOUNT
  const gatewayMatches = envConfig.SEPAY_EXPECTED_GATEWAY ? body.gateway === envConfig.SEPAY_EXPECTED_GATEWAY : true

  return (
    payment.status === PaymentStatus.Pending &&
    !isPaymentExpired(payment) &&
    transferMatches &&
    amountMatches &&
    accountMatches &&
    gatewayMatches
  )
}

const createPaymentTransaction = async ({
  body,
  paymentId,
  status
}: {
  body: SepayWebhookBodyType
  paymentId?: string
  status: (typeof PaymentTransactionStatus)[keyof typeof PaymentTransactionStatus]
}) => {
  return prisma.paymentTransaction.create({
    data: {
      provider: PaymentProvider.SePay,
      providerTransactionId: String(body.id),
      paymentId,
      status,
      gateway: body.gateway,
      transactionDate: parseSepayTransactionDate(body.transactionDate),
      accountNumber: body.accountNumber,
      subAccount: body.subAccount,
      amountIn: body.transferType === 'in' ? body.transferAmount : 0,
      amountOut: body.transferType === 'out' ? body.transferAmount : 0,
      accumulated: body.accumulated,
      code: body.code,
      transactionContent: body.content,
      referenceNumber: body.referenceCode,
      body: body.description,
      rawPayload: body
    }
  })
}

export const createGuestQrPaymentController = async (guestId: string) => {
  const payment = await prisma.$transaction(async (tx) => {
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

    const orders = await tx.order.findMany({
      where: {
        guestId,
        status: {
          in: billableOrderStatuses
        }
      },
      include: {
        dishSnapshot: true
      }
    })

    if (orders.length === 0) {
      throw new Error('No orders need to be paid')
    }

    const paymentId = randomUUID()
    const amount = getOrdersTotal(orders)
    const code = buildPaymentCode(paymentId)
    const expiresAt = getPaymentExpiresAt()
    const qrUrl = buildSepayQrUrl({
      account: envConfig.SEPAY_BANK_ACCOUNT,
      bank: envConfig.SEPAY_BANK_CODE,
      amount,
      description: code
    })

    const payment = await tx.payment.create({
      data: {
        id: paymentId,
        code,
        guestId,
        tableNumber: guest.tableNumber,
        amount,
        status: PaymentStatus.Pending,
        method: PaymentMethod.BankTransferQr,
        provider: PaymentProvider.SePay,
        qrUrl,
        expiresAt
      }
    })

    await tx.order.updateMany({
      where: {
        id: {
          in: orders.map((order) => order.id)
        }
      },
      data: {
        paymentId: payment.id
      }
    })

    return {
      ...payment,
      unpaidOrderCount: orders.length,
      hasProcessingOrders: orders.some(
        (order) => order.status === OrderStatus.Pending || order.status === OrderStatus.Processing
      )
    }
  })

  return {
    paymentId: payment.id,
    code: payment.code,
    amount: payment.amount,
    qrUrl: payment.qrUrl!,
    expiresAt: payment.expiresAt!,
    bankAccount: envConfig.SEPAY_BANK_ACCOUNT,
    bankCode: envConfig.SEPAY_BANK_CODE,
    unpaidOrderCount: payment.unpaidOrderCount,
    hasProcessingOrders: payment.hasProcessingOrders
  }
}

export const handleSepayWebhookController = async (body: SepayWebhookBodyType) => {
  const existingTransaction = await prisma.paymentTransaction.findUnique({
    where: {
      providerTransactionId: String(body.id)
    }
  })

  if (existingTransaction) {
    if (
      !existingTransaction.paymentId &&
      reviewableTransactionStatuses.some((status) => status === existingTransaction.status)
    ) {
      const parsedBody = SepayWebhookBody.safeParse(existingTransaction.rawPayload)
      const bodyForReconcile = parsedBody.success ? parsedBody.data : body
      const paymentForReconcile = await findPaymentFromWebhookBody(bodyForReconcile)

      if (paymentForReconcile && canAutoSettlePayment({ body: bodyForReconcile, payment: paymentForReconcile })) {
        await prisma.paymentTransaction.update({
          where: { id: existingTransaction.id },
          data: {
            paymentId: paymentForReconcile.id,
            status: PaymentTransactionStatus.Matched
          }
        })

        const settlement = await settleGuestOrdersPayment({
          guestId: paymentForReconcile.guestId,
          paymentId: paymentForReconcile.id,
          method: PaymentMethod.BankTransferQr,
          provider: PaymentProvider.SePay
        })

        return {
          message: 'Payment received successfully',
          settlement
        }
      }
    }

    return { message: 'Payment transaction already handled' }
  }

  const payment = await findPaymentFromWebhookBody(body)

  if (!payment) {
    await createPaymentTransaction({ body, status: PaymentTransactionStatus.Unmatched })
    return { message: 'Payment transaction saved for review' }
  }

  const isAlreadySettled = payment.status === PaymentStatus.Succeeded
  const isExpired = isPaymentExpired(payment)
  const canAutoSettle = canAutoSettlePayment({ body, payment })

  if (isAlreadySettled) {
    await createPaymentTransaction({ body, paymentId: payment.id, status: PaymentTransactionStatus.AlreadySettled })
    return { message: 'Payment was already settled' }
  }

  if (!canAutoSettle) {
    await prisma.$transaction(async (tx) => {
      await tx.paymentTransaction.create({
        data: {
          provider: PaymentProvider.SePay,
          providerTransactionId: String(body.id),
          paymentId: payment.id,
          status: PaymentTransactionStatus.NeedsReview,
          gateway: body.gateway,
          transactionDate: parseSepayTransactionDate(body.transactionDate),
          accountNumber: body.accountNumber,
          subAccount: body.subAccount,
          amountIn: body.transferType === 'in' ? body.transferAmount : 0,
          amountOut: body.transferType === 'out' ? body.transferAmount : 0,
          accumulated: body.accumulated,
          code: body.code,
          transactionContent: body.content,
          referenceNumber: body.referenceCode,
          body: body.description,
          rawPayload: body
        }
      })

      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: isExpired ? PaymentStatus.Expired : PaymentStatus.NeedsReview
        }
      })
    })

    return { message: 'Payment transaction saved for review' }
  }

  await createPaymentTransaction({ body, paymentId: payment.id, status: PaymentTransactionStatus.Matched })

  const settlement = await settleGuestOrdersPayment({
    guestId: payment.guestId,
    paymentId: payment.id,
    method: PaymentMethod.BankTransferQr,
    provider: PaymentProvider.SePay
  })

  return {
    message: 'Payment received successfully',
    settlement
  }
}
