import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderStatus } from "@/constants/type";
import { OrderStatusIcon, getOrderStatus } from "@/lib/utils/restaurant-status";
import { formatCurrency } from "@/lib/utils/currency";
import {
  formatDateTimeToLocaleString,
  formatDateTimeToTimeString,
} from "@/lib/utils/date";
import { cn } from "@/lib/utils";
import { handleErrorApi } from "@/lib/utils/api-error";
import { usePayForGuestMutation } from "@/queries/use-order";
import {
  GetOrdersResType,
  PayGuestOrdersResType,
} from "@/schemas/order.schema";
import { Loader2, User, Wallet } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";

type Guest = GetOrdersResType["data"]["items"][number]["guest"];
type Orders = GetOrdersResType["data"]["items"][number];

const statusColorMap: Record<string, string> = {
  [OrderStatus.Pending]: "text-amber-500",
  [OrderStatus.Processing]: "text-sky-500",
  [OrderStatus.Rejected]: "text-red-500",
  [OrderStatus.Delivered]: "text-emerald-500",
  [OrderStatus.Paid]: "text-violet-500",
};

interface OrderGuestDetailProps {
  guest: Guest;
  orders: Orders[];
  onPaySuccess?: (data: PayGuestOrdersResType) => void;
}

export default function OrderGuestDetail({
  guest,
  orders,
  onPaySuccess,
}: OrderGuestDetailProps) {
  const ordersFilterToPurchase = guest
    ? orders.filter(
        (order) =>
          order.status !== OrderStatus.Paid &&
          order.status !== OrderStatus.Rejected
      )
    : [];
  const purchasedOrderFilter = guest
    ? orders.filter((order) => order.status === OrderStatus.Paid)
    : [];

  const unpaidTotal = ordersFilterToPurchase.reduce(
    (acc, order) => acc + order.quantity * order.dishSnapshot.price,
    0
  );
  const paidTotal = purchasedOrderFilter.reduce(
    (acc, order) => acc + order.quantity * order.dishSnapshot.price,
    0
  );

  const payForGuestMutation = usePayForGuestMutation();

  const payGuestOrders = async () => {
    if (payForGuestMutation.isPending || !guest) return;

    try {
      const result = await payForGuestMutation.mutateAsync({
        guestId: guest.id,
      });
      onPaySuccess && onPaySuccess(result.payload);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <div className="flex flex-col">
      {guest && (
        <Fragment>
          <div className="px-4 py-3.5">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Chưa thanh toán
                </span>
                <Badge
                  variant="outline"
                  className="gap-1.5 tabular-nums text-xs font-semibold"
                >
                  <Wallet className="size-3" />
                  {formatCurrency(unpaidTotal)}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Đã thanh toán
                </span>
                <Badge className="gap-1.5 tabular-nums text-xs font-semibold">
                  {formatCurrency(paidTotal)}
                </Badge>
              </div>
            </div>
            <Button
              className="mt-3.5 w-full gap-2"
              size="sm"
              disabled={
                ordersFilterToPurchase.length === 0 ||
                payForGuestMutation.isPending
              }
              onClick={payGuestOrders}
            >
              {payForGuestMutation.isPending && (
                <Loader2 className="size-3.5 animate-spin" />
              )}
              Xác nhận đã thanh toán ({ordersFilterToPurchase.length} đơn)
            </Button>
          </div>
          <Separator />
          <div className="flex min-h-[4.25rem] items-center gap-3 px-4 py-4">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="size-4" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
              <div className="flex items-baseline gap-1.5">
                <p className="truncate text-sm font-semibold leading-snug">
                  {guest.name}
                </p>
                <span className="shrink-0 text-[11px] text-muted-foreground">
                  #{guest.id.slice(0, 8)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {guest.tableNumber !== null && (
                  <Fragment>
                    <span>Bàn {guest.tableNumber}</span>
                    <span className="text-border">|</span>
                  </Fragment>
                )}
                <span>{formatDateTimeToLocaleString(guest.createdAt)}</span>
              </div>
            </div>
          </div>
          <Separator />
          <div className="px-4 py-3.5">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Đơn hàng ({orders.length})
            </p>
            <div className="space-y-px">
              {orders.map((order, index) => {
                const StatusIcon =
                  OrderStatusIcon[order.status as keyof typeof OrderStatusIcon];
                const statusColor = statusColorMap[order.status] ?? "";

                return (
                  <div
                    key={order.id}
                    className="group -mx-1 flex items-center gap-2.5 rounded-md px-1.5 py-2 transition-colors hover:bg-muted/50"
                  >
                    <span className="w-5 shrink-0 text-right text-[11px] tabular-nums text-muted-foreground">
                      {index + 1}
                    </span>
                    <span
                      title={getOrderStatus(order.status)}
                      className={cn("shrink-0", statusColor)}
                    >
                      {StatusIcon && <StatusIcon className="size-4" />}
                    </span>
                    <Image
                      src={order.dishSnapshot.image}
                      alt={order.dishSnapshot.name}
                      title={order.dishSnapshot.name}
                      width={28}
                      height={28}
                      className="size-7 shrink-0 rounded object-cover"
                    />
                    <span
                      className="min-w-0 flex-1 truncate text-xs leading-snug"
                      title={order.dishSnapshot.name}
                    >
                      {order.dishSnapshot.name}
                    </span>
                    <span className="shrink-0 text-xs font-semibold tabular-nums">
                      x{order.quantity}
                    </span>
                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {formatCurrency(
                        order.quantity * order.dishSnapshot.price
                      )}
                    </span>
                    <span
                      className="hidden shrink-0 text-[11px] tabular-nums text-muted-foreground sm:inline"
                      title={`Tạo lúc: ${formatDateTimeToLocaleString(
                        order.createdAt
                      )} | Cập nhật: ${formatDateTimeToLocaleString(
                        order.updatedAt
                      )}`}
                    >
                      {formatDateTimeToTimeString(order.createdAt)}
                    </span>
                  </div>
                );
              })}
              {orders.length === 0 && (
                <p className="py-4 text-center text-xs text-muted-foreground">
                  Chưa có đơn nào
                </p>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
