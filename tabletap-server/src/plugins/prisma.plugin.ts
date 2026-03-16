import prisma, { connectPrisma, disconnectPrisma } from '@/database'
import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'

let registeredAppCount = 0

export const prismaPlugin: FastifyPluginAsync = fp(
  async (fastify) => {
    registeredAppCount += 1

    if (!fastify.hasDecorator('prisma')) {
      fastify.decorate('prisma', prisma)
    }

    fastify.addHook('onReady', async () => {
      await connectPrisma()
    })

    fastify.addHook('onClose', async () => {
      registeredAppCount = Math.max(registeredAppCount - 1, 0)

      if (registeredAppCount === 0) {
        await disconnectPrisma()
      }
    })
  },
  {
    name: 'prisma-plugin',
    fastify: '4.x'
  }
)

export default prismaPlugin
