-- AlterTable
ALTER TABLE "dish_snapshots" ALTER COLUMN "status" SET DEFAULT 'Active';

-- AlterTable
ALTER TABLE "dishes" ALTER COLUMN "status" SET DEFAULT 'Active',
ALTER COLUMN "stockUpdatedAt" SET DEFAULT CURRENT_TIMESTAMP;
