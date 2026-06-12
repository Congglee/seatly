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
    label: "Còn trống",
    value: TableStatus.Available,
    icon: CircleCheck,
  },
  {
    label: "Đã ẩn",
    value: TableStatus.Hidden,
    icon: CircleX,
  },
  {
    label: "Đã đặt trước",
    value: TableStatus.Reserved,
    icon: CircleDot,
  },
];

export const dishStatusOptions: Option[] = [
  {
    label: "Có sẵn",
    value: DishStatus.Available,
    icon: CircleCheck,
  },
  {
    label: "Tạm hết",
    value: DishStatus.Unavailable,
    icon: CircleDot,
  },
  {
    label: "Đã ẩn",
    value: DishStatus.Hidden,
    icon: CircleX,
  },
];

export const accountRoleOptions: Option[] = [
  {
    label: "Chủ quán",
    value: Role.Owner,
    icon: BadgeCheck,
  },
  {
    label: "Nhân viên",
    value: Role.Employee,
    icon: Users,
  },
];

export const orderStatusOptions: Option[] = [
  {
    label: "Chờ xử lý",
    value: OrderStatus.Pending,
    icon: Clock10,
  },
  {
    label: "Đang chế biến",
    value: OrderStatus.Processing,
    icon: Loader2,
  },
  {
    label: "Đã từ chối",
    value: OrderStatus.Rejected,
    icon: Ban,
  },
  {
    label: "Đã giao",
    value: OrderStatus.Delivered,
    icon: SendHorizontal,
  },
  {
    label: "Đã thanh toán",
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
    label: "Sáng",
    description: "Giao diện sáng, gọn gàng cho ban ngày.",
    icon: Sun,
    preview: "light",
  },
  {
    value: "dark",
    label: "Tối",
    description: "Dịu mắt hơn trong môi trường thiếu sáng.",
    icon: MoonStar,
    preview: "dark",
  },
  {
    value: "system",
    label: "Theo hệ thống",
    description: "Tự động theo cài đặt của thiết bị.",
    icon: Monitor,
    preview: "system",
  },
];
