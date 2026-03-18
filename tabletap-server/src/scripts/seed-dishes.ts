process.env.NODE_ENV = process.env.NODE_ENV ?? 'development'

import type { Prisma } from '@prisma/client'
import { DishStatus } from '@/constants/type'

type SeedDish = Prisma.DishUncheckedCreateInput

const seedDishes: SeedDish[] = [
  {
    id: '2d1e4b1c-9f83-4ef9-a3b1-10f4d91c1001',
    name: 'Margherita Pizza',
    price: 189000,
    description:
      'Thin-crust Italian-style pizza with tomato sauce, mozzarella, black olives, and roasted bell peppers.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pizza-3007395.jpg/1280px-Pizza-3007395.jpg',
    status: DishStatus.Available,
    createdAt: new Date('2026-03-01T08:00:00.000Z'),
    updatedAt: new Date('2026-03-10T09:30:00.000Z'),
    isOutOfStock: false,
    stockUpdatedAt: new Date('2026-03-10T09:30:00.000Z'),
    estimatedPrepMinutes: 18
  },
  {
    id: '3f7b2f9e-8b7d-4f4a-9f9d-20a5d91c1002',
    name: 'Classic Cheeseburger',
    price: 149000,
    description: 'Grilled beef burger with double patties, melted cheese, pickles, onion, and house special sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    status: DishStatus.Available,
    createdAt: new Date('2026-03-01T08:15:00.000Z'),
    updatedAt: new Date('2026-03-11T10:15:00.000Z'),
    isOutOfStock: false,
    stockUpdatedAt: new Date('2026-03-11T10:15:00.000Z'),
    estimatedPrepMinutes: 14
  },
  {
    id: '4a90e31d-0dcb-4d9b-a6a0-30b6d91c1003',
    name: 'BBQ Beef Ribs',
    price: 269000,
    description: 'Tender BBQ beef ribs served with fries, pickles, and rich brown sauce.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    status: DishStatus.Available,
    createdAt: new Date('2026-03-01T08:30:00.000Z'),
    updatedAt: new Date('2026-03-12T11:00:00.000Z'),
    isOutOfStock: false,
    stockUpdatedAt: new Date('2026-03-12T11:00:00.000Z'),
    estimatedPrepMinutes: 25
  },
  {
    id: '58b21479-c2d5-4aa6-9cc3-40c7d91c1004',
    name: 'Teriyaki Salmon Fillet',
    price: 239000,
    description: 'Pan-seared salmon fillet glazed with teriyaki sauce and served with a fresh vegetable salad.',
    image: 'https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg?auto=compress&cs=tinysrgb&w=1200',
    status: DishStatus.Available,
    createdAt: new Date('2026-03-01T08:45:00.000Z'),
    updatedAt: new Date('2026-03-12T13:20:00.000Z'),
    isOutOfStock: false,
    stockUpdatedAt: new Date('2026-03-12T13:20:00.000Z'),
    estimatedPrepMinutes: 16
  },
  {
    id: '6c33a2f5-53b9-4d7a-b5de-50d8d91c1005',
    name: 'Deluxe Sushi Platter',
    price: 289000,
    description: 'Assorted sushi platter with nigiri and maki featuring salmon, shrimp, tuna, and avocado.',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1200',
    status: DishStatus.Available,
    createdAt: new Date('2026-03-01T09:00:00.000Z'),
    updatedAt: new Date('2026-03-13T07:45:00.000Z'),
    isOutOfStock: false,
    stockUpdatedAt: new Date('2026-03-13T07:45:00.000Z'),
    estimatedPrepMinutes: 22
  },
  {
    id: '7de4f0ab-6b55-4d2a-8c0d-60e9d91c1006',
    name: 'Garden Fresh Salad',
    price: 99000,
    description:
      'Fresh green salad tossed with olives, walnuts, shredded carrots, soft cheese, and a light citrus dressing.',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
    status: DishStatus.Hidden,
    createdAt: new Date('2026-03-01T09:15:00.000Z'),
    updatedAt: new Date('2026-03-13T08:10:00.000Z'),
    isOutOfStock: false,
    stockUpdatedAt: new Date('2026-03-13T08:10:00.000Z'),
    estimatedPrepMinutes: 8
  },
  {
    id: '8ef5a6bc-7460-4d9d-9f1a-70fad91c1007',
    name: 'Prawn Curry Rice',
    price: 179000,
    description: 'Fusion-style prawn curry rice with a rich savory sauce, cilantro, and scallions.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    status: DishStatus.Unavailable,
    createdAt: new Date('2026-03-01T09:30:00.000Z'),
    updatedAt: new Date('2026-03-13T09:00:00.000Z'),
    isOutOfStock: true,
    stockUpdatedAt: new Date('2026-03-14T04:20:00.000Z'),
    estimatedPrepMinutes: 17
  },
  {
    id: '9fa67bcd-8f72-4e0b-a34e-80abd91c1008',
    name: 'Pappardelle Beef Ragu',
    price: 199000,
    description: 'Pappardelle pasta with slow-braised beef ragu, tomatoes, herbs, and fresh parsley.',
    image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9?auto=format&fit=crop&w=1200&q=80',
    status: DishStatus.Available,
    createdAt: new Date('2026-03-01T09:45:00.000Z'),
    updatedAt: new Date('2026-03-13T09:40:00.000Z'),
    isOutOfStock: false,
    stockUpdatedAt: new Date('2026-03-13T09:40:00.000Z'),
    estimatedPrepMinutes: 19
  },
  {
    id: 'ab078cde-91a4-4f1c-b45f-90acd91c1009',
    name: 'Grilled Chicken Burrito',
    price: 139000,
    description: 'Grilled chicken burrito wrapped with Mexican-seasoned rice, bell peppers, onions, and sour cream.',
    image: 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1200',
    status: DishStatus.Available,
    createdAt: new Date('2026-03-01T10:00:00.000Z'),
    updatedAt: new Date('2026-03-13T10:05:00.000Z'),
    isOutOfStock: false,
    stockUpdatedAt: new Date('2026-03-13T10:05:00.000Z'),
    estimatedPrepMinutes: 12
  },
  {
    id: 'bc189def-a2b6-4f2d-c560-a1acd91c1010',
    name: 'Shoyu Ramen',
    price: 159000,
    description: 'Japanese soy sauce ramen topped with sliced pork, narutomaki, seaweed, and scallions.',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg/1280px-Shoyu_ramen%2C_at_Kasukabe_Station_%282014.05.05%29_1.jpg',
    status: DishStatus.Unavailable,
    createdAt: new Date('2026-03-01T10:15:00.000Z'),
    updatedAt: new Date('2026-03-13T10:30:00.000Z'),
    isOutOfStock: true,
    stockUpdatedAt: new Date('2026-03-14T05:10:00.000Z'),
    estimatedPrepMinutes: 15
  }
]

