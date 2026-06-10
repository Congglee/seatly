import orderApiRequest from "@/apis/order.api";
import {
  GetOrdersQueryParamsType,
  PayGuestOrdersBodyType,
  UpdateOrderBodyType,
} from "@/schemas/order.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUpdateOrderMutation = () => {
  return useMutation({
    mutationFn: ({
      orderId,
      ...body
    }: UpdateOrderBodyType & { orderId: string }) =>
      orderApiRequest.updateOrder(orderId, body),
  });
};

export const useGetOrderListQuery = (params: GetOrdersQueryParamsType) => {
  return useQuery({
    queryFn: () => orderApiRequest.getOrderList(params),
    queryKey: ["orders", params],
  });
};

export const useGetOrderDetailQuery = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryFn: () => orderApiRequest.getOrderDetail(id),
    queryKey: ["orders", id],
    enabled,
  });
};

export const usePayForGuestMutation = () => {
  return useMutation({
    mutationFn: (body: PayGuestOrdersBodyType) =>
      orderApiRequest.payOrder(body),
  });
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: orderApiRequest.createOrders,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
