import paymentApiRequest from "@/apis/payment.api";
import { useMutation } from "@tanstack/react-query";

export const useCreateGuestQrPaymentMutation = () => {
  return useMutation({
    mutationFn: paymentApiRequest.createGuestQrPayment,
  });
};
