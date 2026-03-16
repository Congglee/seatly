"use client";

import { Role } from "@/constants/type";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useAppStore } from "@/providers/app-provider";
import { useLogoutMutation } from "@/queries/use-auth";
import { useGuestLogoutMutation } from "@/queries/use-guest";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useRoleAwareLogout = () => {
  const router = useRouter();

  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);
  const disconnectSocket = useAppStore((state) => state.disconnectSocket);

  const staffLogoutMutation = useLogoutMutation();
  const guestLogoutMutation = useGuestLogoutMutation();

  const isPending =
    staffLogoutMutation.isPending || guestLogoutMutation.isPending;

  const logout = useCallback(async () => {
    if (isPending) return;

    try {
      if (role === Role.Guest) {
        await guestLogoutMutation.mutateAsync();
      } else {
        await staffLogoutMutation.mutateAsync();
      }

      setRole(undefined);
      disconnectSocket();
      router.push("/");
    } catch (error: any) {
      handleErrorApi({ error });
    }
  }, [
    disconnectSocket,
    guestLogoutMutation,
    isPending,
    role,
    router,
    setRole,
    staffLogoutMutation,
  ]);

  return {
    isPending,
    logout,
    role,
  };
};
