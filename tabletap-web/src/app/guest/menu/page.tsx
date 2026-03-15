import { UtensilsCrossed } from "lucide-react";
import Logo from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import GuestMenuView from "@/app/guest/menu/guest-menu-view";

export default function GuestMenuPage() {
  return (
    <main className="min-h-[100dvh] flex flex-col bg-background">
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/60">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Logo
            wrapperClassName="pointer-events-none select-none"
            logoClassName="size-5"
            textClassName="text-base"
          />
          <div className="relative">
            <Badge
              variant="outline"
              className="gap-1.5 px-2.5 py-1 text-xs font-medium border-border/60 text-muted-foreground"
            >
              <UtensilsCrossed className="size-3" strokeWidth={2} />
              Guest
            </Badge>
          </div>
        </div>
      </header>
      <div className="max-w-lg mx-auto w-full px-4 pt-5 pb-2 space-y-4">
        <div className="space-y-1">
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Our menu
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Browse dishes and add them to your order.
          </p>
        </div>
      </div>
      <GuestMenuView />
    </main>
  );
}
