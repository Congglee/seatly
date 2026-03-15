import appLogger from '@/config/logger'
import { AuthError, EntityError, ForbiddenError, StatusError, isPrismaClientKnownRequestError } from '@/utils/errors'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { FastifyError } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import { ZodError } from 'zod'

type ZodFastifyError = FastifyError & ZodError

const isZodFastifyError = (error: any): error is ZodFastifyError => {
  if (error instanceof ZodError) {
    return true
  }
  return false
}

const isEntityError = (error: any): error is EntityError => {
  if (error instanceof EntityError) {
    return true
  }
  return false
}

const isAuthError = (error: any): error is AuthError => {
  if (error instanceof AuthError) {
    return true
  }
  return false
}

const isForbiddenError = (error: any): error is ForbiddenError => {
  if (error instanceof ForbiddenError) {
    return true
  }
  return false
}

const isStatusError = (error: any): error is StatusError => {
  if (error instanceof StatusError) {
    return true
  }
  return false
}

const errorHandlerPlugin = fastifyPlugin(async (fastify) => {
  fastify.setErrorHandler(function (
    error: EntityError | AuthError | ForbiddenError | FastifyError | ZodFastifyError | PrismaClientKnownRequestError,
    request,
    reply
  ) {
    const requestLabel = `${request.method} ${request.url}`

    if (isEntityError(error)) {
      appLogger.warn('error-handler', `Validation entity error at ${requestLabel}`)
      return reply.status(error.status).send({
        message: 'An error occurred when validating data...',
        errors: error.fields,
        statusCode: error.status
      })
    } else if (isForbiddenError(error)) {
      appLogger.warn('error-handler', `Forbidden error at ${requestLabel}: ${error.message}`)
      return reply.status(error.status).send({
        message: error.message,
        statusCode: error.status
      })
    } else if (isAuthError(error)) {
      appLogger.warn('error-handler', `Auth error at ${requestLabel}: ${error.message}`)
      return reply
        .setCookie('session_token', '', {
          path: '/',
          httpOnly: true,
          sameSite: 'none',
          secure: true
        })
        .status(error.status)
        .send({
          message: error.message,
          statusCode: error.status
        })
    } else if (isStatusError(error)) {
      appLogger.warn('error-handler', `Status error at ${requestLabel}: ${error.message}`)
      return reply.status(error.status).send({
        message: error.message,
        statusCode: error.status
      })
    } else if (isZodFastifyError(error)) {
      const { issues, validationContext } = error
      const errors = issues.map((issue) => {
        return {
          ...issue,
          field: issue.path.join('.')
        }
      })

      const statusCode = 422
      appLogger.warn('error-handler', `Zod validation error at ${requestLabel}`)

      return reply.status(statusCode).send({
        message: `A validation error occurred when validating the ${validationContext}...`,
        errors,
        code: error.code,
        statusCode
      })
    } else if (isPrismaClientKnownRequestError(error) && error.code === 'P2025') {
      const statusCode = 404
      appLogger.warn('error-handler', `Prisma P2025 at ${requestLabel}`)

      return reply.status(statusCode).send({
        message: error.message ?? 'Data not found',
        statusCode: statusCode
      })
    } else {
      const statusCode = (error as any).statusCode || 400
      appLogger.error('error-handler', `Unhandled error at ${requestLabel}`, error)

      return reply.status(statusCode).send({
        message: error.message,
        error,
        statusCode
      })
    }
  })
})

export default errorHandlerPlugin
