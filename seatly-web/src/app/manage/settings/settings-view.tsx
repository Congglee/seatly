"use client";

import AppearanceSection from "@/app/manage/settings/_components/appearance-section";
import ProfileSection from "@/app/manage/settings/_components/profile-section";
import SecuritySection from "@/app/manage/settings/_components/security-section";
import SettingsSkeleton from "@/app/manage/settings/_components/settings-skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Role } from "@/constants/type";
import { useGetMeQuery } from "@/queries/use-account";
import { KeyRound, Palette, UserCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const tabs: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "profile", label: "Profile", icon: UserCog },
  { value: "security", label: "Security", icon: KeyRound },
  { value: "appearance", label: "Appearance", icon: Palette },
];

const getInitials = (value?: string) => {
  if (!value) return "ST";

  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((item) => item.charAt(0).toUpperCase())
    .join("");
};

export default function SettingsView() {
  const { data, isLoading } = useGetMeQuery();
  const account = data?.payload.data;

  const isOwner = account?.role === Role.Owner;

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
        <Avatar className="size-16 rounded-xl border border-border/60">
          <AvatarImage
            src={account?.avatar ?? undefined}
            alt={account?.name ?? "User avatar"}
            className="object-cover"
          />
          <AvatarFallback className="rounded-xl bg-muted text-lg font-semibold">
            {getInitials(account?.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-lg font-semibold tracking-tight">
              {account?.name ?? "Your account"}
            </h2>
            {account?.role ? (
              <Badge variant={isOwner ? "default" : "secondary"}>
                {account.role}
              </Badge>
            ) : null}
          </div>
          <p className="truncate text-sm text-muted-foreground">
            {account?.email ?? "Manage your personal preferences and security"}
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1 sm:max-w-md">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="gap-2 py-2"
              >
                <Icon className="size-4" aria-hidden />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="profile" className="mt-0 focus-visible:ring-0">
          {isLoading ? <SettingsSkeleton /> : <ProfileSection />}
        </TabsContent>
        <TabsContent value="security" className="mt-0 focus-visible:ring-0">
          <SecuritySection />
        </TabsContent>
        <TabsContent value="appearance" className="mt-0 focus-visible:ring-0">
          <AppearanceSection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
