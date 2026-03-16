import envConfig from '@/config/environment'
import appLogger from '@/config/logger'
import { OrderStatus, Role, TableStatus } from '@/constants/type'
import prisma from '@/database'
import {
  ChangePasswordBodyType,
  CreateEmployeeAccountBodyType,
  CreateGuestBodyType,
  GetGuestListQueryParamsType,
  UpdateEmployeeAccountBodyType,
  UpdateMeBodyType
} from '@/schemas/account.schema'
import { comparePassword, hashPassword } from '@/utils/crypto'
import { EntityError, ForbiddenError, isPrismaClientKnownRequestError } from '@/utils/errors'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/utils/jwt'
import { RoleType } from '@/types/jwt.type'

const accountSelect = {
  id: true,
  name: true,
  email: true,
  avatar: true,
  role: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true
} as const

const throwUniqueEmailError = (error: unknown) => {
  if (isPrismaClientKnownRequestError(error) && error.code === 'P2002') {
    throw new EntityError([
      {
        field: 'email',
        message: 'Email already exists'
      }
    ])
  }

  throw error
}

export const initOwnerAccount = async () => {
  const accountCount = await prisma.account.count()

  if (accountCount === 0) {
    const hashedPassword = await hashPassword(envConfig.INITIAL_PASSWORD_OWNER)

    await prisma.account.create({
      data: {
        name: 'Owner',
        email: envConfig.INITIAL_EMAIL_OWNER,
        password: hashedPassword,
        role: Role.Owner
      }
    })

    appLogger.success('account', `Create owner account successfully: ${envConfig.INITIAL_EMAIL_OWNER}`)
    return
  }

  appLogger.debug('account', 'Owner account already exists, skipping seed')
}

export const getGuestList = async ({ fromDate, toDate }: GetGuestListQueryParamsType) => {
  return prisma.guest.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      createdAt: {
        gte: fromDate,
        lte: toDate
      }
    }
  })
}

export const getAccountList = async (page: number, limit: number) => {
  const [items, totalItem] = await Promise.all([
    prisma.account.findMany({
      select: accountSelect,
      orderBy: [{ role: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
      where: {
        role: {
          in: [Role.Owner, Role.Employee]
        }
      }
    }),
    prisma.account.count({
      where: {
        role: {
          in: [Role.Owner, Role.Employee]
        }
      }
    })
  ])

  const totalPage = Math.ceil(totalItem / limit)

  return { items, totalItem, page, limit, totalPage }
}

export const getAccountDetail = (id: string) => {
  return prisma.account.findUniqueOrThrow({
    where: { id },
    select: accountSelect
  })
}

export const createEmployeeAccount = async (body: CreateEmployeeAccountBodyType, ownerId: string) => {
  try {
    const hashedPassword = await hashPassword(body.password)

    return await prisma.account.create({
      data: {
        name: body.name,
        email: body.email,
        avatar: body.avatar ?? null,
        password: hashedPassword,
        role: Role.Employee,
        ownerId
      },
      select: accountSelect
    })
  } catch (error) {
    throwUniqueEmailError(error)
  }
}

export const updateEmployeeAccount = async (id: string, body: UpdateEmployeeAccountBodyType, actorId: string) => {
  return prisma.$transaction(async (tx) => {
    const targetAccount = await tx.account.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        role: true
      }
    })

    if (targetAccount.id === actorId) {
      throw new ForbiddenError('Please use your profile settings to update your own account')
    }

    const nextRole = body.role ?? targetAccount.role

    if (targetAccount.role === Role.Owner && nextRole !== Role.Owner) {
      const ownerCount = await tx.account.count({
        where: { role: Role.Owner }
      })

      if (ownerCount <= 1) {
        throw new ForbiddenError('Cannot change the role of the last owner account')
      }
    }

    const password = body.changePassword && body.password ? await hashPassword(body.password) : undefined

    try {
      return await tx.account.update({
        where: { id },
        data: {
          name: body.name,
          email: body.email,
          avatar: body.avatar ?? null,
          role: nextRole,
          ownerId: nextRole === Role.Owner ? null : actorId,
          ...(password ? { password } : {})
        },
        select: accountSelect
      })
    } catch (error) {
      throwUniqueEmailError(error)
    }
  })
}

