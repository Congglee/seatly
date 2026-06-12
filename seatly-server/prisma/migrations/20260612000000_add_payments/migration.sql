-- Add payments support without changing existing order records destructively.
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "guestId" TEXT NOT NULL,
    "tableNumber" INTEGER,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "method" TEXT NOT NULL,
    "provider" TEXT,
    "qrUrl" VARCHAR(1000),
    "expiresAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "confirmedByAccountId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "payment_transactions" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerTransactionId" TEXT NOT NULL,
    "paymentId" TEXT,
    "status" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "accountNumber" VARCHAR(100),
    "subAccount" VARCHAR(250),
    "amountIn" INTEGER NOT NULL DEFAULT 0,
    "amountOut" INTEGER NOT NULL DEFAULT 0,
    "accumulated" INTEGER,
    "code" VARCHAR(250),
    "transactionContent" TEXT,
    "referenceNumber" VARCHAR(255),
    "body" TEXT,
    "rawPayload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_transactions_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "orders" ADD COLUMN "paymentId" TEXT;

CREATE UNIQUE INDEX "payments_code_key" ON "payments"("code");
CREATE INDEX "payments_guestId_idx" ON "payments"("guestId");
CREATE INDEX "payments_status_idx" ON "payments"("status");
CREATE INDEX "payments_guestId_status_idx" ON "payments"("guestId", "status");
CREATE UNIQUE INDEX "payment_transactions_providerTransactionId_key" ON "payment_transactions"("providerTransactionId");
CREATE INDEX "payment_transactions_paymentId_idx" ON "payment_transactions"("paymentId");

ALTER TABLE "orders" ADD CONSTRAINT "orders_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "guests"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_tableNumber_fkey" FOREIGN KEY ("tableNumber") REFERENCES "restaurant_tables"("number") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "payments" ADD CONSTRAINT "payments_confirmedByAccountId_fkey" FOREIGN KEY ("confirmedByAccountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
ALTER TABLE "payment_transactions" ADD CONSTRAINT "payment_transactions_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
