import { Role } from '@/constants/type'
import { getDashboardIndicatorsController } from '@/controllers/dashboard.controller'
import { requireLoginedHook, requireRoleHook } from '@/hooks/auth.hook'
import {
  DashboardIndicatorQueryParams,
  DashboardIndicatorQueryParamsType,
  DashboardIndicatorRes,
  DashboardIndicatorResType
} from '@/schemas/dashboard.schema'
import { FastifyInstance } from 'fastify'

export default async function dashboardRoutes(fastify: FastifyInstance) {
  fastify.addHook(
    'preValidation',
    fastify.auth([requireLoginedHook, [requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)]], {
      relation: 'and'
    })
  )

  fastify.get<{ Reply: DashboardIndicatorResType; Querystring: DashboardIndicatorQueryParamsType }>(
    '/dashboard',
    {
      schema: {
        response: { 200: DashboardIndicatorRes },
        querystring: DashboardIndicatorQueryParams
      }
    },
    async (request, reply) => {
      const result = await getDashboardIndicatorsController(request.query)

      reply.send({
        message: 'Get dashboard indicators successfully',
        data: result as DashboardIndicatorResType['data']
      })
    }
  )
}