export const deleteEmployeeAccount = async (id: string, actorId: string) => {
  return prisma.$transaction(async (tx) => {
    const targetAccount = await tx.account.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        role: true
      }
    })

    if (targetAccount.id === actorId) {
      throw new ForbiddenError('You cannot delete your own account')
    }

    if (targetAccount.role === Role.Owner) {
      const ownerCount = await tx.account.count({
        where: { role: Role.Owner }
      })

      if (ownerCount <= 1) {
        throw new ForbiddenError('Cannot delete the last owner account')
      }
    }

    await tx.refreshToken.deleteMany({
      where: { accountId: id }
    })

    return tx.account.delete({
      where: { id },
      select: accountSelect
    })
  })
}

export const getMe = (userId: string) => {
  return prisma.account.findUniqueOrThrow({
    where: { id: userId },
    select: accountSelect
  })
}

export const updateMe = async (userId: string, body: UpdateMeBodyType) => {
  return prisma.account.update({
    where: { id: userId },
    data: {
      name: body.name,
      avatar: body.avatar ?? null
    },
    select: accountSelect
  })
}

export const changePassword = async (userId: string, body: ChangePasswordBodyType) => {
  const account = await prisma.account.findUniqueOrThrow({
    where: { id: userId }
  })

  const isPasswordMatch = await comparePassword(body.oldPassword, account.password)

  if (!isPasswordMatch) {
    throw new EntityError([
      {
        field: 'oldPassword',
        message: 'Current password is incorrect'
      }
    ])
  }

  const hashedPassword = await hashPassword(body.password)

  const accessToken = signAccessToken({
    userId: account.id,
    role: account.role as RoleType
  })
  const refreshToken = signRefreshToken({
    userId: account.id,
    role: account.role as RoleType
  })
  const decodedRefreshToken = verifyRefreshToken(refreshToken)
  const refreshTokenExpiresAt = new Date(decodedRefreshToken.exp * 1000)

  const updatedAccount = await prisma.$transaction(async (tx) => {
    const updated = await tx.account.update({
      where: { id: userId },
      data: { password: hashedPassword },
      select: accountSelect
    })

    await tx.refreshToken.deleteMany({
      where: { accountId: userId }
    })

    await tx.refreshToken.create({
      data: {
        accountId: userId,
        token: refreshToken,
        expiresAt: refreshTokenExpiresAt
      }
    })

    return updated
  })

  return {
    account: updatedAccount,
    accessToken,
    refreshToken
  }
}

export const createGuestController = async (body: CreateGuestBodyType) => {
  return prisma.$transaction(async (tx) => {
    const table = await tx.restaurantTable.findUnique({
      where: { number: body.tableNumber }
    })

    if (!table) {
      throw new Error('Table does not exist')
    }

    if (table.status === TableStatus.Hidden) {
      throw new Error(`Table ${table.number} is hidden, please select another table`)
    }

    const activeGuest = await tx.guest.findFirst({
      where: {
        tableNumber: body.tableNumber,
        orders: {
          some: {
            status: {
              in: [OrderStatus.Pending, OrderStatus.Processing, OrderStatus.Delivered]
            }
          }
        }
      }
    })

    if (activeGuest) {
      throw new Error(`Table ${table.number} already has active orders, please choose the existing guest instead`)
    }

    const lockTableResult = await tx.restaurantTable.updateMany({
      where: {
        number: body.tableNumber,
        isOccupied: false
      },
      data: {
        isOccupied: true,
        occupiedAt: new Date(),
        lastActivityAt: new Date()
      }
    })

    if (lockTableResult.count === 0) {
      throw new Error(`Table ${table.number} is currently occupied, please choose the existing guest instead`)
    }

    return tx.guest.create({
      data: {
        ...body,
        sessionStatus: 'Active',
        lastActivityAt: new Date(),
        endedAt: null
      }
    })
  })
}
