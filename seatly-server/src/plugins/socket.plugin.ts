import { ManagerRoom, Role } from '@/constants/type'
import prisma from '@/database'
import appLogger from '@/config/logger'
import { AuthError } from '@/utils/errors'
import { verifyAccessToken } from '@/utils/jwt'
import fastifyPlugin from 'fastify-plugin'

const socketPlugin = fastifyPlugin(async (fastify) => {
  fastify.io.use(async (socket, next) => {
    const { Authorization } = socket.handshake.auth

    if (!Authorization) {
      appLogger.warn('socket', `Socket auth missing authorization header: ${socket.id}`)
      return next(new AuthError('Authorization is invalid'))
    }

    const accessToken = Authorization.split(' ')[1]

    try {
      const decodedAccessToken = verifyAccessToken(accessToken)
      const { userId, role } = decodedAccessToken

      if (role === Role.Guest) {
        await prisma.socket.upsert({
          where: { guestId: userId },
          update: { socketId: socket.id },
          create: {
            guestId: userId,
            socketId: socket.id
          }
        })
      } else {
        await prisma.socket.upsert({
          where: { accountId: userId },
          update: { socketId: socket.id },
          create: {
            accountId: userId,
            socketId: socket.id
          }
        })
        socket.join(ManagerRoom)
      }

      appLogger.debug('socket', `Socket authenticated: ${socket.id}`)
      socket.handshake.auth.decodedAccessToken = decodedAccessToken
    } catch (error: any) {
      appLogger.warn('socket', `Socket authentication failed: ${socket.id}`, error)
      return next(error)
    }

    next()
  })

  fastify.io.on('connection', async (socket) => {
    appLogger.info('socket', `Socket connected: ${socket.id}`)
    socket.on('disconnect', async (reason) => {
      appLogger.info('socket', `Socket disconnected: ${socket.id}. Reason: ${reason}`)
    })
  })
})

export default socketPlugin
