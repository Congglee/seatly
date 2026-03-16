import appLogger from '@/config/logger'
import prisma from '@/database'
import { type LoginBodyType } from '@/schemas/auth.schema'
import { type TokenPayload, type RoleType } from '@/types/jwt.type'
import { comparePassword } from '@/utils/crypto'
import { AuthError, EntityError } from '@/utils/errors'
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/utils/jwt'

export const loginController = async (body: LoginBodyType) => {
  const account = await prisma.account.findUnique({
    where: { email: body.email }
  })

  if (!account) {
    appLogger.warn('auth', `Login failed, email not found: ${body.email}`)
    throw new EntityError([{ field: 'email', message: 'Email does not exist' }])
  }

  const isPasswordMatch = await comparePassword(body.password, account.password)

  if (!isPasswordMatch) {
    appLogger.warn('auth', `Login failed, wrong password: ${body.email}`)
    throw new EntityError([{ field: 'password', message: 'Email or password is incorrect' }])
  }

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

  await prisma.refreshToken.create({
    data: {
      accountId: account.id,
      token: refreshToken,
      expiresAt: refreshTokenExpiresAt
    }
  })

  appLogger.success('auth', `Login successful: ${account.email}`)

  return { account, accessToken, refreshToken }
}

export const logoutController = async (refreshToken: string) => {
  await prisma.refreshToken.delete({
    where: { token: refreshToken }
  })
  appLogger.info('auth', 'Logout successful')
  return 'Logout successfully'
}

export const refreshTokenController = async (refreshToken: string) => {
  let decodedRefreshToken: TokenPayload

  try {
    decodedRefreshToken = verifyRefreshToken(refreshToken)
  } catch (error) {
    appLogger.warn('auth', 'Refresh token is invalid')
    throw new AuthError('Refresh token is invalid')
  }

  const refreshTokenDoc = await prisma.refreshToken.findUniqueOrThrow({
    where: { token: refreshToken },
    include: { account: true }
  })

  const account = refreshTokenDoc.account

  const newAccessToken = signAccessToken({
    userId: account.id,
    role: account.role as RoleType
  })
  const newRefreshToken = signRefreshToken({
    userId: account.id,
    role: account.role as RoleType,
    exp: decodedRefreshToken.exp
  })

  await prisma.refreshToken.delete({
    where: { token: refreshToken }
  })

  await prisma.refreshToken.create({
    data: {
      accountId: account.id,
      token: newRefreshToken,
      expiresAt: refreshTokenDoc.expiresAt
    }
  })

  appLogger.info('auth', `Refresh token rotated for accountId=${account.id}`)

  return { accessToken: newAccessToken, refreshToken: newRefreshToken }
}
