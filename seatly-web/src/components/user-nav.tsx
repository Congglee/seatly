"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useAppStore } from "@/providers/app-provider";
import { useGetMeQuery } from "@/queries/use-account";
import { useLogoutMutation } from "@/queries/use-auth";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserNav() {
  const router = useRouter();

  const { data } = useGetMeQuery();
  const account = data?.payload.data;

  const logoutMutation = useLogoutMutation();

  const setRole = useAppStore((state) => state.setRole);
  const disconnectSocket = useAppStore((state) => state.disconnectSocket);

  const logout = async () => {
    if (logoutMutation.isPending) return;

    try {
      await logoutMutation.mutateAsync();
      setRole(undefined);
      disconnectSocket();
      router.push("/");
    } catch (error: any) {
      handleErrorApi({ error });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-9 hover:opacity-75 transition">
          <AvatarImage src={account?.avatar ?? undefined} alt={account?.name} />
          <AvatarFallback className="font-medium flex items-center justify-center">
            {account?.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-56"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px]">
            <AvatarImage
              src={account?.avatar ?? undefined}
              alt={account?.name}
            />
            <AvatarFallback className="text-xl font-medium flex items-center justify-center">
              {account?.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-foreground">
              {account?.name}
            </p>
            <p className="text-xs text-muted-foreground/90 dark:text-muted-foreground/80">
              {account?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="h-9 px-4 font-medium cursor-pointer"
            asChild
          >
            <Link href="/manage/dashboard">Tổng quan</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="h-9 px-4 font-medium cursor-pointer"
            asChild
          >
            <Link href="/manage/settings">Cài đặt</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="h-9 px-4 font-medium cursor-pointer"
          onClick={logout}
        >
          <LogOut className="size-4 mr-2" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
