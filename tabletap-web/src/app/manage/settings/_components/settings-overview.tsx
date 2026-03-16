import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, UserCircle2 } from "lucide-react";
import Link from "next/link";

const overviewCards = [
  {
    href: "/manage/settings/profile",
    title: "Profile settings",
    description:
      "Update your display name, avatar image, and view account information.",
    icon: UserCircle2,
  },
  {
    href: "/manage/settings/security",
    title: "Security settings",
    description:
      "Change your password to keep your backoffice session secure.",
    icon: ShieldCheck,
  },
];

export default function SettingsOverview() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Workspace preferences</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {overviewCards.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-border/60 bg-background p-5 transition-colors hover:bg-muted/30"
              >
                <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-base font-semibold leading-none">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-border/60 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl">Good to know</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
            Avatar images use the same upload pipeline as dish images and accept
            JPG, PNG, or WEBP files up to 4MB.
          </div>
          <div className="rounded-xl border border-border/60 bg-muted/20 p-4">
            Password updates immediately refresh your current session tokens to
            keep the dashboard signed in safely.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
