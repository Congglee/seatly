import envConfig from '@/config/environment'
import { ManagerRoom } from '@/constants/type'
import { createGuestQrPaymentController, handleSepayWebhookController } from '@/controllers/payment.controller'
import { requireGuestHook, requireLoginedHook } from '@/hooks/auth.hook'
import {
  CreateGuestQrPaymentRes,
  type CreateGuestQrPaymentResType,
  SepayWebhookBody,
  type SepayWebhookBodyType,
  SepayWebhookRes,
  type SepayWebhookResType
} from '@/schemas/payment.schema'
import { AuthError } from '@/utils/errors'
import { FastifyInstance, FastifyRequest } from 'fastify'

const requirePaymentApiKeyHook = async (request: FastifyRequest) => {
  const authorization = request.headers.authorization
  const paymentApiKey = authorization?.startsWith('Apikey ')
    ? authorization.slice('Apikey '.length)
    : authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : authorization

  if (!paymentApiKey || paymentApiKey !== envConfig.PAYMENT_API_KEY) {
    throw new AuthError('Payment API key is invalid')
  }
}

export default async function paymentRoutes(fastify: FastifyInstance) {
  fastify.post<{ Reply: CreateGuestQrPaymentResType }>(
    '/guest/qr',
    {
      schema: {
        response: { 200: CreateGuestQrPaymentRes }
      },
      preValidation: fastify.auth([requireLoginedHook, requireGuestHook])
    },
    async (request, reply) => {
      const result = await createGuestQrPaymentController(request.decodedAccessToken?.userId as string)

      reply.send({
        message: 'Create guest payment QR successfully',
        data: result
      })
    }
  )

  fastify.post<{ Body: SepayWebhookBodyType; Reply: SepayWebhookResType }>(
    '/sepay/webhook',
    {
      schema: {
        body: SepayWebhookBody,
        response: { 200: SepayWebhookRes }
      },
      preValidation: requirePaymentApiKeyHook
    },
    async (request, reply) => {
      const result = await handleSepayWebhookController(request.body)

      const settlement = 'settlement' in result ? result.settlement : undefined

      if (settlement) {
        if (settlement.socketId) {
          fastify.io.to(settlement.socketId).to(ManagerRoom).emit('payment', settlement.orders)
        } else {
          fastify.io.to(ManagerRoom).emit('payment', settlement.orders)
        }
      }

      reply.send({ success: true })
    }
  )
}
