import Logo from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed } from "lucide-react";

interface GuestLayoutProps {
  children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
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
              Khách
            </Badge>
          </div>
        </div>
      </header>

      {children}
    </main>
  );
}
