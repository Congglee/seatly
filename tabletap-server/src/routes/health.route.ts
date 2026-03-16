import { type FastifyInstance } from 'fastify'

export default async function healthRoutes(fastify: FastifyInstance) {
  fastify.get('/check', async (_, reply) => {
    reply.send({ message: 'Server is healthy and ready to serve requests 🚀' })
  })
}
