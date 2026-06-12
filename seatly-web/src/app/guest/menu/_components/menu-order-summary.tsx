"use client";

import { ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/currency";

interface MenuOrderSummaryProps {
  totalItems: number;
  totalPrice: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}

export default function MenuOrderSummary({
  totalItems,
  totalPrice,
  isSubmitting,
  onSubmit,
}: MenuOrderSummaryProps) {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-lg mx-auto px-4 py-3 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <ShoppingBag className="size-4" strokeWidth={1.5} />
            <span>
              <span className="font-semibold text-foreground tabular-nums">
                {totalItems}
              </span>{" "}
              món đã chọn
            </span>
          </div>
          <span className="font-semibold text-foreground tabular-nums">
            {formatCurrency(totalPrice)}
          </span>
        </div>
        <Separator className="bg-border/60" />
        <Button
          size="lg"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="w-full h-12 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] active:translate-y-[1px] transition-all duration-200 shadow-sm hover:shadow-md"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Đang đặt món...
            </>
          ) : (
            <>
              Đặt món
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
