import { Role } from "@/constants/type";
import { hasAllowedRole } from "@/lib/utils/role-access";
import type { RoleType } from "@/types/jwt.type";

export type PublicNavItem = {
  label: string;
  href: string;
  roles?: RoleType[];
  hideWhenAuthenticated?: boolean;
};

export const publicNavItems: PublicNavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Menu",
    href: "/#dishes",
  },
  {
    label: "Guest menu",
    href: "/guest/menu",
    roles: [Role.Guest],
  },
  {
    label: "Orders",
    href: "/guest/orders",
    roles: [Role.Guest],
  },
  {
    label: "Dashboard",
    href: "/manage/dashboard",
    roles: [Role.Owner, Role.Employee],
  },
  {
    label: "Sign in",
    href: "/login",
    hideWhenAuthenticated: true,
  },
];

export const getVisiblePublicNavItems = (role?: RoleType) => {
  return publicNavItems.filter((item) => {
    if (item.roles?.length) {
      return hasAllowedRole(item.roles, role);
    }

    if (item.hideWhenAuthenticated) {
      return !role;
    }

    return true;
  });
};
