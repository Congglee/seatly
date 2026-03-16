import Image from "next/image";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";
import { OrderStatus } from "@/constants/type";
import { type GuestGetOrdersResType } from "@/schemas/guest.schema";
import OrderStatusBadge from "@/app/guest/orders/_components/order-status-badge";

interface OrderItemCardProps {
  order: GuestGetOrdersResType["data"][number];
}

const formatRelativeTime = (date: Date | string) => {
  const targetDate = date instanceof Date ? date : new Date(date);

  const now = new Date();
  const diffMs = now.getTime() - targetDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  return targetDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export default function OrderItemCard({ order }: OrderItemCardProps) {
  const isPaid = order.status === OrderStatus.Paid;
  const isRejected = order.status === OrderStatus.Rejected;
  const lineTotal = order.dishSnapshot.price * order.quantity;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-border bg-card p-3 transition-colors duration-150",
        (isPaid || isRejected) && "opacity-60"
      )}
    >
      <div className="relative shrink-0 size-20 sm:size-24 rounded-lg overflow-hidden bg-muted">
        <Image
          src={order.dishSnapshot.image}
          alt={order.dishSnapshot.name}
          fill
          sizes="(max-width: 640px) 80px, 96px"
          className={cn("object-cover", isRejected && "grayscale")}
        />
        {order.quantity > 1 && (
          <div className="absolute top-1 left-1 flex items-center justify-center size-5 rounded-md bg-foreground/80 text-background text-[10px] font-bold tabular-nums">
            {order.quantity}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between min-w-0 gap-2">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={cn(
                "text-sm font-semibold text-foreground leading-snug line-clamp-1",
                isRejected && "line-through text-muted-foreground"
              )}
            >
              {order.dishSnapshot.name}
            </h3>
          </div>
          <OrderStatusBadge status={order.status} />
        </div>
        <div className="flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span
              className={cn(
                "text-sm font-semibold tabular-nums",
                isPaid
                  ? "text-muted-foreground"
                  : isRejected
                  ? "text-muted-foreground line-through"
                  : "text-primary"
              )}
            >
              {formatCurrency(lineTotal)}
            </span>
            {order.quantity > 1 && (
              <span className="text-[10px] text-muted-foreground tabular-nums">
                ({order.quantity} x {formatCurrency(order.dishSnapshot.price)})
              </span>
            )}
          </div>
          <span className="text-[10px] text-muted-foreground/70 whitespace-nowrap tabular-nums">
            {formatRelativeTime(order.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
