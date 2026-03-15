"use client";

import { usePathname, useRouter } from "next/navigation";
import { refreshTokensIfNeeded } from "@/lib/utils/auth-client";
import { useEffect } from "react";
import { useAppStore } from "@/providers/app-provider";

// Pages that should not check the refresh token
const UNAUTHENTICATED_PATHS = ["/login", "/refresh-token"];

// This component handles the case where the access token expires while using the website
// It prevents that situation by creating a setInterval to continuously check the token and refresh it before it expires

export default function TokenRefreshManager() {
  const pathname = usePathname();
  const router = useRouter();

  const socket = useAppStore((state) => state.socket);
  const disconnectSocket = useAppStore((state) => state.disconnectSocket);

  useEffect(() => {
    // Pages that do not need to check the refresh token
    if (UNAUTHENTICATED_PATHS.includes(pathname)) {
      return;
    }

    let interval: any = null;

    // The interval timeout must be shorter than the access token expiration time
    // Example: if the access token expires in 10 seconds, check once every second

    // It must be called once immediately because the interval only runs after the timeout, so it will not run right away the first time
    const onRefreshToken = (force?: boolean) =>
      refreshTokensIfNeeded({
        onError: () => {
          clearInterval(interval);
          disconnectSocket();
          router.push("/login");
        },
        force,
      });

    // Call it immediately the first time to get the latest access token and refresh token
    onRefreshToken();

    const TIMEOUT = 1000;

    // Start checking the token every TIMEOUT interval
    interval = setInterval(onRefreshToken, TIMEOUT);

    if (socket?.connected) {
      onConnect();
    }

    function onConnect() {
      console.log(socket?.id);
    }

    function onDisconnect() {
      console.log("disconnect");
    }

    function onRefreshTokenSocket() {
      onRefreshToken(true);
    }

    socket?.on("connect", onConnect);
    socket?.on("disconnect", onDisconnect);
    socket?.on("refresh-token", onRefreshTokenSocket);

    return () => {
      clearInterval(interval);
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
      socket?.off("refresh-token", onRefreshTokenSocket);
    };
  }, [pathname, router, socket, disconnectSocket]);

  return null;
}
