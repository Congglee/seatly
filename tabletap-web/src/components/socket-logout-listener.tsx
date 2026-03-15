import { useAppStore } from "@/providers/app-provider";
import { usePathname, useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useLogoutMutation } from "@/queries/use-auth";
import { useEffect } from "react";

const UNAUTHENTICATED_PATHS = ["/login", "/register", "/restore-session"];

export default function SocketLogoutListener() {
  const pathname = usePathname();
  const router = useRouter();

  const { isPending, mutateAsync } = useLogoutMutation();

  const setRole = useAppStore((state) => state.setRole);
  const disconnectSocket = useAppStore((state) => state.disconnectSocket);
  const socket = useAppStore((state) => state.socket);

  useEffect(() => {
    if (UNAUTHENTICATED_PATHS.includes(pathname)) {
      return;
    }

    async function onLogout() {
      if (isPending) return;

      try {
        await mutateAsync();

        setRole(undefined);
        disconnectSocket();
        router.push("/");
      } catch (error: any) {
        handleErrorApi({ error });
      }
    }

    socket?.on("logout", onLogout);

    return () => {
      socket?.off("logout", onLogout);
    };
  }, [
    socket,
    pathname,
    isPending,
    setRole,
    disconnectSocket,
    router,
    mutateAsync,
  ]);

  return null;
}
