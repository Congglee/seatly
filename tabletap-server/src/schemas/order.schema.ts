import { DishStatusValues, OrderStatusValues } from '@/constants/type'
import { AccountSchema } from '@/schemas/account.schema'
import { TableSchema } from '@/schemas/table.schema'
import { z } from 'zod'

const DishSnapshotSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  description: z.string(),
  status: z.enum(DishStatusValues),
  dishId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const OrderSchema = z.object({
  id: z.string(),
  guestId: z.string().nullable(),
  guest: z
    .object({
      id: z.string(),
      name: z.string(),
      tableNumber: z.number().nullable(),
      createdAt: z.date(),
      updatedAt: z.date()
    })
    .nullable(),
  tableNumber: z.number().nullable(),
  dishSnapshotId: z.string(),
  dishSnapshot: DishSnapshotSchema,
  quantity: z.number(),
  orderHandlerId: z.string().nullable(),
  orderHandler: AccountSchema.nullable(),
  status: z.enum(OrderStatusValues),
  createdAt: z.date(),
  updatedAt: z.date()
})

export const UpdateOrderBody = z.object({
  status: z.enum(OrderStatusValues),
  dishId: z.string(),
  quantity: z.number()
})

export type UpdateOrderBodyType = z.TypeOf<typeof UpdateOrderBody>

export const OrderParam = z.object({
  orderId: z.string()
})

export type OrderParamType = z.TypeOf<typeof OrderParam>

export const UpdateOrderRes = z.object({
  message: z.string(),
  data: OrderSchema
})

export type UpdateOrderResType = z.TypeOf<typeof UpdateOrderRes>

export const GetOrdersQueryParams = z.object({
  fromDate: z.coerce.date().optional(),
  toDate: z.coerce.date().optional(),
  page: z.coerce.number().positive().lte(10000).default(1),
  limit: z.coerce.number().positive().lte(10000).default(10)
})

export type GetOrdersQueryParamsType = z.TypeOf<typeof GetOrdersQueryParams>

export const GetOrdersRes = z.object({
  data: z.object({
    items: z.array(OrderSchema),
    totalItem: z.number(),
    totalPage: z.number(),
    page: z.number(),
    limit: z.number()
  }),
  message: z.string()
})

export type GetOrdersResType = z.TypeOf<typeof GetOrdersRes>

export const GetOrderDetailRes = z.object({
  message: z.string(),
  data: OrderSchema.extend({
    table: TableSchema
  })
})

export type GetOrderDetailResType = z.TypeOf<typeof GetOrderDetailRes>

export const PayGuestOrdersBody = z.object({
  guestId: z.string()
})

export type PayGuestOrdersBodyType = z.TypeOf<typeof PayGuestOrdersBody>

export const PayGuestOrdersRes = z.object({
  message: z.string(),
  data: z.array(OrderSchema)
})

export type PayGuestOrdersResType = z.TypeOf<typeof PayGuestOrdersRes>

export const CreateOrdersBody = z
  .object({
    guestId: z.string(),
    orders: z.array(
      z.object({
        dishId: z.string(),
        quantity: z.number()
      })
    )
  })
  .strict()

export type CreateOrdersBodyType = z.TypeOf<typeof CreateOrdersBody>

export const CreateOrdersRes = z.object({
  message: z.string(),
  data: z.array(OrderSchema)
})

export type CreateOrdersResType = z.TypeOf<typeof CreateOrdersRes>
