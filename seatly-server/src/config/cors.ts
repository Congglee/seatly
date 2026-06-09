import envConfig, { API_URL } from '@/config/environment'
import appLogger from '@/config/logger'
import HTTP_STATUS from '@/constants/http-status'
import { FastifyCorsOptions } from '@fastify/cors'

const toOrigin = (value: string) => {
  try {
    return new URL(value).origin
  } catch {
    return null
  }
}

const whitelistCandidates = [envConfig.CLIENT_URL, API_URL]

export const WHITELIST_DOMAINS = Array.from(
  new Set(whitelistCandidates.map((value) => toOrigin(value)).filter((value): value is string => Boolean(value)))
)

export const corsOptions: FastifyCorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }

    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true)
    }

    appLogger.warn('cors', `Blocked CORS origin: ${origin}`)

    return callback(
      Object.assign(new Error(`The domain ${origin} is not allowed to access this resource`), {
        statusCode: HTTP_STATUS.FORBIDDEN
      }),
      false
    )
  },
  optionsSuccessStatus: 200,
  credentials: true
}
