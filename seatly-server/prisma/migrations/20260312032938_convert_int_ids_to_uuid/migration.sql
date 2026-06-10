/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `dish_snapshots` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `dishes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `guests` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `order_batches` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `order_status_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `table_requests` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "dish_snapshots" DROP CONSTRAINT "dish_snapshots_dishId_fkey";

-- DropForeignKey
ALTER TABLE "order_batches" DROP CONSTRAINT "order_batches_cloneFromBatchId_fkey";

-- DropForeignKey
ALTER TABLE "order_batches" DROP CONSTRAINT "order_batches_guestId_fkey";

-- DropForeignKey
ALTER TABLE "order_status_logs" DROP CONSTRAINT "order_status_logs_changedByAccountId_fkey";

-- DropForeignKey
ALTER TABLE "order_status_logs" DROP CONSTRAINT "order_status_logs_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_dishSnapshotId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_guestId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderBatchId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_orderHandlerId_fkey";

-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_accountId_fkey";

-- DropForeignKey
ALTER TABLE "sockets" DROP CONSTRAINT "sockets_accountId_fkey";

-- DropForeignKey
ALTER TABLE "sockets" DROP CONSTRAINT "sockets_guestId_fkey";

-- DropForeignKey
ALTER TABLE "table_requests" DROP CONSTRAINT "table_requests_guestId_fkey";

-- DropForeignKey
ALTER TABLE "table_requests" DROP CONSTRAINT "table_requests_handlerId_fkey";

-- AlterTable
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ownerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "accounts_id_seq";

-- AlterTable
ALTER TABLE "dish_snapshots" DROP CONSTRAINT "dish_snapshots_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "dishId" SET DATA TYPE TEXT,
ADD CONSTRAINT "dish_snapshots_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "dish_snapshots_id_seq";

-- AlterTable
ALTER TABLE "dishes" DROP CONSTRAINT "dishes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "dishes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "dishes_id_seq";

-- AlterTable
ALTER TABLE "guests" DROP CONSTRAINT "guests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "guests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "guests_id_seq";

-- AlterTable
ALTER TABLE "order_batches" DROP CONSTRAINT "order_batches_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guestId" SET DATA TYPE TEXT,
ALTER COLUMN "cloneFromBatchId" SET DATA TYPE TEXT,
ADD CONSTRAINT "order_batches_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "order_batches_id_seq";

-- AlterTable
ALTER TABLE "order_status_logs" DROP CONSTRAINT "order_status_logs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ALTER COLUMN "changedByAccountId" SET DATA TYPE TEXT,
ADD CONSTRAINT "order_status_logs_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "order_status_logs_id_seq";

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guestId" SET DATA TYPE TEXT,
ALTER COLUMN "dishSnapshotId" SET DATA TYPE TEXT,
ALTER COLUMN "orderHandlerId" SET DATA TYPE TEXT,
ALTER COLUMN "orderBatchId" SET DATA TYPE TEXT,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "orders_id_seq";

-- AlterTable
ALTER TABLE "refresh_tokens" ALTER COLUMN "accountId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "sockets" ALTER COLUMN "accountId" SET DATA TYPE TEXT,
ALTER COLUMN "guestId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "table_requests" DROP CONSTRAINT "table_requests_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "guestId" SET DATA TYPE TEXT,
ALTER COLUMN "handlerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "table_requests_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "table_requests_id_seq";

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dish_snapshots" ADD CONSTRAINT "dish_snapshots_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_dishSnapshotId_fkey" FOREIGN KEY ("dishSnapshotId") REFERENCES "dish_snapshots"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderHandlerId_fkey" FOREIGN KEY ("orderHandlerId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderBatchId_fkey" FOREIGN KEY ("orderBatchId") REFERENCES "order_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sockets" ADD CONSTRAINT "sockets_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sockets" ADD CONSTRAINT "sockets_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_batches" ADD CONSTRAINT "order_batches_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_batches" ADD CONSTRAINT "order_batches_cloneFromBatchId_fkey" FOREIGN KEY ("cloneFromBatchId") REFERENCES "order_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status_logs" ADD CONSTRAINT "order_status_logs_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status_logs" ADD CONSTRAINT "order_status_logs_changedByAccountId_fkey" FOREIGN KEY ("changedByAccountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_requests" ADD CONSTRAINT "table_requests_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_requests" ADD CONSTRAINT "table_requests_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
