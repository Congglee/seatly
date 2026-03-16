export const MAX_IMAGE_FILE_SIZE = 4 * 1024 * 1024
export const MAX_IMAGE_FILES = 4
export const MAX_IMAGE_MULTIPART_FIELDS = 10
export const MAX_IMAGE_MULTIPART_PARTS = MAX_IMAGE_FILES + MAX_IMAGE_MULTIPART_FIELDS

export const SINGLE_IMAGE_FIELD_NAMES = ['image'] as const
export const MULTIPLE_IMAGE_FIELD_NAME = 'images'

export const ALLOWED_IMAGE_MIME_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp']
} as const

export type AllowedImageMimeType = keyof typeof ALLOWED_IMAGE_MIME_TYPES
