import { DishStatus, OrderStatus, TableStatus } from "@/constants/type";
import { BookX, CookingPot, HandCoins, Loader, Truck } from "lucide-react";

export const getVietnameseDishStatus = (
  status: (typeof DishStatus)[keyof typeof DishStatus]
) => {
  switch (status) {
    case DishStatus.Available:
      return "Available";
    case DishStatus.Unavailable:
      return "Unavailable";
    default:
      return "Hidden";
  }
};

export const getVietnameseOrderStatus = (
  status: (typeof OrderStatus)[keyof typeof OrderStatus]
) => {
  switch (status) {
    case OrderStatus.Delivered:
      return "Delivered";
    case OrderStatus.Paid:
      return "Paid";
    case OrderStatus.Pending:
      return "Pending";
    case OrderStatus.Processing:
      return "Processing";
    default:
      return "Rejected";
  }
};

export const getVietnameseTableStatus = (
  status: (typeof TableStatus)[keyof typeof TableStatus]
) => {
  switch (status) {
    case TableStatus.Available:
      return "Available";
    case TableStatus.Reserved:
      return "Reserved";
    default:
      return "Hidden";
  }
};

export const OrderStatusIcon = {
  [OrderStatus.Pending]: Loader,
  [OrderStatus.Processing]: CookingPot,
  [OrderStatus.Rejected]: BookX,
  [OrderStatus.Delivered]: Truck,
  [OrderStatus.Paid]: HandCoins,
};
