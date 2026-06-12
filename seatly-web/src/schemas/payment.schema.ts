import {
  PaymentMethod,
  PaymentMethodValues,
  PaymentProviderValues,
  PaymentStatusValues,
  PaymentTransactionStatusValues,
} from "@/constants/type";
import { OrderSchema } from "@/schemas/order.schema";
import { z } from "zod";

export const PaymentSchema = z.object({
  id: z.string(),
  code: z.string(),
  guestId: z.string(),
  tableNumber: z.number().nullable(),
  amount: z.number(),
  status: z.enum(PaymentStatusValues),
  method: z.enum(PaymentMethodValues),
  provider: z.enum(PaymentProviderValues).nullable(),
  qrUrl: z.string().nullable(),
  expiresAt: z.date().nullable(),
  paidAt: z.date().nullable(),
  confirmedByAccountId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type PaymentSchemaType = z.TypeOf<typeof PaymentSchema>;

export const PaymentTransactionSchema = z.object({
  id: z.string(),
  provider: z.enum(PaymentProviderValues),
  providerTransactionId: z.string(),
  paymentId: z.string().nullable(),
  status: z.enum(PaymentTransactionStatusValues),
  gateway: z.string(),
  transactionDate: z.date(),
  accountNumber: z.string().nullable(),
  subAccount: z.string().nullable(),
  amountIn: z.number(),
  amountOut: z.number(),
  accumulated: z.number().nullable(),
  code: z.string().nullable(),
  transactionContent: z.string().nullable(),
  referenceNumber: z.string().nullable(),
  body: z.string().nullable(),
  rawPayload: z.unknown(),
  createdAt: z.date(),
});

export type PaymentTransactionSchemaType = z.TypeOf<
  typeof PaymentTransactionSchema
>;

export const CreateGuestQrPaymentRes = z.object({
  message: z.string(),
  data: z.object({
    paymentId: z.string(),
    code: z.string(),
    amount: z.number(),
    qrUrl: z.string(),
    expiresAt: z.date(),
    bankAccount: z.string(),
    bankCode: z.string(),
    unpaidOrderCount: z.number(),
    hasProcessingOrders: z.boolean(),
  }),
});

export type CreateGuestQrPaymentResType = z.TypeOf<
  typeof CreateGuestQrPaymentRes
>;

export const SepayWebhookBody = z.object({
  id: z.number(),
  gateway: z.string(),
  transactionDate: z.string(),
  accountNumber: z.string().nullable(),
  code: z.string().nullable(),
  content: z.string().nullable(),
  transferType: z.enum(["in", "out"]),
  transferAmount: z.number(),
  accumulated: z.number().nullable(),
  subAccount: z.string().nullable(),
  referenceCode: z.string().nullable(),
  description: z.string(),
});

export type SepayWebhookBodyType = z.TypeOf<typeof SepayWebhookBody>;

export const SepayWebhookRes = z.object({
  success: z.literal(true),
});

export type SepayWebhookResType = z.TypeOf<typeof SepayWebhookRes>;

export const ManualPaymentBody = z.object({
  guestId: z.string(),
  method: z
    .enum([PaymentMethod.Cash, PaymentMethod.ManualBankTransfer])
    .default(PaymentMethod.ManualBankTransfer),
});

export type ManualPaymentBodyType = z.TypeOf<typeof ManualPaymentBody>;

export const ManualPaymentRes = z.object({
  message: z.string(),
  data: z.array(OrderSchema),
});

export type ManualPaymentResType = z.TypeOf<typeof ManualPaymentRes>;
