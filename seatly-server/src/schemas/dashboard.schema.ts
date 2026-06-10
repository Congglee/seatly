import { z } from 'zod'

export const DashboardIndicatorQueryParams = z
  .object({
    fromDate: z.coerce.date(),
    toDate: z.coerce.date()
  })
  .superRefine(({ fromDate, toDate }, ctx) => {
    if (fromDate > toDate) {
      ctx.addIssue({
        code: 'custom',
        message: 'fromDate must be less than or equal to toDate',
        path: ['fromDate']
      })
    }
  })

export type DashboardIndicatorQueryParamsType = z.TypeOf<typeof DashboardIndicatorQueryParams>

export const DashboardDishIndicatorSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image: z.string(),
  status: z.string(),
  successOrders: z.number()
})

export const DashboardRevenueByDateSchema = z.object({
  date: z.string(),
  revenue: z.number()
})

export const DashboardIndicatorRes = z.object({
  data: z.object({
    revenue: z.number(),
    guestCount: z.number(),
    orderCount: z.number(),
    servingTableCount: z.number(),
    dishIndicator: z.array(DashboardDishIndicatorSchema),
    revenueByDate: z.array(DashboardRevenueByDateSchema)
  }),
  message: z.string()
})

export type DashboardIndicatorResType = z.TypeOf<typeof DashboardIndicatorRes>
