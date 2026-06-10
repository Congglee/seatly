import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_BADGE_CONFIG } from "@/constants/order-status";
import { cn } from "@/lib/utils";
import { type OrderStatusValue } from "@/constants/type";

interface OrderStatusBadgeProps {
  status: OrderStatusValue;
  className?: string;
}

export default function OrderStatusBadge({
  status,
  className,
}: OrderStatusBadgeProps) {
  const config = ORDER_STATUS_BADGE_CONFIG[status];
  const Icon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 px-2 py-0.5 text-[10px] font-semibold border",
        config.className,
        className
      )}
    >
      <Icon className="size-3" strokeWidth={2} />
      {config.label}
    </Badge>
  );
}
