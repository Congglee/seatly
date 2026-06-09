import appLogger from '@/config/logger'
import { config as loadEnv } from 'dotenv'
import fs from 'fs'
import path from 'path'
import z from 'zod'

const APP_ENVIRONMENTS = ['development', 'staging', 'production'] as const

const appEnvironmentSchema = z.enum(APP_ENVIRONMENTS)

const resolvedNodeEnv = appEnvironmentSchema.safeParse(process.env.NODE_ENV)

if (!resolvedNodeEnv.success) {
  throw new Error('NODE_ENV is required and must be one of: development, staging, production')
}

export const environment = resolvedNodeEnv.data
const envFileName = `.env.${environment}`
const envFilePath = path.resolve(envFileName)

if (!fs.existsSync(envFilePath)) {
  throw new Error(`Environment file ${envFileName} not found`)
}

loadEnv({ path: envFilePath })

appLogger.info('environment', `Loaded environment file: ${envFileName}`)

export const envConfigSchema = z.object({
  PORT: z.coerce.number().default(4000),

  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),

  DOMAIN: z.string(),
  PROTOCOL: z.string(),

  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),

  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),

  GUEST_ACCESS_TOKEN_EXPIRES_IN: z.string(),
  GUEST_REFRESH_TOKEN_EXPIRES_IN: z.string(),

  UPLOAD_FOLDER: z.string(),

  INITIAL_EMAIL_OWNER: z.string(),
  INITIAL_PASSWORD_OWNER: z.string(),

  CLIENT_URL: z.string(),

  PRODUCTION: z.enum(['true', 'false']).transform((value) => value === 'true'),
  DOCKER: z.enum(['true', 'false']).transform((value) => value === 'true'),
  PRODUCTION_URL: z.string(),

  PAUSE_SOME_ENDPOINTS: z.enum(['true', 'false']).transform((value) => value === 'true')
})

const parsedEnv = envConfigSchema.safeParse(process.env)

if (!parsedEnv.success) {
  appLogger.error('environment', 'Invalid environment variables', parsedEnv.error.issues)
  throw new Error('Invalid environment variables')
}

const envConfig = parsedEnv.data

export const API_URL = envConfig.PRODUCTION
  ? envConfig.PRODUCTION_URL
  : `${envConfig.PROTOCOL}://${envConfig.DOMAIN}:${envConfig.PORT}`

export type EnvConfig = z.infer<typeof envConfigSchema>
export type EnvConfigKey = keyof EnvConfig
export type AppEnvironment = (typeof APP_ENVIRONMENTS)[number]

export default envConfig
