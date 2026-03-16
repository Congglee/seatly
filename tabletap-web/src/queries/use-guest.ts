import guestApiRequest from "@/apis/guest.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGuestLoginMutation = () => {
  return useMutation({
    mutationFn: guestApiRequest.loginFromClient,
  });
};

export const useGuestLogoutMutation = () => {
  return useMutation({
    mutationFn: guestApiRequest.logoutFromClient,
  });
};

export const useGuestOrderDishMutation = () => {
  return useMutation({
    mutationFn: guestApiRequest.orderDish,
  });
};

export const useGuestGetOrderListQuery = () => {
  return useQuery({
    queryFn: guestApiRequest.getOrderList,
    queryKey: ["guest-orders"],
  });
};
