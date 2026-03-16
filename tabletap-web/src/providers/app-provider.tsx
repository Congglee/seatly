"use client";

import { type RoleType } from "@/types/jwt.type";
import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from "@/lib/utils/token-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useEffect, useRef } from "react";
import { decodeToken } from "@/lib/jwt-decode";
import TokenRefreshManager from "@/components/token-refresh-manager";
import { type Socket } from "socket.io-client";
import { generateSocketInstace } from "@/lib/utils/socket";
import SocketLogoutListener from "@/components/socket-logout-listener";

type AppStoreType = {
  isAuth: boolean;
  role: RoleType | undefined;
  setRole: (role?: RoleType | undefined) => void;
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  socket: Socket | undefined;
  setSocket: (socket?: Socket | undefined) => void;
  disconnectSocket: () => void;
};

const getInitialRole = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const accessToken = getAccessTokenFromLocalStorage();

  if (!accessToken) {
    return undefined;
  }

  try {
    return decodeToken(accessToken).role;
  } catch {
    removeTokensFromLocalStorage();
    return undefined;
  }
};

const initialRole = getInitialRole();

export const useAppStore = create<AppStoreType>()(
  persist(
    (set) => ({
      isAuth: Boolean(initialRole),
      role: initialRole,
      setRole: (role?: RoleType | undefined) => {
        set({ role, isAuth: Boolean(role) });

        if (!role) {
          removeTokensFromLocalStorage();
        }
      },
      hydrated: false,
      setHydrated: (hydrated) => set({ hydrated }),
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () =>
        set((state) => ({
          sidebarOpen: !state.sidebarOpen,
        })),
      socket: undefined as Socket | undefined,
      setSocket: (socket?: Socket | undefined) => set({ socket }),
      disconnectSocket: () =>
        set((state) => {
          state.socket?.disconnect();
          return { socket: undefined };
        }),
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrated = useAppStore((state) => state.hydrated);
  const setRole = useAppStore((state) => state.setRole);
  const setSocket = useAppStore((state) => state.setSocket);

  const count = useRef(0);

  useEffect(() => {
    if (count.current === 0) {
      count.current++;

      try {
        const accessToken = getAccessTokenFromLocalStorage();

        if (accessToken) {
          setSocket(generateSocketInstace(accessToken));
        }
      } catch {
        setRole(undefined);
      }
    }
  }, [setRole, setSocket]);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      {children}
      <TokenRefreshManager />
      <SocketLogoutListener />
    </>
  );
}
