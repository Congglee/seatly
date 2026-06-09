import { Role } from '@/constants/type'
import { createTable, deleteTable, getTableDetail, getTableList, updateTable } from '@/controllers/table.controller'
import { requireLoginedHook, requireRoleHook } from '@/hooks/auth.hook'
import {
  CreateTableBody,
  TableListRes,
  TableParams,
  TableRes,
  UpdateTableBody,
  type UpdateTableBodyType,
  type CreateTableBodyType,
  type TableListResType,
  type TableParamsType,
  type TableResType,
  TableListQuery,
  TableListQueryType
} from '@/schemas/table.schema'
import { FastifyInstance } from 'fastify'

export default async function tablesRoutes(fastify: FastifyInstance) {
  fastify.get<{ Reply: TableListResType; Querystring: TableListQueryType }>(
    '/',
    {
      schema: {
        response: { 200: TableListRes },
        querystring: TableListQuery
      }
    },
    async (request, reply) => {
      const { page, limit } = request.query
      const tables = await getTableList(page, limit)

      reply.send({
        data: {
          items: tables.items as TableListResType['data']['items'],
          totalItem: tables.totalItem,
          totalPage: tables.totalPage,
          page,
          limit
        } as TableListResType['data'],
        message: 'Get list of tables successfully'
      })
    }
  )

  fastify.get<{
    Params: TableParamsType
    Reply: TableResType
  }>(
    '/:number',
    {
      schema: {
        params: TableParams,
        response: { 200: TableRes }
      }
    },
    async (request, reply) => {
      const table = await getTableDetail(request.params.number)
      reply.send({
        data: table as TableResType['data'],
        message: 'Get table information successfully'
      })
    }
  )

  fastify.post<{
    Body: CreateTableBodyType
    Reply: TableResType
  }>(
    '',
    {
      schema: {
        body: CreateTableBody,
        response: { 200: TableRes }
      },
      preValidation: fastify.auth([requireLoginedHook, [requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)]], {
        relation: 'and'
      })
    },
    async (request, reply) => {
      const table = await createTable(request.body)
      reply.send({
        data: table as TableResType['data'],
        message: 'Create table successfully'
      })
    }
  )

  fastify.put<{
    Params: TableParamsType
    Body: UpdateTableBodyType
    Reply: TableResType
  }>(
    '/:number',
    {
      schema: {
        params: TableParams,
        body: UpdateTableBody,
        response: { 200: TableRes }
      },
      preValidation: fastify.auth([requireLoginedHook, [requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)]], {
        relation: 'and'
      })
    },
    async (request, reply) => {
      const table = await updateTable(request.params.number, request.body)
      reply.send({
        data: table as TableResType['data'],
        message: 'Update table successfully'
      })
    }
  )

  fastify.delete<{
    Params: TableParamsType
    Reply: TableResType
  }>(
    '/:number',
    {
      schema: {
        params: TableParams,
        response: { 200: TableRes }
      },
      preValidation: fastify.auth([requireLoginedHook, [requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)]], {
        relation: 'and'
      })
    },
    async (request, reply) => {
      const result = await deleteTable(request.params.number)
      reply.send({
        message: 'Delete table successfully',
        data: result as TableResType['data']
      })
    }
  )
}
