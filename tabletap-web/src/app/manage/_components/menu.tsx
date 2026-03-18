"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { menuItems } from "@/constants/menu-items";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import CollapseMenuButton from "@/app/manage/_components/collapse-menu-button";
import { useLogoutMutation } from "@/queries/use-auth";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useAppStore } from "@/providers/app-provider";

interface MenuProps {
  sidebarOpen: boolean;
}

export default function Menu({ sidebarOpen }: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const setRole = useAppStore((state) => state.setRole);
  const disconnectSocket = useAppStore((state) => state.disconnectSocket);

  const logoutMutation = useLogoutMutation();

  const checkMenuActiveLink = (href: string) => {
    if (href === "") {
      return false;
    }

    if (href === "/manage") {
      return pathname === href;
    }

    return pathname.includes(href);
  };

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
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScrollArea className="flex-1 w-full [&>div>div[style]]:block!">
        <nav className="md:mt-6 w-full pb-2">
          <ul className="flex flex-col items-start space-y-1 px-2">
            {menuItems.map(({ label, menus }, index) => (
              <li className={cn("w-full", label && "pt-5")} key={index}>
                {(sidebarOpen && label) || sidebarOpen === undefined ? (
                  <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                    {label}
                  </p>
                ) : !sidebarOpen && sidebarOpen !== undefined && label ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="w-full flex justify-center items-center">
                          <Ellipsis className="h-5 w-5" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <p className="pb-2" />
                )}
                {menus.map(({ href, label, icon: Icon, submenus }, index) => {
                  const active = checkMenuActiveLink(href);

                  return submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className="w-full justify-start h-10 mb-1 [&_svg]:size-[18px] gap-0"
                              asChild
                            >
                              <Link href={href as any}>
                                <span
                                  className={cn(
                                    sidebarOpen === false ? "" : "mr-4"
                                  )}
                                >
                                  <Icon />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    sidebarOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {sidebarOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        submenus={submenus}
                        sidebarOpen={sidebarOpen}
                      />
                    </div>
                  );
                })}
              </li>
            ))}
          </ul>
        </nav>
      </ScrollArea>

      <div className="w-full sticky bottom-0 z-20 bg-background px-2 py-4 mt-auto">
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-center h-10"
                onClick={logout}
              >
                <span className={cn(sidebarOpen === false ? "" : "mr-4")}>
                  <LogOut size={18} />
                </span>
                <p
                  className={cn(
                    "whitespace-nowrap",
                    sidebarOpen === false ? "opacity-0 hidden" : "opacity-100"
                  )}
                >
                  Logout
                </p>
              </Button>
            </TooltipTrigger>
            {sidebarOpen === false && (
              <TooltipContent side="right">
                <button onClick={logout}>Logout</button>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
