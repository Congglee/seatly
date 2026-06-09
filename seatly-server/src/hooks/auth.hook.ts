import envConfig from '@/config/environment'
import appLogger from '@/config/logger'
import { Role } from '@/constants/type'
import { AuthError, ForbiddenError } from '@/utils/errors'
import { verifyAccessToken } from '@/utils/jwt'
import { type FastifyRequest } from 'fastify'

type RoleValue = (typeof Role)[keyof typeof Role]

export const pauseApiHook = async (request: FastifyRequest) => {
  if (envConfig.PAUSE_SOME_ENDPOINTS) {
    appLogger.warn('auth-hook', `API paused for request ${request.method} ${request.url}`)
    throw new ForbiddenError('Function is paused')
  }
}

export const requireLoginedHook = async (request: FastifyRequest) => {
  const accessToken = request.headers.authorization?.split(' ')[1]

  if (!accessToken) {
    appLogger.warn('auth-hook', `Missing access token on ${request.method} ${request.url}`)
    throw new AuthError('Cannot get access token')
  }

  try {
    const decodedAccessToken = verifyAccessToken(accessToken)
    request.decodedAccessToken = decodedAccessToken
  } catch (error) {
    appLogger.warn('auth-hook', `Invalid access token on ${request.method} ${request.url}`)
    throw new AuthError('Access token is invalid')
  }
}

// export const requireOwnerHook = async (request: FastifyRequest) => {
//   if (request.decodedAccessToken?.role !== Role.Owner) {
//     appLogger.warn('auth-hook', `Forbidden owner route access on ${request.method} ${request.url}`)
//     throw new ForbiddenError('You do not have access to this function')
//   }
// }

// export const requireEmployeeHook = async (request: FastifyRequest) => {
//   if (request.decodedAccessToken?.role !== Role.Employee) {
//     appLogger.warn('auth-hook', `Forbidden employee route access on ${request.method} ${request.url}`)
//     throw new ForbiddenError('You do not have access to this function')
//   }
// }

// export const requireGuestHook = async (request: FastifyRequest) => {
//   if (request.decodedAccessToken?.role !== Role.Guest) {
//     appLogger.warn('auth-hook', `Forbidden guest route access on ${request.method} ${request.url}`)
//     throw new ForbiddenError('You do not have access to this function')
//   }
// }

export const requireRoleHook = (role: RoleValue) => {
  return async (request: FastifyRequest) => {
    if (request.decodedAccessToken?.role !== role) {
      appLogger.warn('auth-hook', `Forbidden ${role.toLowerCase()} route access on ${request.method} ${request.url}`)
      throw new ForbiddenError('You do not have access to this function')
    }
  }
}

export const requireGuestHook = async (request: FastifyRequest) => {
  if (request.decodedAccessToken?.role !== Role.Guest) {
    appLogger.warn('auth-hook', `Forbidden guest route access on ${request.method} ${request.url}`)
    throw new AuthError('You do not have access to this function')
  }
}
