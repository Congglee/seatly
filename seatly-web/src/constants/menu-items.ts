import {
  LayoutGrid,
  type LucideIcon,
  Settings,
  ShoppingCart,
  Square,
  UtensilsCrossed,
  Users,
  BarChart3,
} from "lucide-react";

export type MenuGroup = {
  label: string;
  menus: {
    href: string;
    label: string;
    icon: LucideIcon;
    submenus: Submenu[];
  }[];
};

export type Submenu = {
  href: string;
  label: string;
};

export const menuItems: MenuGroup[] = [
  {
    label: "",
    menus: [
      {
        href: "/manage/dashboard",
        label: "Tổng quan",
        icon: LayoutGrid,
        submenus: [],
      },
    ],
  },
  {
    label: "Quản lý vận hành",
    menus: [
      {
        href: "/manage/orders",
        label: "Đơn hàng",
        icon: ShoppingCart,
        submenus: [
          {
            href: "/manage/orders",
            label: "Tất cả đơn hàng",
          },
          {
            href: "/manage/orders/pending",
            label: "Đơn chờ xử lý",
          },
          {
            href: "/manage/orders/cooking",
            label: "Đơn đang chế biến",
          },
        ],
      },
      {
        href: "/manage/tables",
        label: "Bàn",
        icon: Square,
        submenus: [],
      },
    ],
  },
  {
    label: "Quản lý thực đơn",
    menus: [
      {
        href: "/manage/dishes",
        label: "Món ăn",
        icon: UtensilsCrossed,
        submenus: [],
      },
    ],
  },
  {
    label: "Quản lý hệ thống",
    menus: [
      {
        href: "/manage/accounts",
        label: "Tài khoản",
        icon: Users,
        submenus: [],
      },
      {
        href: "/manage/reports",
        label: "Báo cáo & thống kê",
        icon: BarChart3,
        submenus: [
          {
            href: "/manage/reports/revenue",
            label: "Doanh thu",
          },
          {
            href: "/manage/reports/dishes",
            label: "Thống kê món ăn",
          },
          {
            href: "/manage/reports/tables",
            label: "Hiệu suất bàn",
          },
        ],
      },
      {
        href: "/manage/settings",
        label: "Cài đặt",
        icon: Settings,
        submenus: [],
      },
    ],
  },
];
