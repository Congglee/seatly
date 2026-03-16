import envConfig, { API_URL } from '@/config/environment'
import buildApp from '@/app'
import appLogger from '@/config/logger'
import { initOwnerAccount } from '@/controllers/account.controller'

const fastify = buildApp()

let isShuttingDown = false

const shutdown = async (signal: string, error?: unknown) => {
  if (isShuttingDown) {
    return
  }

  isShuttingDown = true

  if (error) {
    appLogger.error('server', `Shutdown triggered by ${signal}`, error)
  } else {
    appLogger.info('server', `Received ${signal}. Starting graceful shutdown`)
  }

  try {
    await fastify.close()
    appLogger.info('server', 'Fastify server closed gracefully')
  } catch (closeError) {
    appLogger.error('server', 'Failed to close Fastify cleanly', closeError)
  }

  process.exit(error ? 1 : 0)
}

const startServer = async () => {
  try {
    await fastify.ready()
    await initOwnerAccount()

    await fastify.listen({
      port: envConfig.PORT,
      host: envConfig.DOCKER ? '0.0.0.0' : 'localhost'
    })

    appLogger.success('server', `Server is running on ${API_URL}`)
  } catch (error) {
    appLogger.error('server', 'Server bootstrap failed', error)

    try {
      await fastify.close()
    } catch (closeError) {
      appLogger.error('server', 'Failed to close Fastify after bootstrap error', closeError)
    }

    process.exit(1)
  }
}

process.once('SIGINT', () => {
  void shutdown('SIGINT')
})

process.once('SIGTERM', () => {
  void shutdown('SIGTERM')
})

process.once('uncaughtException', (error) => {
  void shutdown('uncaughtException', error)
})

process.once('unhandledRejection', (reason) => {
  void shutdown('unhandledRejection', reason)
})

void startServer()
