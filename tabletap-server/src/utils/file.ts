import {
  ALLOWED_IMAGE_MIME_TYPES,
  type AllowedImageMimeType,
  MAX_IMAGE_FILE_SIZE,
  MAX_IMAGE_MULTIPART_FIELDS,
  MAX_IMAGE_MULTIPART_PARTS,
  MULTIPLE_IMAGE_FIELD_NAME,
  SINGLE_IMAGE_FIELD_NAMES
} from '@/constants/media'
import appLogger from '@/config/logger'
import HTTP_STATUS from '@/constants/http-status'
import { StatusError } from '@/utils/errors'
import type { SavedMultipartFile } from '@fastify/multipart'
import type { FastifyRequest } from 'fastify'
import fs from 'fs/promises'
import path from 'path'

type ParseImageFilesOptions = {
  maxFiles: number
  allowedFieldNames: readonly string[]
}

const normalizeMultipartError = (error: unknown, maxFiles: number): never => {
  if (!error || typeof error !== 'object' || !('code' in error)) {
    throw error
  }

  const code = String(error.code)

  if (code === 'FST_REQ_FILE_TOO_LARGE') {
    throw new StatusError({
      message: `Each image must be ${MAX_IMAGE_FILE_SIZE / (1024 * 1024)}MB or smaller`,
      status: HTTP_STATUS.PAYLOAD_TOO_LARGE
    })
  }

  if (code === 'FST_FILES_LIMIT' || code === 'FST_PARTS_LIMIT') {
    throw new StatusError({
      message: `You can upload up to ${maxFiles} image${maxFiles > 1 ? 's' : ''} per request`,
      status: HTTP_STATUS.PAYLOAD_TOO_LARGE
    })
  }

  if (code === 'FST_FIELDS_LIMIT') {
    throw new StatusError({
      message: 'Too many multipart fields',
      status: HTTP_STATUS.PAYLOAD_TOO_LARGE
    })
  }

  if (code === 'FST_INVALID_MULTIPART_CONTENT_TYPE') {
    throw new StatusError({
      message: 'Content-Type must be multipart/form-data',
      status: HTTP_STATUS.BAD_REQUEST
    })
  }

  throw error
}

const detectImageMimeType = async (filepath: string): Promise<AllowedImageMimeType | null> => {
  const handle = await fs.open(filepath, 'r')

  try {
    const buffer = Buffer.alloc(12)
    const { bytesRead } = await handle.read(buffer, 0, buffer.length, 0)

    if (bytesRead >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return 'image/jpeg'
    }

    if (
      bytesRead >= 8 &&
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a
    ) {
      return 'image/png'
    }

    if (bytesRead >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
      return 'image/webp'
    }

    return null
  } finally {
    await handle.close()
  }
}

const assertImageFile = async (file: SavedMultipartFile, allowedFieldNames: readonly string[]) => {
  if (!allowedFieldNames.includes(file.fieldname)) {
    throw new StatusError({
      message: `Invalid file field. Allowed field name${allowedFieldNames.length > 1 ? 's are' : ' is'}: ${allowedFieldNames.join(', ')}`,
      status: HTTP_STATUS.BAD_REQUEST
    })
  }

  const extension = path.extname(file.filename).toLowerCase()
  const allowedExtensions = ALLOWED_IMAGE_MIME_TYPES[file.mimetype as AllowedImageMimeType] as
    | readonly string[]
    | undefined

  if (!allowedExtensions || !allowedExtensions.includes(extension)) {
    throw new StatusError({
      message: 'Only JPG, JPEG, PNG and WEBP images are allowed',
      status: HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE
    })
  }

  const stats = await fs.stat(file.filepath)

  if (stats.size === 0) {
    throw new StatusError({
      message: 'Image file is empty',
      status: HTTP_STATUS.BAD_REQUEST
    })
  }

  const detectedMimeType = await detectImageMimeType(file.filepath)

  if (!detectedMimeType || detectedMimeType !== file.mimetype) {
    throw new StatusError({
      message: 'Uploaded file content does not match a supported image format',
      status: HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE
    })
  }

  return {
    ...file,
    extension,
    size: stats.size
  }
}

export type ParsedImageFile = Awaited<ReturnType<typeof assertImageFile>>

export const parseImageFiles = async (
  request: FastifyRequest,
  options: ParseImageFilesOptions
): Promise<ParsedImageFile[]> => {
  try {
    const files = await request.saveRequestFiles({
      limits: {
        fileSize: MAX_IMAGE_FILE_SIZE,
        files: options.maxFiles,
        fields: MAX_IMAGE_MULTIPART_FIELDS,
        parts: MAX_IMAGE_MULTIPART_PARTS
      }
    })

    if (files.length === 0) {
      throw new StatusError({
        message:
          options.maxFiles === 1
            ? `Image file is required. Use field ${SINGLE_IMAGE_FIELD_NAMES.join(' or ')}`
            : `Image files are required. Use field ${MULTIPLE_IMAGE_FIELD_NAME}`,
        status: HTTP_STATUS.BAD_REQUEST
      })
    }

    return await Promise.all(files.map((file) => assertImageFile(file, options.allowedFieldNames)))
  } catch (error) {
    return normalizeMultipartError(error, options.maxFiles)
  }
}

export const cleanupRequestFiles = async (request: FastifyRequest) => {
  if (!request.tmpUploads && !request.savedRequestFiles) {
    return
  }

  try {
    await request.cleanRequestFiles()
  } catch {
    appLogger.warn('media', 'Failed to cleanup multipart temp files')
  }
}
