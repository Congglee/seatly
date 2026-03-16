import { Role } from '@/constants/type'
import {
  changePassword,
  createEmployeeAccount,
  createGuestController,
  deleteEmployeeAccount,
  getAccountDetail,
  getAccountList,
  getGuestList,
  getMe,
  updateEmployeeAccount,
  updateMe
} from '@/controllers/account.controller'
import { requireLoginedHook, requireRoleHook } from '@/hooks/auth.hook'
import {
  AccountIdParam,
  AccountListQuery,
  AccountListRes,
  AccountListQueryType,
  AccountIdParamType,
  AccountListResType,
  AccountRes,
  AccountResType,
  ChangePasswordBody,
  ChangePasswordBodyType,
  ChangePasswordV2Res,
  ChangePasswordV2ResType,
  CreateEmployeeAccountBody,
  type CreateEmployeeAccountBodyType,
  CreateGuestBody,
  type CreateGuestBodyType,
  CreateGuestRes,
  type CreateGuestResType,
  GetGuestListQueryParams,
  type GetGuestListQueryParamsType,
  GetListGuestsRes,
  type GetListGuestsResType,
  UpdateEmployeeAccountBody,
  UpdateEmployeeAccountBodyType,
  UpdateMeBody,
  UpdateMeBodyType
} from '@/schemas/account.schema'
import { type FastifyInstance, type FastifyPluginOptions } from 'fastify'

export default async function accountRoutes(fastify: FastifyInstance, _options: FastifyPluginOptions) {
  fastify.addHook('preValidation', fastify.auth([requireLoginedHook]))

  fastify.get<{ Querystring: AccountListQueryType; Reply: AccountListResType }>(
    '/',
    {
      schema: {
        querystring: AccountListQuery,
        response: { 200: AccountListRes }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner)])
    },
    async (request, reply) => {
      const { page, limit } = request.query
      const accounts = await getAccountList(page, limit)

      reply.send({
        message: 'Get list of accounts successfully',
        data: {
          items: accounts.items as AccountListResType['data']['items'],
          totalItem: accounts.totalItem,
          totalPage: accounts.totalPage,
          page,
          limit
        }
      })
    }
  )

  fastify.get<{ Reply: AccountResType }>(
    '/me',
    {
      schema: {
        response: { 200: AccountRes }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)], {
        relation: 'or'
      })
    },
    async (request, reply) => {
      const account = await getMe(request.decodedAccessToken!.userId)

      reply.send({
        message: 'Get my account successfully',
        data: account as AccountResType['data']
      })
    }
  )

  fastify.put<{ Body: UpdateMeBodyType; Reply: AccountResType }>(
    '/me',
    {
      schema: {
        body: UpdateMeBody,
        response: { 200: AccountRes }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)], {
        relation: 'or'
      })
    },
    async (request, reply) => {
      const account = await updateMe(request.decodedAccessToken!.userId, request.body)

      reply.send({
        message: 'Update my account successfully',
        data: account as AccountResType['data']
      })
    }
  )

  fastify.put<{ Body: ChangePasswordBodyType; Reply: ChangePasswordV2ResType }>(
    '/change-password',
    {
      schema: {
        body: ChangePasswordBody,
        response: { 200: ChangePasswordV2Res }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)], {
        relation: 'or'
      })
    },
    async (request, reply) => {
      const result = await changePassword(request.decodedAccessToken!.userId, request.body)

      reply.send({
        message: 'Change password successfully',
        data: {
          account: result.account as ChangePasswordV2ResType['data']['account'],
          accessToken: result.accessToken,
          refreshToken: result.refreshToken
        }
      })
    }
  )

  fastify.post<{ Body: CreateEmployeeAccountBodyType; Reply: AccountResType }>(
    '/',
    {
      schema: {
        body: CreateEmployeeAccountBody,
        response: { 200: AccountRes }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner)])
    },
    async (request, reply) => {
      const account = await createEmployeeAccount(request.body, request.decodedAccessToken!.userId)

      reply.send({
        message: 'Create account successfully',
        data: account as AccountResType['data']
      })
    }
  )

  fastify.get<{ Params: AccountIdParamType; Reply: AccountResType }>(
    '/:id',
    {
      schema: {
        params: AccountIdParam,
        response: { 200: AccountRes }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner)])
    },
    async (request, reply) => {
      const account = await getAccountDetail(request.params.id)

      reply.send({
        message: 'Get account information successfully',
        data: account as AccountResType['data']
      })
    }
  )

  fastify.put<{
    Params: AccountIdParamType
    Body: UpdateEmployeeAccountBodyType
    Reply: AccountResType
  }>(
    '/:id',
    {
      schema: {
        params: AccountIdParam,
        body: UpdateEmployeeAccountBody,
        response: { 200: AccountRes }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner)])
    },
    async (request, reply) => {
      const account = await updateEmployeeAccount(request.params.id, request.body, request.decodedAccessToken!.userId)

      reply.send({
        message: 'Update account successfully',
        data: account as AccountResType['data']
      })
    }
  )

  fastify.delete<{ Params: AccountIdParamType; Reply: AccountResType }>(
    '/:id',
    {
      schema: {
        params: AccountIdParam,
        response: { 200: AccountRes }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner)])
    },
    async (request, reply) => {
      const account = await deleteEmployeeAccount(request.params.id, request.decodedAccessToken!.userId)

      reply.send({
        message: 'Delete account successfully',
        data: account as AccountResType['data']
      })
    }
  )

  fastify.post<{ Body: CreateGuestBodyType; Reply: CreateGuestResType }>(
    '/guests',
    {
      schema: {
        body: CreateGuestBody,
        response: { 200: CreateGuestRes }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)], {
        relation: 'or'
      })
    },
    async (request, reply) => {
      const guest = await createGuestController(request.body)

      reply.send({
        message: 'Create guest account successfully',
        data: {
          ...guest,
          role: Role.Guest
        } as CreateGuestResType['data']
      })
    }
  )

  fastify.get<{ Querystring: GetGuestListQueryParamsType; Reply: GetListGuestsResType }>(
    '/guests',
    {
      schema: {
        querystring: GetGuestListQueryParams,
        response: { 200: GetListGuestsRes }
      },
      preValidation: fastify.auth([requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)], {
        relation: 'or'
      })
    },
    async (request, reply) => {
      const guests = await getGuestList({
        fromDate: request.query.fromDate,
        toDate: request.query.toDate
      })

      reply.send({
        message: 'Get list of guests successfully',
        data: guests as GetListGuestsResType['data']
      })
    }
  )
}
