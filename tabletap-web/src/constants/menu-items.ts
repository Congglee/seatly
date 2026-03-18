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
        label: "Dashboard",
        icon: LayoutGrid,
        submenus: [],
      },
    ],
  },
  {
    label: "Operations management",
    menus: [
      {
        href: "/manage/orders",
        label: "Orders",
        icon: ShoppingCart,
        submenus: [
          {
            href: "/manage/orders",
            label: "All orders",
          },
          {
            href: "/manage/orders/pending",
            label: "Pending orders",
          },
          {
            href: "/manage/orders/cooking",
            label: "Cooking orders",
          },
        ],
      },
      {
        href: "/manage/tables",
        label: "Tables",
        icon: Square,
        submenus: [],
      },
    ],
  },
  {
    label: "Category management",
    menus: [
      {
        href: "/manage/dishes",
        label: "Dishes",
        icon: UtensilsCrossed,
        submenus: [],
      },
    ],
  },
  {
    label: "System management",
    menus: [
      {
        href: "/manage/accounts",
        label: "Accounts",
        icon: Users,
        submenus: [],
      },
      {
        href: "/manage/reports",
        label: "Reports & Statistics",
        icon: BarChart3,
        submenus: [
          {
            href: "/manage/reports/revenue",
            label: "Revenue",
          },
          {
            href: "/manage/reports/dishes",
            label: "Dishes statistics",
          },
          {
            href: "/manage/reports/tables",
            label: "Table performance",
          },
        ],
      },
      {
        href: "/manage/settings",
        label: "Settings",
        icon: Settings,
        submenus: [],
      },
    ],
  },
];
