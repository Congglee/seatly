import { Clock, Flame, XCircle, CheckCircle2, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/constants/type";

type OrderStatusValue = (typeof OrderStatus)[keyof typeof OrderStatus];

interface OrderStatusBadgeProps {
  status: OrderStatusValue;
  className?: string;
}

const STATUS_CONFIG: Record<
  OrderStatusValue,
  {
    label: string;
    icon: React.ElementType;
    className: string;
  }
> = {
  [OrderStatus.Pending]: {
    label: "Pending",
    icon: Clock,
    className:
      "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40",
  },
  [OrderStatus.Processing]: {
    label: "Processing",
    icon: Flame,
    className:
      "bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/40",
  },
  [OrderStatus.Rejected]: {
    label: "Rejected",
    icon: XCircle,
    className:
      "bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/40 dark:text-red-400 dark:border-red-800/40",
  },
  [OrderStatus.Delivered]: {
    label: "Delivered",
    icon: CheckCircle2,
    className:
      "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
  },
  [OrderStatus.Paid]: {
    label: "Paid",
    icon: CreditCard,
    className:
      "bg-violet-50 text-violet-700 border-violet-200/60 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/40",
  },
};

export default function OrderStatusBadge({
  status,
  className,
}: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
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
