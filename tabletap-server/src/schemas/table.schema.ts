import { TableStatusValues } from '@/constants/type'
import { z } from 'zod'

export const CreateTableBody = z.object({
  number: z.coerce.number().positive({ message: 'Table number must be greater than 0' }),
  capacity: z.coerce.number().positive({ message: 'Capacity must be greater than 0' }),
  status: z.enum(TableStatusValues).optional()
})

export type CreateTableBodyType = z.TypeOf<typeof CreateTableBody>

export const TableSchema = z.object({
  number: z.coerce.number(),
  capacity: z.coerce.number(),
  status: z.enum(TableStatusValues),
  token: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isOccupied: z.boolean(),
  occupiedAt: z.date().optional(),
  lastActivityAt: z.date().optional()
})

export const TableRes = z.object({
  data: TableSchema,
  message: z.string()
})

export const TableListQuery = z.object({
  page: z.coerce.number().positive().lte(10000).default(1),
  limit: z.coerce.number().positive().lte(10000).default(10)
})

export type TableListQueryType = z.TypeOf<typeof TableListQuery>

export type TableResType = z.TypeOf<typeof TableRes>

export const TableListRes = z.object({
  data: z.object({
    items: z.array(TableSchema),
    totalItem: z.number(),
    totalPage: z.number(),
    page: z.number(),
    limit: z.number()
  }),
  message: z.string()
})

export type TableListResType = z.TypeOf<typeof TableListRes>

export const UpdateTableBody = z.object({
  changeToken: z.boolean(),
  capacity: z.coerce.number().positive({ message: 'Capacity must be greater than 0' }),
  status: z.enum(TableStatusValues).optional()
})

export type UpdateTableBodyType = z.TypeOf<typeof UpdateTableBody>

export const TableParams = z.object({
  number: z.coerce.number()
})

export type TableParamsType = z.TypeOf<typeof TableParams>
