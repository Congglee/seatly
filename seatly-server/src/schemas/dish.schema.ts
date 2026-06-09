import { DishStatusValues } from '@/constants/type'
import { z } from 'zod'

export const DishStatus = z.enum(DishStatusValues)

export type DishStatusType = z.TypeOf<typeof DishStatus>

export const CreateDishBody = z.object({
  name: z.string().trim().min(1, 'Dish name is required').max(256),
  price: z.coerce.number().positive({ message: 'Price must be greater than 0' }),
  description: z.string().trim().min(1, 'Description is required').max(10000),
  image: z.string().trim().min(1, 'Image is required').url({ message: 'Image must be a valid URL' }),
  status: z.enum(DishStatusValues).optional()
})

export type CreateDishBodyType = z.TypeOf<typeof CreateDishBody>

export const DishSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  image: z.string(),
  status: z.enum(DishStatusValues),
  createdAt: z.date(),
  updatedAt: z.date()
})

export type DishType = z.TypeOf<typeof DishSchema>

export const DishRes = z.object({
  data: DishSchema,
  message: z.string()
})

export type DishResType = z.TypeOf<typeof DishRes>

export const DishListQuery = z.object({
  page: z.coerce.number().positive().lte(10000).default(1),
  limit: z.coerce.number().positive().lte(10000).default(10)
})

export type DishListQueryType = z.TypeOf<typeof DishListQuery>

export const DishListRes = z.object({
  data: z.object({
    items: z.array(DishSchema),
    totalItem: z.number(),
    totalPage: z.number(),
    page: z.number(),
    limit: z.number()
  }),
  message: z.string()
})

export type DishListResType = z.TypeOf<typeof DishListRes>

export const UpdateDishBody = CreateDishBody

export type UpdateDishBodyType = z.TypeOf<typeof UpdateDishBody>

export const DishParams = z.object({
  id: z.string()
})

export type DishParamsType = z.TypeOf<typeof DishParams>
