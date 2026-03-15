import prisma from '@/database'
import { UpdateTableBodyType, type CreateTableBodyType } from '@/schemas/table.schema'
import { randomId } from '@/utils/commons'
import { EntityError, isPrismaClientKnownRequestError } from '@/utils/errors'

export const getTableList = async (page: number, limit: number) => {
  const data = await prisma.restaurantTable.findMany({
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit
  })

  const totalItem = await prisma.restaurantTable.count()
  const totalPage = Math.ceil(totalItem / limit)

  return { items: data, totalItem, page, limit, totalPage }
}

export const getTableDetail = (number: number) => {
  return prisma.restaurantTable.findUniqueOrThrow({
    where: { number }
  })
}

export const createTable = async (body: CreateTableBodyType) => {
  const token = randomId()

  try {
    const result = await prisma.restaurantTable.create({
      data: { ...body, token }
    })
    return result
  } catch (error) {
    if (isPrismaClientKnownRequestError(error) && error.code === 'P2002') {
      throw new EntityError([
        {
          message: 'Table number already exists',
          field: 'number'
        }
      ])
    }
    throw error
  }
}

export const updateTable = (number: number, data: UpdateTableBodyType) => {
  if (data.changeToken) {
    const token = randomId()

    // Delete all refresh tokens of guests by table
    return prisma.$transaction(async (tx) => {
      const [table] = await Promise.all([
        tx.restaurantTable.update({
          where: { number },
          data: {
            status: data.status,
            capacity: data.capacity,
            token
          }
        }),

        tx.guest.updateMany({
          where: { tableNumber: number },
          data: {
            refreshToken: null,
            refreshTokenExpiresAt: null
          }
        })
      ])

      return table
    })
  }

  return prisma.restaurantTable.update({
    where: { number },
    data: {
      status: data.status,
      capacity: data.capacity
    }
  })
}

export const deleteTable = (number: number) => {
  return prisma.restaurantTable.delete({
    where: { number }
  })
}
