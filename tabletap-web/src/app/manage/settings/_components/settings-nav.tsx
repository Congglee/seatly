"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  LockKeyhole,
  Settings2,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsLinks = [
  {
    href: "/manage/settings",
    label: "Overview",
    description: "Quick links and account center overview",
    icon: Settings2,
  },
  {
    href: "/manage/settings/profile",
    label: "Profile",
    description: "Update your avatar and personal information",
    icon: UserCircle2,
  },
  {
    href: "/manage/settings/security",
    label: "Security",
    description: "Change your password and review access safety",
    icon: LockKeyhole,
  },
];

const isLinkActive = (pathname: string, href: string) => {
  if (href === "/manage/settings") {
    return pathname === href;
  }

  return pathname.startsWith(href);
};

export default function SettingsNav() {
  const pathname = usePathname();

  return (
    <Card className="h-fit border-border/60 shadow-sm lg:sticky lg:top-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Settings Center</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {settingsLinks.map((link) => {
          const active = isLinkActive(pathname, link.href);
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors",
                active
                  ? "border-primary/30 bg-primary/5"
                  : "border-border/60 bg-background hover:bg-muted/40"
              )}
            >
              <div
                className={cn(
                  "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-medium leading-none">{link.label}</p>
                  <ArrowRight
                    className={cn(
                      "size-4 shrink-0 transition-transform",
                      active ? "translate-x-0.5 text-primary" : "text-muted-foreground"
                    )}
                  />
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {link.description}
                </p>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
