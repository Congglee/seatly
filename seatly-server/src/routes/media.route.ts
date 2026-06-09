import { Role } from '@/constants/type'
import { uploadImage, uploadImages } from '@/controllers/media.controller'
import { requireLoginedHook, requireRoleHook } from '@/hooks/auth.hook'
import {
  UploadImageRes,
  UploadImagesRes,
  type UploadImageResType,
  type UploadImagesResType
} from '@/schemas/media.schema'
import fastifyMultipart from '@fastify/multipart'
import { FastifyInstance } from 'fastify'

export default async function mediaRoutes(fastify: FastifyInstance) {
  fastify.register(fastifyMultipart, {
    throwFileSizeLimit: true
  })

  fastify.addHook(
    'preValidation',
    fastify.auth([requireLoginedHook, [requireRoleHook(Role.Owner), requireRoleHook(Role.Employee)]], {
      relation: 'and'
    })
  )

  fastify.post<{
    Reply: UploadImageResType
  }>(
    '/upload',
    {
      schema: {
        response: { 200: UploadImageRes }
      }
    },
    async (request, reply) => {
      const url = await uploadImage(request)

      return reply.send({ message: 'Upload image successfully', data: url })
    }
  )

  fastify.post<{
    Reply: UploadImagesResType
  }>(
    '/upload/images',
    {
      schema: {
        response: { 200: UploadImagesRes }
      }
    },
    async (request, reply) => {
      const urls = await uploadImages(request)

      return reply.send({ message: 'Upload images successfully', data: urls })
    }
  )
}
