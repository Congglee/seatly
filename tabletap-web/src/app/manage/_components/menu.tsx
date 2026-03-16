"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { getVisibleMenuGroups } from "@/constants/menu-items";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
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
import { useAppStore } from "@/providers/app-provider";
import { useRoleAwareLogout } from "@/hooks/use-role-aware-logout";

interface MenuProps {
  sidebarOpen: boolean;
}

export default function Menu({ sidebarOpen }: MenuProps) {
  const pathname = usePathname();
  const role = useAppStore((state) => state.role);
  const { logout, isPending } = useRoleAwareLogout();

  const visibleMenuGroups = getVisibleMenuGroups(role);

  const checkMenuActiveLink = (href: string) => {
    if (href === "") {
      return false;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <ScrollArea className="flex-1 w-full [&>div>div[style]]:block!">
        <nav className="md:mt-6 w-full pb-2">
          <ul className="flex flex-col items-start space-y-1 px-2">
            {visibleMenuGroups.map(({ label, menus }, index) => (
              <li className={cn("w-full", label && "pt-5")} key={index}>
                {(sidebarOpen && label) || sidebarOpen === undefined ? (
                  <p className="max-w-[248px] truncate px-4 pb-2 text-sm font-medium text-muted-foreground">
                    {label}
                  </p>
                ) : !sidebarOpen && sidebarOpen !== undefined && label ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className="w-full">
                        <div className="flex w-full items-center justify-center">
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
                              className="mb-1 h-10 w-full justify-start gap-0 [&_svg]:size-[18px]"
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
                          {sidebarOpen === false ? (
                            <TooltipContent side="right">{label}</TooltipContent>
                          ) : null}
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

      {role ? (
        <div className="sticky bottom-0 z-20 mt-auto w-full bg-background px-2 py-4">
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="h-10 w-full justify-center"
                  onClick={logout}
                  disabled={isPending}
                >
                  <span className={cn(sidebarOpen === false ? "" : "mr-4")}>
                    <LogOut size={18} />
                  </span>
                  <p
                    className={cn(
                      "whitespace-nowrap",
                      sidebarOpen === false ? "hidden opacity-0" : "opacity-100"
                    )}
                  >
                    Logout
                  </p>
                </Button>
              </TooltipTrigger>
              {sidebarOpen === false ? (
                <TooltipContent side="right">Logout</TooltipContent>
              ) : null}
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : null}
    </div>
  );
}
