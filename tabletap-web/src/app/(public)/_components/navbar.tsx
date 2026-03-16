"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/logo";
import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getVisiblePublicNavItems,
  publicNavItems,
} from "@/constants/public-nav-items";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/providers/app-provider";
import { useRoleAwareLogout } from "@/hooks/use-role-aware-logout";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const role = useAppStore((state) => state.role);
  const { logout, isPending } = useRoleAwareLogout();

  const navLinks = getVisiblePublicNavItems(role).filter(
    (item) => item.href !== "/login"
  );
  const loginItem = publicNavItems.find((item) => item.href === "/login");

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-background/90 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground",
                "transition-colors duration-200 hover:bg-muted/60 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <ModeToggle />
          {!role && loginItem ? (
            <Button
              asChild
              size="sm"
              className="rounded-lg transition-transform duration-100 active:scale-[0.98]"
            >
              <Link href={loginItem.href}>{loginItem.label}</Link>
            </Button>
          ) : null}
          {role ? (
            <Button
              size="sm"
              variant="outline"
              className="rounded-lg transition-transform duration-100 active:scale-[0.98]"
              onClick={handleLogout}
              disabled={isPending}
            >
              Logout
            </Button>
          ) : null}
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <Menu className="size-5" strokeWidth={1.5} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>
                  <Logo textClassName="text-lg" logoClassName="size-6" />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground",
                      "transition-colors duration-200 hover:bg-muted/60 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="px-3">
                {!role && loginItem ? (
                  <Button
                    asChild
                    className="w-full rounded-lg transition-transform duration-100 active:scale-[0.98]"
                  >
                    <Link href={loginItem.href} onClick={() => setIsOpen(false)}>
                      {loginItem.label}
                    </Link>
                  </Button>
                ) : null}
                {role ? (
                  <Button
                    variant="outline"
                    className="w-full rounded-lg transition-transform duration-100 active:scale-[0.98]"
                    onClick={handleLogout}
                    disabled={isPending}
                  >
                    Logout
                  </Button>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
