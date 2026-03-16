"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderStatus } from "@/constants/type";
import { cn } from "@/lib/utils";
import { getOrderStatus } from "@/lib/utils/restaurant-status";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useGuestGetOrderListQuery } from "@/queries/use-guest";
import { useAppStore } from "@/providers/app-provider";
import type {
  GetOrdersResType,
  PayGuestOrdersResType,
  UpdateOrderResType,
} from "@/schemas/order.schema";
import OrderItemCard from "@/app/guest/orders/_components/order-item-card";
import OrdersEmptyState from "@/app/guest/orders/_components/orders-empty-state";
import OrdersSkeleton from "@/app/guest/orders/_components/orders-skeleton";
import OrdersSummaryFooter from "@/app/guest/orders/_components/orders-summary-footer";

type OrderStatusValue = (typeof OrderStatus)[keyof typeof OrderStatus];

const STATUS_GROUPS = {
  active: {
    label: "In progress",
    statuses: [
      OrderStatus.Pending,
      OrderStatus.Processing,
    ] as OrderStatusValue[],
  },
  completed: {
    label: "Delivered",
    statuses: [OrderStatus.Delivered] as OrderStatusValue[],
  },
  settled: {
    label: "Settled",
    statuses: [OrderStatus.Paid, OrderStatus.Rejected] as OrderStatusValue[],
  },
} as const;

type StatusGroupKey = keyof typeof STATUS_GROUPS;
type GuestOrder = GetOrdersResType["data"]["items"][number];

const GROUP_ORDER: StatusGroupKey[] = ["active", "completed", "settled"];

const toTimestamp = (value: Date | string) => {
  return value instanceof Date ? value.getTime() : new Date(value).getTime();
};

export default function OrdersView() {
  const guestOrderListQuery = useGuestGetOrderListQuery();
  const { refetch } = guestOrderListQuery;
  const socket = useAppStore((state) => state.socket);

  useEffect(() => {
    if (!guestOrderListQuery.error) {
      return;
    }

    handleErrorApi({ error: guestOrderListQuery.error });
  }, [guestOrderListQuery.error]);

  const orders = useMemo(
    () => guestOrderListQuery.data?.payload.data ?? [],
    [guestOrderListQuery.data]
  );

  const groupedOrders = useMemo(() => {
    const groups: Record<StatusGroupKey, GuestOrder[]> = {
      active: [],
      completed: [],
      settled: [],
    };

    for (const order of orders) {
      for (const groupKey of GROUP_ORDER) {
        if (STATUS_GROUPS[groupKey].statuses.includes(order.status)) {
          groups[groupKey].push(order);
          break;
        }
      }
    }

    for (const groupKey of GROUP_ORDER) {
      groups[groupKey].sort(
        (a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt)
      );
    }

    return groups;
  }, [orders]);

  const totals = useMemo(() => {
    let unpaidTotal = 0;
    let unpaidCount = 0;
    let paidTotal = 0;
    let paidCount = 0;

    for (const order of orders) {
      const lineTotal = order.dishSnapshot.price * order.quantity;

      if (order.status === OrderStatus.Paid) {
        paidTotal += lineTotal;
        paidCount += 1;
      } else if (order.status !== OrderStatus.Rejected) {
        unpaidTotal += lineTotal;
        unpaidCount += 1;
      }
    }

    return { unpaidTotal, unpaidCount, paidTotal, paidCount };
  }, [orders]);

  const hasOrders = orders.length > 0;
  const hasFooter = totals.unpaidCount > 0 || totals.paidCount > 0;

  useEffect(() => {
    if (!socket) {
      return;
    }

    function onUpdateOrder(data: UpdateOrderResType["data"]) {
      const {
        dishSnapshot: { name },
        quantity,
      } = data;

      toast(
        `Dish ${name} (Qty: ${quantity}) has just been updated to status "${getOrderStatus(
          data.status
        )}"`
      );

      refetch();
    }

    function onPayment(data: PayGuestOrdersResType["data"]) {
      if (data.length === 0) {
        return;
      }

      const { guest } = data[0];

      toast(
        `${guest?.name ?? "Guest"} at table ${
          guest?.tableNumber ?? "-"
        } paid successfully ${data.length} orders`
      );

      refetch();
    }

    socket.on("update-order", onUpdateOrder);
    socket.on("payment", onPayment);

    return () => {
      socket.off("update-order", onUpdateOrder);
      socket.off("payment", onPayment);
    };
  }, [refetch, socket]);

  return (
    <>
      <div className="max-w-lg mx-auto w-full px-4 pt-5 pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                Your orders
              </h1>
              {!guestOrderListQuery.isPending && hasOrders && (
                <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Live
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Track the status of your dishes in real time.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="shrink-0 rounded-lg border-border/60 text-xs font-medium h-8 px-2.5 active:scale-[0.98] transition-transform duration-100"
          >
            <Link href="/guest/menu">
              <Plus className="size-3.5" strokeWidth={2} />
              Add
            </Link>
          </Button>
        </div>
      </div>
      <Separator className="bg-border/40 max-w-lg mx-auto w-full" />
      <div
        className={cn(
          "flex-1 max-w-lg mx-auto w-full px-4 py-3",
          hasFooter ? "pb-32" : "pb-8"
        )}
      >
        {guestOrderListQuery.isPending ? (
          <OrdersSkeleton />
        ) : !hasOrders ? (
          <OrdersEmptyState />
        ) : (
          <div className="space-y-5">
            {GROUP_ORDER.map((groupKey) => {
              const groupedOrderItems = groupedOrders[groupKey];

              if (groupedOrderItems.length === 0) {
                return null;
              }

              const group = STATUS_GROUPS[groupKey];

              return (
                <section key={groupKey} className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {group.label}
                    </h2>
                    <span className="text-[10px] font-medium text-muted-foreground/60 tabular-nums">
                      ({groupedOrderItems.length})
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {groupedOrderItems.map((order) => (
                      <OrderItemCard key={order.id} order={order} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
      {!guestOrderListQuery.isPending && (
        <OrdersSummaryFooter
          unpaidTotal={totals.unpaidTotal}
          unpaidCount={totals.unpaidCount}
          paidTotal={totals.paidTotal}
          paidCount={totals.paidCount}
        />
      )}
    </>
  );
}
