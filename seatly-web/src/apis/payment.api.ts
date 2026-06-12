import http from "@/lib/http";
import type { CreateGuestQrPaymentResType } from "@/schemas/payment.schema";

const paymentApiRequest = {
  createGuestQrPayment: () =>
    http.post<CreateGuestQrPaymentResType>("/payments/guest/qr", {}),
};

export default paymentApiRequest;
