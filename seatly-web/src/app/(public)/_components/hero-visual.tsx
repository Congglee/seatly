import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ConciergeBell,
  CookingPot,
  Minus,
  Plus,
  QrCode,
  ShoppingBag,
} from "lucide-react";

const MOCK_MENU_ITEMS = [
  { name: "Trà sữa trân châu", price: "35.000đ", qty: 2 },
  { name: "Bánh mì thịt nướng", price: "28.000đ", qty: 1 },
] as const;

const MOCK_ORDERS = [
  { table: "Bàn 3", guest: "Anh Nam", status: "Chờ xử lý", tone: "pending" },
  {
    table: "Bàn 7",
    guest: "Chị Lan",
    status: "Đang chế biến",
    tone: "processing",
  },
  { table: "Bàn 1", guest: "Khách 2", status: "Đã giao", tone: "delivered" },
] as const;

const STATUS_STYLES = {
  pending: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
  processing: "bg-primary/15 text-foreground",
  delivered: "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300",
} as const;

export default function HeroVisual() {
  return (
    <div
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
      aria-hidden="true"
    >
      <div className="relative flex items-center justify-center gap-4 lg:justify-end lg:pr-4">
        <div className="absolute left-1/2 top-1/2 z-0 hidden size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-border bg-card shadow-md lg:flex">
          <QrCode className="size-8 text-primary" />
        </div>

        <Card className="relative z-10 w-[min(100%,17rem)] overflow-hidden rounded-[1.75rem] border-2 border-border shadow-lg">
          <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2">
            <span className="text-[10px] font-medium text-muted-foreground">
              Bàn 5 · Guest menu
            </span>
            <Badge variant="outline" className="text-[10px]">
              3 món
            </Badge>
          </div>
          <div className="space-y-3 bg-background p-3">
            {MOCK_MENU_ITEMS.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between gap-2 rounded-lg border border-border bg-card p-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.price}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex size-6 items-center justify-center rounded-md border border-border bg-muted/50">
                    <Minus className="size-3" />
                  </span>
                  <span className="w-4 text-center text-xs font-medium">
                    {item.qty}
                  </span>
                  <span className="flex size-6 items-center justify-center rounded-md border border-border bg-primary/10">
                    <Plus className="size-3 text-primary" />
                  </span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-lg bg-primary px-3 py-2.5 text-primary-foreground">
              <span className="flex items-center gap-1.5 text-xs font-medium">
                <ShoppingBag className="size-3.5" />
                Gửi order
              </span>
              <span className="text-xs font-semibold">98.000đ</span>
            </div>
          </div>
        </Card>

        <Card className="relative z-10 hidden w-[min(100%,19rem)] overflow-hidden rounded-xl border border-border shadow-md sm:block">
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
            <ConciergeBell className="size-4 text-primary" />
            <span className="text-xs font-semibold">Hàng đợi order</span>
            <Badge className="ml-auto text-[10px]">3 mới</Badge>
          </div>
          <div className="divide-y divide-border bg-background">
            {MOCK_ORDERS.map((order) => (
              <div
                key={`${order.table}-${order.guest}`}
                className="flex items-center justify-between gap-2 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium">
                    {order.table} · {order.guest}
                  </p>
                  <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <CookingPot className="size-3" />2 món
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    STATUS_STYLES[order.tone]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
