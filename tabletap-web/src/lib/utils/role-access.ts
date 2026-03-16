import type { RoleType } from "@/types/jwt.type";

export const hasAllowedRole = (
  allowedRoles?: readonly RoleType[],
  role?: RoleType
) => {
  if (!allowedRoles?.length) {
    return true;
  }

  return role ? allowedRoles.includes(role) : false;
};
