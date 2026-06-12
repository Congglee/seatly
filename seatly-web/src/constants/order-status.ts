import {
  BookX,
  CheckCircle2,
  Clock,
  CookingPot,
  CreditCard,
  Flame,
  HandCoins,
  Truck,
  XCircle,
} from "lucide-react";
import type { ElementType } from "react";
import { OrderStatus, type OrderStatusValue } from "@/constants/type";

export type GuestOrderStatusGroupKey = "active" | "completed" | "settled";

type GuestOrderStatusGroup = {
  label: string;
  statuses: readonly OrderStatusValue[];
};

type OrderStatusBadgeConfig = {
  label: string;
  icon: ElementType;
  className: string;
};

export const GUEST_ORDER_STATUS_GROUPS: Record<
  GuestOrderStatusGroupKey,
  GuestOrderStatusGroup
> = {
  active: {
    label: "Đang xử lý",
    statuses: [OrderStatus.Pending, OrderStatus.Processing],
  },
  completed: {
    label: "Đã giao",
    statuses: [OrderStatus.Delivered],
  },
  settled: {
    label: "Đã kết thúc",
    statuses: [OrderStatus.Paid, OrderStatus.Rejected],
  },
};

export const GUEST_ORDER_STATUS_GROUP_ORDER: GuestOrderStatusGroupKey[] = [
  "active",
  "completed",
  "settled",
];

export const ORDER_STATUS_BADGE_CONFIG: Record<
  OrderStatusValue,
  OrderStatusBadgeConfig
> = {
  [OrderStatus.Pending]: {
    label: "Chờ xử lý",
    icon: Clock,
    className:
      "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40",
  },
  [OrderStatus.Processing]: {
    label: "Đang chế biến",
    icon: Flame,
    className:
      "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40",
  },
  [OrderStatus.Rejected]: {
    label: "Đã từ chối",
    icon: XCircle,
    className:
      "bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40",
  },
  [OrderStatus.Delivered]: {
    label: "Đã giao",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
  },
  [OrderStatus.Paid]: {
    label: "Đã thanh toán",
    icon: CreditCard,
    className:
      "bg-violet-50 text-violet-700 border-violet-200/60 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/40",
  },
};

export const ORDER_STATUS_CONFIG: Record<
  string,
  {
    label: string;
    icon: typeof Clock;
    className: string;
    dotClassName: string;
  }
> = {
  [OrderStatus.Pending]: {
    label: "Chờ xử lý",
    icon: Clock,
    className:
      "bg-amber-500/15 text-amber-700 border-amber-500/25 dark:text-amber-400 dark:border-amber-400/20",
    dotClassName: "bg-amber-500",
  },
  [OrderStatus.Processing]: {
    label: "Đang chế biến",
    icon: CookingPot,
    className:
      "bg-sky-500/15 text-sky-700 border-sky-500/25 dark:text-sky-400 dark:border-sky-400/20",
    dotClassName: "bg-sky-500",
  },
  [OrderStatus.Delivered]: {
    label: "Đã giao",
    icon: Truck,
    className:
      "bg-emerald-500/15 text-emerald-700 border-emerald-500/25 dark:text-emerald-400 dark:border-emerald-400/20",
    dotClassName: "bg-emerald-500",
  },
  [OrderStatus.Paid]: {
    label: "Đã thanh toán",
    icon: HandCoins,
    className:
      "bg-violet-500/15 text-violet-700 border-violet-500/25 dark:text-violet-400 dark:border-violet-400/20",
    dotClassName: "bg-violet-500",
  },
  [OrderStatus.Rejected]: {
    label: "Đã từ chối",
    icon: BookX,
    className:
      "bg-red-500/15 text-red-700 border-red-500/25 dark:text-red-400 dark:border-red-400/20",
    dotClassName: "bg-red-500",
  },
};
