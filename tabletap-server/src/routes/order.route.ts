import { ManagerRoom, Role } from '@/constants/type'
import {
  createOrdersController,
  getOrderDetailController,
  getOrdersController,
  payOrdersController,
  updateOrderController
} from '@/controllers/order.controller'
import { requireLoginedHook, requireRoleHook } from '@/hooks/auth.hook'
import {
  CreateOrdersBody,
  type CreateOrdersBodyType,
  CreateOrdersRes,
  type CreateOrdersResType,
  GetOrderDetailRes,
  type GetOrderDetailResType,
  GetOrdersQueryParams,
  type GetOrdersQueryParamsType,
  GetOrdersRes,
  type GetOrdersResType,
  OrderParam,
  OrderParamType,
  PayGuestOrdersBody,
  type PayGuestOrdersBodyType,
  PayGuestOrdersRes,
  type PayGuestOrdersResType,
  UpdateOrderBody,
  type UpdateOrderBodyType,
  UpdateOrderRes,
  type UpdateOrderResType
} from '@/schemas/order.schema'
import { FastifyInstance } from 'fastify'

export default async function orderRoutes(fastify: FastifyInstance) {
  fastify.addHook(
    'preValidation',
    fastify.auth([requireLoginedHook, [requireRoleHook(Role.Employee), requireRoleHook(Role.Owner)]], {
      relation: 'and'
    })
  )

  fastify.post<{ Reply: CreateOrdersResType; Body: CreateOrdersBodyType }>(
    '/',
    {
      schema: {
        response: { 200: CreateOrdersRes },
        body: CreateOrdersBody
      }
    },
    async (request, reply) => {
      const { socketId, orders } = await createOrdersController(
        request.decodedAccessToken?.userId as string,
        request.body
      )

      if (socketId) {
        fastify.io.to(ManagerRoom).to(socketId).emit('new-order', orders)
      } else {
        fastify.io.to(ManagerRoom).emit('new-order', orders)
      }

      reply.send({
        message: `Create ${orders.length} orders for guest successfully`,
        data: orders as CreateOrdersResType['data']
      })
    }
  )

  fastify.get<{ Reply: GetOrdersResType; Querystring: GetOrdersQueryParamsType }>(
    '/',
    {
      schema: {
        response: { 200: GetOrdersRes },
        querystring: GetOrdersQueryParams
      }
    },
    async (request, reply) => {
      const { page, limit } = request.query

      const orders = await getOrdersController({
        fromDate: request.query.fromDate,
        toDate: request.query.toDate,
        page,
        limit
      })

      reply.send({
        data: {
          items: orders.items as GetOrdersResType['data']['items'],
          totalItem: orders.totalItem,
          totalPage: orders.totalPage,
          page,
          limit
        } as GetOrdersResType['data'],
        message: 'Get list of orders successfully'
      })
    }
  )

  fastify.get<{ Reply: GetOrderDetailResType; Params: OrderParamType }>(
    '/:orderId',
    {
      schema: {
        response: { 200: GetOrderDetailRes },
        params: OrderParam
      }
    },
    async (request, reply) => {
      const result = await getOrderDetailController(request.params.orderId)
      reply.send({
        message: 'Get order detail successfully',
        data: result as GetOrderDetailResType['data']
      })
    }
  )

  fastify.put<{ Reply: UpdateOrderResType; Body: UpdateOrderBodyType; Params: OrderParamType }>(
    '/:orderId',
    {
      schema: {
        response: { 200: UpdateOrderRes },
        body: UpdateOrderBody,
        params: OrderParam
      }
    },
    async (request, reply) => {
      const result = await updateOrderController(request.params.orderId, {
        ...request.body,
        orderHandlerId: request.decodedAccessToken?.userId as string
      })

      if (result.socketId) {
        fastify.io.to(result.socketId).to(ManagerRoom).emit('update-order', result.order)
      } else {
        fastify.io.to(ManagerRoom).emit('update-order', result.order)
      }

      reply.send({
        message: 'Update order successfully',
        data: result.order as UpdateOrderResType['data']
      })
    }
  )

  fastify.post<{ Body: PayGuestOrdersBodyType; Reply: PayGuestOrdersResType }>(
    '/pay',
    {
      schema: {
        response: { 200: PayGuestOrdersRes },
        body: PayGuestOrdersBody
      }
    },
    async (request, reply) => {
      const result = await payOrdersController({
        guestId: request.body.guestId,
        orderHandlerId: request.decodedAccessToken?.userId as string
      })

      if (result.socketId) {
        fastify.io.to(result.socketId).to(ManagerRoom).emit('payment', result.orders)
      } else {
        fastify.io.to(ManagerRoom).emit('payment', result.orders)
      }

      reply.send({
        message: `Pay ${result.orders.length} orders successfully`,
        data: result.orders as PayGuestOrdersResType['data']
      })
    }
  )
}
