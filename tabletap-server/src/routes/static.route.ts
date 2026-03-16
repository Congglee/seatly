import envConfig from '@/config/environment'
import fastifyStatic from '@fastify/static'
import { FastifyInstance } from 'fastify'
import path from 'path'

export default async function staticRoutes(fastify: FastifyInstance) {
  fastify.register(fastifyStatic, {
    root: path.resolve(envConfig.UPLOAD_FOLDER)
  })

  fastify.get<{ Params: { id: string } }>('/static/:id', async (request, reply) => {
    return reply.sendFile(request.params.id)
  })
}
