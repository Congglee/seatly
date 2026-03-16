import prisma from '@/database'
import { CreateDishBodyType, UpdateDishBodyType } from '@/schemas/dish.schema'

export const getDishList = async (page: number, limit: number) => {
  const data = await prisma.dish.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit
  })

  const totalItem = await prisma.dish.count()
  const totalPage = Math.ceil(totalItem / limit)

  return { items: data, totalItem, page, limit, totalPage }
}

export const getDishDetail = (id: string) => {
  return prisma.dish.findUniqueOrThrow({
    where: { id }
  })
}

export const createDish = async (data: CreateDishBodyType) => {
  return await prisma.dish.create({ data })
}

export const updateDish = (id: string, data: UpdateDishBodyType) => {
  return prisma.dish.update({
    where: { id },
    data
  })
}

export const deleteDish = (id: string) => {
  return prisma.dish.delete({
    where: { id }
  })
}
