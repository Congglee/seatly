import envConfig, { API_URL } from '@/config/environment'
import appLogger from '@/config/logger'
import { MAX_IMAGE_FILES, MULTIPLE_IMAGE_FIELD_NAME, SINGLE_IMAGE_FIELD_NAMES } from '@/constants/media'
import { randomId } from '@/utils/commons'
import { cleanupRequestFiles, parseImageFiles } from '@/utils/file'
import type { FastifyRequest } from 'fastify'
import fs from 'fs/promises'
import path from 'path'

const buildImageUrl = (filename: string) => `${API_URL}/static/${filename}`

const copyImageToUploadFolder = async (sourcePath: string, extension: string) => {
  const filename = `${randomId()}${extension}`
  const destinationPath = path.resolve(envConfig.UPLOAD_FOLDER, filename)

  await fs.copyFile(sourcePath, destinationPath)

  return {
    filename,
    filepath: destinationPath,
    url: buildImageUrl(filename)
  }
}

const cleanupUploadedFiles = async (filepaths: string[]) => {
  await Promise.all(
    filepaths.map(async (filepath) => {
      try {
        await fs.unlink(filepath)
      } catch {
        appLogger.warn('media', `Failed to cleanup uploaded file: ${filepath}`)
      }
    })
  )
}

export const uploadImage = async (request: FastifyRequest) => {
  const createdFiles: string[] = []

  try {
    const [file] = await parseImageFiles(request, {
      maxFiles: 1,
      allowedFieldNames: SINGLE_IMAGE_FIELD_NAMES
    })
    const savedFile = await copyImageToUploadFolder(file.filepath, file.extension)

    createdFiles.push(savedFile.filepath)
    appLogger.debug('media', `Upload successful: ${file.filename} -> ${savedFile.url}`)

    return savedFile.url
  } catch (error) {
    await cleanupUploadedFiles(createdFiles)
    throw error
  } finally {
    await cleanupRequestFiles(request)
  }
}

export const uploadImages = async (request: FastifyRequest) => {
  const createdFiles: string[] = []

  try {
    const files = await parseImageFiles(request, {
      maxFiles: MAX_IMAGE_FILES,
      allowedFieldNames: [MULTIPLE_IMAGE_FIELD_NAME]
    })
    const urls: string[] = []

    for (const file of files) {
      const savedFile = await copyImageToUploadFolder(file.filepath, file.extension)

      createdFiles.push(savedFile.filepath)
      urls.push(savedFile.url)
      appLogger.debug('media', `Upload successful: ${file.filename} -> ${savedFile.url}`)
    }

    return urls
  } catch (error) {
    await cleanupUploadedFiles(createdFiles)
    throw error
  } finally {
    await cleanupRequestFiles(request)
  }
}
