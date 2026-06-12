import Link from "next/link";
import { ClipboardList, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrdersEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16 px-4 text-center">
      <div className="flex items-center justify-center size-16 rounded-2xl bg-muted/60 border border-border/60">
        <ClipboardList
          className="size-7 text-muted-foreground/60"
          strokeWidth={1.5}
        />
      </div>
      <div className="space-y-1.5 max-w-[260px]">
        <h3 className="text-base font-semibold text-foreground">
          Chưa có đơn nào
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Bạn chưa đặt món nào. Hãy xem thực đơn và thêm món để bắt đầu.
        </p>
      </div>
      <Button
        asChild
        variant="outline"
        className="rounded-xl px-5 h-10 text-sm font-medium border-border/60 active:scale-[0.98] transition-transform duration-100"
      >
        <Link href="/guest/menu">
          Xem thực đơn
          <ArrowRight className="size-3.5" />
        </Link>
      </Button>
    </div>
  );
}
