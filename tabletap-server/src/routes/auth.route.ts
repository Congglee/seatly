import { loginController, logoutController, refreshTokenController } from '@/controllers/auth.controller'
import { requireLoginedHook } from '@/hooks/auth.hook'
import {
  LoginBody,
  type LoginBodyType,
  LoginRes,
  type LoginResType,
  LogoutBody,
  type LogoutBodyType,
  RefreshTokenBody,
  type RefreshTokenBodyType,
  RefreshTokenRes,
  type RefreshTokenResType
} from '@/schemas/auth.schema'
import { MessageRes, type MessageResType } from '@/schemas/common.schema'
import { type FastifyPluginOptions, type FastifyInstance } from 'fastify'

export default async function authRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.post<{ Reply: LoginResType; Body: LoginBodyType }>(
    '/login',
    {
      schema: {
        response: { 200: LoginRes },
        body: LoginBody
      }
    },
    async (request, reply) => {
      const { body } = request
      const { accessToken, refreshToken, account } = await loginController(body)

      reply.send({
        message: 'Login successfully',
        data: {
          account: account as LoginResType['data']['account'],
          accessToken,
          refreshToken
        }
      })
    }
  )

  fastify.post<{ Reply: MessageResType; Body: LogoutBodyType }>(
    '/logout',
    {
      schema: {
        response: { 200: MessageRes },
        body: LogoutBody
      },
      preValidation: fastify.auth([requireLoginedHook])
    },
    async (request, reply) => {
      const message = await logoutController(request.body.refreshToken)
      reply.send({ message })
    }
  )

  fastify.post<{
    Reply: RefreshTokenResType
    Body: RefreshTokenBodyType
  }>(
    '/refresh-token',
    {
      schema: {
        response: { 200: RefreshTokenRes },
        body: RefreshTokenBody
      }
    },
    async (request, reply) => {
      const result = await refreshTokenController(request.body.refreshToken)
      reply.send({
        message: 'Get new token successfully',
        data: result
      })
    }
  )
}
