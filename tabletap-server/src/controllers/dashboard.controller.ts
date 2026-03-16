import envConfig from '@/config/environment'
import { OrderStatus } from '@/constants/type'
import prisma from '@/database'
import { DashboardIndicatorQueryParamsType } from '@/schemas/dashboard.schema'

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

const createDateKeyFormatter = (timeZone: string) =>
  new Intl.DateTimeFormat('en', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

const getDateKey = (date: Date, formatter: Intl.DateTimeFormat) => {
  const parts = formatter.formatToParts(date)
  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value

  if (!year || !month || !day) {
    throw new Error('Cannot resolve date parts for dashboard analytics')
  }

  return `${year}-${month}-${day}`
}

const getDateLabel = (dateKey: string) => {
  const [year, month, day] = dateKey.split('-')
  return `${day}/${month}/${year}`
}

const getAbstractDateFromKey = (dateKey: string) => {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(Date.UTC(year, month - 1, day))
}

const createDateRangeKeys = ({
  fromDate,
  toDate,
  formatter
}: {
  fromDate: Date
  toDate: Date
  formatter: Intl.DateTimeFormat
}) => {
  const startDate = getAbstractDateFromKey(getDateKey(fromDate, formatter))
  const endDate = getAbstractDateFromKey(getDateKey(toDate, formatter))
  const keys: string[] = []
  const utcFormatter = createDateKeyFormatter('UTC')

  for (let cursor = startDate.getTime(); cursor <= endDate.getTime(); cursor += DAY_IN_MILLISECONDS) {
    keys.push(getDateKey(new Date(cursor), utcFormatter))
  }

  return keys
}

export const getDashboardIndicatorsController = async ({
  fromDate,
  toDate
}: DashboardIndicatorQueryParamsType) => {
  const timeZone = envConfig.SERVER_TIMEZONE
  const dateKeyFormatter = createDateKeyFormatter(timeZone)
  const rangeDateKeys = createDateRangeKeys({
    fromDate,
    toDate,
    formatter: dateKeyFormatter
  })

  const [paidOrders, servingOrders] = await Promise.all([
    prisma.order.findMany({
      where: {
        status: OrderStatus.Paid,
        updatedAt: {
          gte: fromDate,
          lte: toDate
        }
      },
      orderBy: {
        updatedAt: 'asc'
      },
      select: {
        guestId: true,
        quantity: true,
        updatedAt: true,
        dishSnapshot: {
          select: {
            id: true,
            dishId: true,
            name: true,
            price: true,
            description: true,
            image: true,
            status: true
          }
        }
      }
    }),
    prisma.order.findMany({
      where: {
        status: {
          in: [OrderStatus.Pending, OrderStatus.Processing, OrderStatus.Delivered]
        },
        tableNumber: {
          not: null
        }
      },
      select: {
        tableNumber: true
      }
    })
  ])

  let revenue = 0
  let orderCount = 0
  const paidGuestIds = new Set<string>()
  const servingTableNumbers = new Set<number>(
    servingOrders
      .map((order) => order.tableNumber)
      .filter((tableNumber): tableNumber is number => tableNumber !== null)
  )
  const revenueByDateMap = new Map<string, number>(
    rangeDateKeys.map((dateKey) => [dateKey, 0])
  )
  const dishIndicatorMap = new Map<
    string,
    {
      id: string
      name: string
      price: number
      description: string
      image: string
      status: string
      successOrders: number
    }
  >()

  paidOrders.forEach((order) => {
    orderCount += 1
    revenue += order.dishSnapshot.price * order.quantity

    if (order.guestId) {
      paidGuestIds.add(order.guestId)
    }

    const dateKey = getDateKey(order.updatedAt, dateKeyFormatter)
    revenueByDateMap.set(
      dateKey,
      (revenueByDateMap.get(dateKey) ?? 0) + order.dishSnapshot.price * order.quantity
    )

    const dishKey =
      order.dishSnapshot.dishId ??
      `deleted:${order.dishSnapshot.name}:${order.dishSnapshot.price}:${order.dishSnapshot.description}`
    const currentDishIndicator = dishIndicatorMap.get(dishKey)

    if (currentDishIndicator) {
      currentDishIndicator.successOrders += 1
      return
    }

    dishIndicatorMap.set(dishKey, {
      id: dishKey,
      name: order.dishSnapshot.name,
      price: order.dishSnapshot.price,
      description: order.dishSnapshot.description,
      image: order.dishSnapshot.image,
      status: order.dishSnapshot.status,
      successOrders: 1
    })
  })

  const revenueByDate = Array.from(revenueByDateMap.entries())
    .sort(([firstDate], [secondDate]) => firstDate.localeCompare(secondDate))
    .map(([dateKey, dailyRevenue]) => ({
      date: getDateLabel(dateKey),
      revenue: dailyRevenue
    }))

  const dishIndicator = Array.from(dishIndicatorMap.values()).sort(
    (firstDish, secondDish) => secondDish.successOrders - firstDish.successOrders
  )

  return {
    revenue,
    guestCount: paidGuestIds.size,
    orderCount,
    servingTableCount: servingTableNumbers.size,
    dishIndicator,
    revenueByDate
  }
}
