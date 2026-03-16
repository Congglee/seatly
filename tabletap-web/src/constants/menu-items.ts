import {
  LayoutGrid,
  type LucideIcon,
  Settings,
  ShoppingCart,
  Square,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { Role } from "@/constants/type";
import { hasAllowedRole } from "@/lib/utils/role-access";
import type { RoleType } from "@/types/jwt.type";

export type MenuGroup = {
  label: string;
  menus: {
    href: string;
    label: string;
    icon: LucideIcon;
    submenus: Submenu[];
    roles: RoleType[];
  }[];
};

export type Submenu = {
  href: string;
  label: string;
  roles?: RoleType[];
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
        roles: [Role.Owner, Role.Employee],
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
            roles: [Role.Owner, Role.Employee],
          },
          {
            href: "/manage/orders/pending",
            label: "Pending orders",
            roles: [Role.Owner, Role.Employee],
          },
          {
            href: "/manage/orders/cooking",
            label: "Cooking orders",
            roles: [Role.Owner, Role.Employee],
          },
        ],
        roles: [Role.Owner, Role.Employee],
      },
      {
        href: "/manage/tables",
        label: "Tables",
        icon: Square,
        submenus: [],
        roles: [Role.Owner, Role.Employee],
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
        roles: [Role.Owner, Role.Employee],
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
        roles: [Role.Owner],
      },
      {
        href: "/manage/settings",
        label: "Settings",
        icon: Settings,
        submenus: [],
        roles: [Role.Owner, Role.Employee],
      },
    ],
  },
];

export const getVisibleMenuGroups = (role?: RoleType) => {
  return menuItems
    .map((group) => ({
      ...group,
      menus: group.menus
        .filter((menu) => hasAllowedRole(menu.roles, role))
        .map((menu) => ({
          ...menu,
          submenus: menu.submenus.filter((submenu) =>
            hasAllowedRole(submenu.roles, role)
          ),
        })),
    }))
    .filter((group) => group.menus.length > 0);
};
