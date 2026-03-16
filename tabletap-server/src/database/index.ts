import envConfig from '@/config/environment'
import appLogger from '@/config/logger'
import { Prisma, PrismaClient } from '@prisma/client'

type PrismaGlobal = typeof globalThis & {
  prisma?: PrismaClient
}

const globalForPrisma = globalThis as PrismaGlobal

const prismaLogLevels: Prisma.LogLevel[] = envConfig.PRODUCTION ? ['warn', 'error'] : ['info', 'warn', 'error']

const createPrismaClient = () =>
  new PrismaClient({
    datasourceUrl: envConfig.DATABASE_URL,
    log: prismaLogLevels
  })

const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (!envConfig.PRODUCTION) {
  globalForPrisma.prisma = prisma
}

let connectPromise: Promise<PrismaClient> | null = null
let disconnectPromise: Promise<void> | null = null
let isConnected = false

export const connectPrisma = async () => {
  if (isConnected) {
    return prisma
  }

  if (!connectPromise) {
    connectPromise = (async () => {
      await prisma.$connect()
      await prisma.$queryRaw`SELECT 1`

      isConnected = true

      appLogger.success('database', 'Prisma connected to PostgreSQL successfully')

      return prisma
    })().catch(async (error: unknown) => {
      try {
        await prisma.$disconnect()
      } catch (disconnectError) {
        appLogger.error('database', 'Failed to rollback Prisma connection after startup error', disconnectError)
      }

      isConnected = false
      connectPromise = null

      appLogger.error('database', 'Failed to connect Prisma to PostgreSQL', error)

      throw error
    })
  }

  return connectPromise
}

export const disconnectPrisma = async () => {
  if (disconnectPromise) {
    return disconnectPromise
  }

  if (!isConnected && !connectPromise) {
    return
  }

  disconnectPromise = prisma
    .$disconnect()
    .then(() => {
      isConnected = false
      connectPromise = null

      appLogger.info('database', 'Prisma disconnected from PostgreSQL')
    })
    .catch((error: unknown) => {
      appLogger.error('database', 'Failed to disconnect Prisma cleanly', error)
      throw error
    })
    .finally(() => {
      disconnectPromise = null
    })

  return disconnectPromise
}

export default prisma