const buildUpdateData = ({ id, createdAt, ...dish }: SeedDish): Prisma.DishUncheckedUpdateInput => ({
  ...dish,
  updatedAt: dish.updatedAt,
  stockUpdatedAt: dish.stockUpdatedAt
})

const main = async () => {
  const [{ default: prisma, connectPrisma }, { default: appLogger }] = await Promise.all([
    import('../database'),
    import('../config/logger')
  ])

  try {
    await connectPrisma()

    const seededDishes = await prisma.$transaction(
      seedDishes.map((dish) =>
        prisma.dish.upsert({
          where: { id: dish.id },
          create: dish,
          update: buildUpdateData(dish)
        })
      )
    )

    appLogger.success('seed-dishes', `Seeded ${seededDishes.length} dishes successfully`)

    console.table(
      seededDishes.map((dish: any) => ({
        id: dish.id,
        name: dish.name,
        status: dish.status,
        price: dish.price,
        isOutOfStock: dish.isOutOfStock
      }))
    )
  } catch (error) {
    console.error('Failed to seed dishes.')
    console.error(error)
    process.exitCode = 1
  } finally {
    try {
      const { disconnectPrisma } = await import('../database')
      await disconnectPrisma()
    } catch (disconnectError) {
      console.error('Failed to disconnect Prisma cleanly after seeding dishes.')
      console.error(disconnectError)
      process.exitCode = 1
    }
  }
}

void main()
