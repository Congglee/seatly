import { z } from 'zod'

export const UploadImageRes = z.object({
  data: z.string(),
  message: z.string()
})

export type UploadImageResType = z.TypeOf<typeof UploadImageRes>

export const UploadImagesRes = z.object({
  data: z.array(z.string()),
  message: z.string()
})

export type UploadImagesResType = z.TypeOf<typeof UploadImagesRes>
