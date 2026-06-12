import { LANDING_TRUST_ITEMS } from "@/constants/landing-content";
import {
  LayoutGrid,
  QrCode,
  Smartphone,
  Target,
  Wallet,
  Zap,
} from "lucide-react";

const TRUST_ICONS = [Zap, Smartphone, QrCode, Wallet, Target] as const;

export default function TrustBar() {
  return (
    <section aria-label="Điểm nổi bật nhanh" className="border-b border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {LANDING_TRUST_ITEMS.map((item, index) => {
            const Icon = TRUST_ICONS[index] ?? LayoutGrid;

            return (
              <li
                key={item.label}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-card px-4 py-3 shadow-sm"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  <Icon className="size-4 text-primary" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug text-foreground">
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
