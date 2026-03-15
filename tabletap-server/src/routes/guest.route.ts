import { ManagerRoom, Role } from '@/constants/type'
import {
  guestCreateOrdersController,
  guestGetOrdersController,
  guestLoginController,
  guestLogoutController,
  guestRefreshTokenController
} from '@/controllers/guest.controller'
import { requireGuestHook, requireLoginedHook } from '@/hooks/auth.hook'
import {
  LogoutBody,
  type LogoutBodyType,
  RefreshTokenBody,
  RefreshTokenBodyType,
  RefreshTokenRes,
  RefreshTokenResType
} from '@/schemas/auth.schema'
import { MessageRes, type MessageResType } from '@/schemas/common.schema'
import {
  GuestCreateOrdersBody,
  type GuestCreateOrdersBodyType,
  GuestCreateOrdersRes,
  type GuestCreateOrdersResType,
  GuestGetOrdersRes,
  type GuestGetOrdersResType,
  GuestLoginBody,
  type GuestLoginBodyType,
  GuestLoginRes,
  type GuestLoginResType
} from '@/schemas/guest.schema'
import { FastifyInstance } from 'fastify'

export default async function guestRoutes(fastify: FastifyInstance) {
  fastify.post<{ Reply: GuestLoginResType; Body: GuestLoginBodyType }>(
    '/auth/login',
    {
      schema: {
        response: { 200: GuestLoginRes },
        body: GuestLoginBody
      }
    },
    async (request, reply) => {
      const { body } = request
      const result = await guestLoginController(body)

      reply.send({
        message: 'Login successfully',
        data: {
          guest: {
            id: result.guest.id,
            name: result.guest.name,
            role: Role.Guest,
            tableNumber: result.guest.tableNumber,
            createdAt: result.guest.createdAt,
            updatedAt: result.guest.updatedAt
          },
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      })
    }
  )

  fastify.post<{ Reply: MessageResType; Body: LogoutBodyType }>(
    '/auth/logout',
    {
      schema: {
        response: { 200: MessageRes },
        body: LogoutBody
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      const message = await guestLogoutController(request.decodedAccessToken?.userId as string)
      reply.send({ message })
    }
  )

  fastify.post<{
    Reply: RefreshTokenResType
    Body: RefreshTokenBodyType
  }>(
    '/auth/refresh-token',
    {
      schema: {
        response: { 200: RefreshTokenRes },
        body: RefreshTokenBody
      }
    },
    async (request, reply) => {
      const result = await guestRefreshTokenController(request.body.refreshToken)
      reply.send({
        message: 'Get new token successfully',
        data: result
      })
    }
  )

  fastify.post<{
    Reply: GuestCreateOrdersResType
    Body: GuestCreateOrdersBodyType
  }>(
    '/orders',
    {
      schema: {
        response: { 200: GuestCreateOrdersRes },
        body: GuestCreateOrdersBody
      },
      preValidation: fastify.auth([requireLoginedHook, requireGuestHook])
    },
    async (request, reply) => {
      const guestId = request.decodedAccessToken?.userId as string
      const result = await guestCreateOrdersController(guestId, request.body)

      fastify.io.to(ManagerRoom).emit('new-order', result)

      reply.send({
        message: 'Create order successfully',
        data: result as GuestCreateOrdersResType['data']
      })
    }
  )

  fastify.get<{
    Reply: GuestGetOrdersResType
  }>(
    '/orders',
    {
      schema: {
        response: { 200: GuestGetOrdersRes }
      },
      preValidation: fastify.auth([requireLoginedHook, requireGuestHook])
    },
    async (request, reply) => {
      const guestId = request.decodedAccessToken?.userId as string
      const result = await guestGetOrdersController(guestId)

      reply.send({
        message: 'Get list of orders successfully',
        data: result as GuestGetOrdersResType['data']
      })
    }
  )
}
