-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "role" TEXT NOT NULL,
    "ownerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dishes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isOutOfStock" BOOLEAN NOT NULL DEFAULT false,
    "stockUpdatedAt" TIMESTAMP(3),
    "estimatedPrepMinutes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "dishes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_snapshots" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dishId" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dish_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_tables" (
    "number" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isOccupied" BOOLEAN NOT NULL DEFAULT false,
    "occupiedAt" TIMESTAMP(3),
    "lastActivityAt" TIMESTAMP(3),

    CONSTRAINT "restaurant_tables_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "guests" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tableNumber" INTEGER,
    "refreshToken" TEXT,
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sessionStatus" TEXT NOT NULL DEFAULT 'Active',
    "lastActivityAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),

    CONSTRAINT "guests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "guestId" INTEGER,
    "tableNumber" INTEGER,
    "dishSnapshotId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderHandlerId" INTEGER,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderBatchId" INTEGER,
    "estimatedReadyAt" TIMESTAMP(3),

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "token" TEXT NOT NULL,
    "accountId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "sockets" (
    "socketId" TEXT NOT NULL,
    "accountId" INTEGER,
    "guestId" INTEGER,

    CONSTRAINT "sockets_pkey" PRIMARY KEY ("socketId")
);

-- CreateTable
CREATE TABLE "order_batches" (
    "id" SERIAL NOT NULL,
    "guestId" INTEGER NOT NULL,
    "tableNumber" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Open',
    "submittedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "cloneFromBatchId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_status_logs" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "fromStatus" TEXT,
    "toStatus" TEXT NOT NULL,
    "changedByAccountId" INTEGER,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "order_status_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table_requests" (
    "id" SERIAL NOT NULL,
    "guestId" INTEGER NOT NULL,
    "tableNumber" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'CallStaff',
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "note" TEXT,
    "handlerId" INTEGER,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "table_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_tables_token_key" ON "restaurant_tables"("token");

-- CreateIndex
CREATE UNIQUE INDEX "orders_dishSnapshotId_key" ON "orders"("dishSnapshotId");

-- CreateIndex
CREATE UNIQUE INDEX "sockets_accountId_key" ON "sockets"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "sockets_guestId_key" ON "sockets"("guestId");

-- CreateIndex
CREATE UNIQUE INDEX "order_batches_code_key" ON "order_batches"("code");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "dish_snapshots" ADD CONSTRAINT "dish_snapshots_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dishes"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "guests" ADD CONSTRAINT "guests_tableNumber_fkey" FOREIGN KEY ("tableNumber") REFERENCES "restaurant_tables"("number") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_tableNumber_fkey" FOREIGN KEY ("tableNumber") REFERENCES "restaurant_tables"("number") ON DELETE SET NULL ON UPDATE NO ACTION;

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
ALTER TABLE "order_batches" ADD CONSTRAINT "order_batches_tableNumber_fkey" FOREIGN KEY ("tableNumber") REFERENCES "restaurant_tables"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_batches" ADD CONSTRAINT "order_batches_cloneFromBatchId_fkey" FOREIGN KEY ("cloneFromBatchId") REFERENCES "order_batches"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status_logs" ADD CONSTRAINT "order_status_logs_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_status_logs" ADD CONSTRAINT "order_status_logs_changedByAccountId_fkey" FOREIGN KEY ("changedByAccountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_requests" ADD CONSTRAINT "table_requests_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_requests" ADD CONSTRAINT "table_requests_tableNumber_fkey" FOREIGN KEY ("tableNumber") REFERENCES "restaurant_tables"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table_requests" ADD CONSTRAINT "table_requests_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
