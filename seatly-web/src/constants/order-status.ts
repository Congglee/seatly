import { CheckCircle2, Clock, CreditCard, Flame, XCircle } from "lucide-react";
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
    label: "In progress",
    statuses: [OrderStatus.Pending, OrderStatus.Processing],
  },
  completed: {
    label: "Delivered",
    statuses: [OrderStatus.Delivered],
  },
  settled: {
    label: "Settled",
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
    label: "Pending",
    icon: Clock,
    className:
      "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40",
  },
  [OrderStatus.Processing]: {
    label: "Processing",
    icon: Flame,
    className:
      "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40",
  },
  [OrderStatus.Rejected]: {
    label: "Rejected",
    icon: XCircle,
    className:
      "bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40",
  },
  [OrderStatus.Delivered]: {
    label: "Delivered",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
  },
  [OrderStatus.Paid]: {
    label: "Paid",
    icon: CreditCard,
    className:
      "bg-violet-50 text-violet-700 border-violet-200/60 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/40",
  },
};
