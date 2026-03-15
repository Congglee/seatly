import { PrismaClient } from '@prisma/client'
import { type TokenPayload } from '@/types/jwt.type'
import { type Server } from 'socket.io'
import { type AppEnvironment, type EnvConfig } from '@/config/environment'

declare global {
  interface BigInt {
    toJSON(): string
  }

  namespace NodeJS {
    interface ProcessEnv extends EnvConfig {
      NODE_ENV: AppEnvironment
    }
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    io: Server
  }

  interface FastifyRequest {
    decodedAccessToken?: TokenPayload
  }
}
