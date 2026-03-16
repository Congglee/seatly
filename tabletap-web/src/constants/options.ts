import { DishStatus, OrderStatus, Role, TableStatus } from "@/constants/type";
import {
  Ban,
  CircleCheck,
  CircleDot,
  CircleX,
  Clock10,
  Loader2,
  LucideIcon,
  BadgeCheck,
  SendHorizontal,
  Users,
} from "lucide-react";

export type Option<T = string> = {
  label: string;
  value: T;
  icon?: LucideIcon;
};

export const tableStatusOptions: Option[] = [
  {
    label: "Available",
    value: TableStatus.Available,
    icon: CircleCheck,
  },
  {
    label: "Hidden",
    value: TableStatus.Hidden,
    icon: CircleX,
  },
  {
    label: "Reserved",
    value: TableStatus.Reserved,
    icon: CircleDot,
  },
];

export const dishStatusOptions: Option[] = [
  {
    label: "Available",
    value: DishStatus.Available,
    icon: CircleCheck,
  },
  {
    label: "Unavailable",
    value: DishStatus.Unavailable,
    icon: CircleDot,
  },
  {
    label: "Hidden",
    value: DishStatus.Hidden,
    icon: CircleX,
  },
];

export const orderStatusOptions: Option[] = [
  {
    label: "Pending",
    value: OrderStatus.Pending,
    icon: Clock10,
  },
  {
    label: "Processing",
    value: OrderStatus.Processing,
    icon: Loader2,
  },
  {
    label: "Rejected",
    value: OrderStatus.Rejected,
    icon: Ban,
  },
  {
    label: "Delivered",
    value: OrderStatus.Delivered,
    icon: SendHorizontal,
  },
  {
    label: "Paid",
    value: OrderStatus.Paid,
    icon: BadgeCheck,
  },
];

export const accountRoleOptions: Option[] = [
  {
    label: "Owner",
    value: Role.Owner,
    icon: BadgeCheck,
  },
  {
    label: "Employee",
    value: Role.Employee,
    icon: Users,
  },
 ];
