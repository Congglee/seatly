-- AlterTable
ALTER TABLE "dish_snapshots" ALTER COLUMN "status" SET DEFAULT 'Available';

-- AlterTable
ALTER TABLE "dishes" ALTER COLUMN "status" SET DEFAULT 'Available';

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" SET DEFAULT 'Pending';
