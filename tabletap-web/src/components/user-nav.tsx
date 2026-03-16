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
import { Role } from "@/constants/type";
import { useRoleAwareLogout } from "@/hooks/use-role-aware-logout";
import { useAppStore } from "@/providers/app-provider";
import { useGetMeQuery } from "@/queries/use-account";
import {
  KeyRound,
  LayoutGrid,
  LogOut,
  Settings2,
  UserCircle2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const getInitials = (name?: string) =>
  name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((item) => item.charAt(0).toUpperCase())
    .join("") || "NA";

export default function UserNav() {
  const router = useRouter();

  const meQuery = useGetMeQuery();
  const account = meQuery.data?.payload.data;

  const role = useAppStore((state) => state.role);
  const { logout } = useRoleAwareLogout();

  const fallbackName = account?.name ?? "Staff Account";
  const fallbackEmail = account?.email ?? (meQuery.isError ? "Unavailable" : "Loading...");
  const fallbackAvatar = account?.avatar ?? undefined;
  const initials = getInitials(account?.name);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-9 transition hover:opacity-75">
          <AvatarImage src={fallbackAvatar} />
          <AvatarFallback className="flex items-center justify-center font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-64"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4 text-center">
          <Avatar className="size-[52px]">
            <AvatarImage src={fallbackAvatar} />
            <AvatarFallback className="flex items-center justify-center text-xl font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-semibold text-foreground">{fallbackName}</p>
            <p className="text-xs text-muted-foreground/90">{fallbackEmail}</p>
            {account?.role && (
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {account.role}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator className="bg-border" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="h-9 cursor-pointer px-4 font-medium"
            onClick={() => router.push("/manage/dashboard")}
          >
            <LayoutGrid className="mr-2 size-4" />
            Dashboard
          </DropdownMenuItem>
          {(account?.role ?? role) === Role.Owner && (
            <DropdownMenuItem
              className="h-9 cursor-pointer px-4 font-medium"
              onClick={() => router.push("/manage/accounts")}
            >
              <Users className="mr-2 size-4" />
              Accounts
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="h-9 cursor-pointer px-4 font-medium"
            onClick={() => router.push("/manage/settings")}
          >
            <Settings2 className="mr-2 size-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            className="h-9 cursor-pointer px-4 font-medium"
            onClick={() => router.push("/manage/settings/profile")}
          >
            <UserCircle2 className="mr-2 size-4" />
            My profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="h-9 cursor-pointer px-4 font-medium"
            onClick={() => router.push("/manage/settings/security")}
          >
            <KeyRound className="mr-2 size-4" />
            Change password
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="h-9 cursor-pointer px-4 font-medium"
          onClick={logout}
        >
          <LogOut className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
