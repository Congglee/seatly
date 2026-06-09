import { Role } from '@/constants/type'
import { createDish, deleteDish, getDishDetail, getDishList, updateDish } from '@/controllers/dish.controller'
import { pauseApiHook, requireLoginedHook, requireRoleHook } from '@/hooks/auth.hook'
import {
  CreateDishBody,
  type CreateDishBodyType,
  DishListQuery,
  type DishListQueryType,
  DishListRes,
  type DishListResType,
  DishParams,
  type DishParamsType,
  DishRes,
  type DishResType,
  UpdateDishBody,
  type UpdateDishBodyType
} from '@/schemas/dish.schema'
import { FastifyInstance } from 'fastify'

export default async function dishRoutes(fastify: FastifyInstance) {
  fastify.get<{ Reply: DishListResType; Querystring: DishListQueryType }>(
    '/',
    {
      schema: {
        response: { 200: DishListRes },
        querystring: DishListQuery
      }
    },
    async (request, reply) => {
      const { page, limit } = request.query
      const dishes = await getDishList(page, limit)

      reply.send({
        data: {
          items: dishes.items as DishListResType['data']['items'],
          totalItem: dishes.totalItem,
          totalPage: dishes.totalPage,
          page,
          limit
        } as DishListResType['data'],
        message: 'Get list of dishes successfully'
      })
    }
  )

  fastify.get<{
    Params: DishParamsType
    Reply: DishResType
  }>(
    '/:id',
    {
      schema: {
        params: DishParams,
        response: { 200: DishRes }
      }
    },
    async (request, reply) => {
      const dish = await getDishDetail(request.params.id)
      reply.send({
        data: dish as DishResType['data'],
        message: 'Get dish information successfully'
      })
    }
  )

  fastify.post<{
    Body: CreateDishBodyType
    Reply: DishResType
  }>(
    '',
    {
      schema: {
        body: CreateDishBody,
        response: { 200: DishRes }
      },
      preValidation: fastify.auth(
        [requireLoginedHook, pauseApiHook, [requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)]],
        {
          relation: 'and'
        }
      )
    },
    async (request, reply) => {
      const dish = await createDish(request.body)
      reply.send({
        data: dish as DishResType['data'],
        message: 'Create dish successfully'
      })
    }
  )

  fastify.put<{
    Params: DishParamsType
    Body: UpdateDishBodyType
    Reply: DishResType
  }>(
    '/:id',
    {
      schema: {
        params: DishParams,
        body: UpdateDishBody,
        response: {
          200: DishRes
        }
      },
      preValidation: fastify.auth(
        [requireLoginedHook, pauseApiHook, [requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)]],
        {
          relation: 'and'
        }
      )
    },
    async (request, reply) => {
      const dish = await updateDish(request.params.id, request.body)
      reply.send({
        data: dish as DishResType['data'],
        message: 'Update dish successfully'
      })
    }
  )

  fastify.delete<{
    Params: DishParamsType
    Reply: DishResType
  }>(
    '/:id',
    {
      schema: {
        params: DishParams,
        response: { 200: DishRes }
      },
      preValidation: fastify.auth(
        [requireLoginedHook, pauseApiHook, [requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)]],
        {
          relation: 'and'
        }
      )
    },
    async (request, reply) => {
      const result = await deleteDish(request.params.id)
      reply.send({
        message: 'Delete dish successfully',
        data: result as DishResType['data']
      })
    }
  )
}
