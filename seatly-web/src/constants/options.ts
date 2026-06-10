import { DishStatus, OrderStatus, Role, TableStatus } from "@/constants/type";
import {
  BadgeCheck,
  Ban,
  CircleCheck,
  CircleDot,
  CircleX,
  Clock10,
  Loader2,
  LucideIcon,
  Monitor,
  MoonStar,
  SendHorizontal,
  Sun,
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

export interface ThemeOption {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
  preview: "light" | "dark" | "system";
}

export const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    description: "Bright and clean for daytime.",
    icon: Sun,
    preview: "light",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Easy on the eyes in low light.",
    icon: MoonStar,
    preview: "dark",
  },
  {
    value: "system",
    label: "System",
    description: "Match your device settings.",
    icon: Monitor,
    preview: "system",
  },
];
