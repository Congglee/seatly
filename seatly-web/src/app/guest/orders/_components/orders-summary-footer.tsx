import { Banknote, Receipt } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/currency";

interface OrdersSummaryFooterProps {
  unpaidTotal: number;
  unpaidCount: number;
  paidTotal: number;
  paidCount: number;
}

export default function OrdersSummaryFooter({
  unpaidTotal,
  unpaidCount,
  paidTotal,
  paidCount,
}: OrdersSummaryFooterProps) {
  const hasAnyOrders = unpaidCount > 0 || paidCount > 0;

  if (!hasAnyOrders) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-lg mx-auto px-4 py-3 space-y-2.5">
        {unpaidCount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Receipt className="size-4" strokeWidth={1.5} />
              <span>
                <span className="font-semibold text-foreground tabular-nums">
                  {unpaidCount}
                </span>{" "}
                món chưa thanh toán
              </span>
            </div>
            <span className="font-semibold text-foreground tabular-nums">
              {formatCurrency(unpaidTotal)}
            </span>
          </div>
        )}
        {unpaidCount > 0 && paidCount > 0 && (
          <Separator className="bg-border/60" />
        )}
        {paidCount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Banknote className="size-4" strokeWidth={1.5} />
              <span>
                <span className="font-medium text-muted-foreground tabular-nums">
                  {paidCount}
                </span>{" "}
                món đã thanh toán
              </span>
            </div>
            <span className="font-medium text-muted-foreground tabular-nums">
              {formatCurrency(paidTotal)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
