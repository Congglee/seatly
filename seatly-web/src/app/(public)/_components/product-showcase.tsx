import SectionHeading from "@/app/(public)/_components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LANDING_SHOWCASE_ITEMS } from "@/constants/landing-content";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const MOCK_SCREEN_CONTENT: Record<
  (typeof LANDING_SHOWCASE_ITEMS)[number]["id"],
  ReactNode
> = {
  menu: (
    <div className="space-y-2 p-3">
      {["Cà phê sữa đá", "Trà đào cam sả", "Bánh flan"].map((name, i) => (
        <div
          key={name}
          className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2"
        >
          <span className="text-xs font-medium">{name}</span>
          <span className="text-[10px] text-muted-foreground">
            {(29 + i * 6).toLocaleString("vi-VN")}đ
          </span>
        </div>
      ))}
    </div>
  ),
  orders: (
    <div className="space-y-2 p-3">
      {[
        { label: "Chờ xử lý", tone: "bg-amber-500/15 text-amber-800" },
        { label: "Đang chế biến", tone: "bg-primary/15 text-foreground" },
        { label: "Đã giao", tone: "bg-emerald-500/15 text-emerald-800" },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2"
        >
          <span className="text-xs">Trà sữa ×2</span>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium",
              item.tone
            )}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  ),
  manage: (
    <div className="divide-y divide-border">
      {[
        { table: "Bàn 2", items: "3 món", status: "Mới" },
        { table: "Bàn 8", items: "1 món", status: "Chế biến" },
      ].map((row) => (
        <div
          key={row.table}
          className="flex items-center justify-between px-3 py-2.5 text-xs"
        >
          <span className="font-medium">
            {row.table} · {row.items}
          </span>
          <Badge variant="secondary" className="text-[10px]">
            {row.status}
          </Badge>
        </div>
      ))}
    </div>
  ),
  dashboard: (
    <div className="grid grid-cols-2 gap-2 p-3">
      {[
        { label: "Doanh thu", value: "4,2tr" },
        { label: "Order", value: "86" },
        { label: "Khách", value: "42" },
        { label: "Bàn active", value: "9" },
      ].map((stat) => (
        <div
          key={stat.label}
          className="rounded-md border border-border bg-background p-2.5"
        >
          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
          <p className="text-sm font-semibold">{stat.value}</p>
        </div>
      ))}
    </div>
  ),
};

export default function ProductShowcase() {
  return (
    <section
      aria-labelledby="showcase-heading"
      className="border-b border-border/60 bg-muted/20 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="showcase-heading"
          eyebrow="Giao diện sản phẩm"
          title="Thiết kế thực dụng cho cả khách và đội ngũ quán"
          description="Giao diện minh họa bám sát luồng Guest mobile-first và Manage dashboard vận hành."
        />

        <ul className="grid gap-6 sm:grid-cols-2">
          {LANDING_SHOWCASE_ITEMS.map((item) => (
            <li key={item.id}>
              <Card className="overflow-hidden">
                <div className="border-b border-border bg-muted/40 px-4 py-2">
                  <Badge variant="outline" className="text-[10px]">
                    {item.badge}
                  </Badge>
                </div>
                <div className="border-b border-border bg-card">
                  {MOCK_SCREEN_CONTENT[item.id]}
                </div>
                <CardContent className="space-y-2 p-5">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
