import { Badge } from "@/components/ui/badge";
import TableStatusBadge from "@/components/table-status-badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OrderStatus, OrderStatusValues } from "@/constants/type";
import { OrderStatusIcon, getOrderStatus } from "@/lib/utils/restaurant-status";
import { cn } from "@/lib/utils";
import { TableListResType } from "@/schemas/table.schema";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";
import { Fragment, useState } from "react";
import OrderGuestDetail from "@/app/manage/orders/_components/order-guest-detail";
import OrderTableOverviewSkeleton from "@/app/manage/orders/_components/order-table-overview-skeleton";
import {
  ServingGuestByTableNumber,
  Statics,
  StatusCountObject,
} from "@/app/manage/orders/hooks/use-order-table-data";

const orderStatusBadgeConfig: Record<string, { dotClassName: string }> = {
  [OrderStatus.Pending]: { dotClassName: "bg-amber-500" },
  [OrderStatus.Processing]: { dotClassName: "bg-sky-500" },
  [OrderStatus.Delivered]: { dotClassName: "bg-emerald-500" },
  [OrderStatus.Paid]: { dotClassName: "bg-violet-500" },
  [OrderStatus.Rejected]: { dotClassName: "bg-red-500" },
};

interface OrderStaticsProps {
  statics: Statics;
  tableList: TableListResType["data"]["items"];
  servingGuestByTableNumber: ServingGuestByTableNumber;
  isTableOverviewLoading?: boolean;
}

export default function OrderStatics({
  statics,
  tableList,
  servingGuestByTableNumber,
  isTableOverviewLoading = false,
}: OrderStaticsProps) {
  const [selectedTableNumber, setSelectedTableNumber] = useState<number>(0);
  const selectedServingGuest = servingGuestByTableNumber[selectedTableNumber];
  const selectedGuestEntries = Object.entries(
    selectedServingGuest ?? {}
  ).filter(([, orders]) => Boolean(orders[0]?.guest));

  return (
    <Fragment>
      <Dialog
        open={Boolean(selectedTableNumber)}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTableNumber(0);
          }
        }}
      >
        <DialogContent className="max-h-[85vh] p-0 sm:max-w-lg">
          {selectedServingGuest && (
            <DialogHeader className="px-5 pt-5 pb-0">
              <DialogTitle>Khách tại bàn {selectedTableNumber}</DialogTitle>
            </DialogHeader>
          )}
          <ScrollArea className="max-h-[calc(85vh-5rem)]">
            <div className="px-5 pb-5">
              {selectedGuestEntries.map(([guestId, orders], index) => {
                const guest = orders[0]?.guest;

                if (!guest) {
                  return null;
                }

                return (
                  <div key={guestId}>
                    {index > 0 && <Separator className="my-4" />}
                    <OrderGuestDetail
                      guest={guest}
                      orders={orders}
                      onPaySuccess={() => setSelectedTableNumber(0)}
                    />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <div className="space-y-5 py-2">
        <section aria-busy={isTableOverviewLoading}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tổng quan bàn
          </p>
          {isTableOverviewLoading ? (
            <OrderTableOverviewSkeleton />
          ) : (
            <div className="flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-stretch">
              {tableList.map((table) => {
                const tableNumber: number = table.number;
                const tableStatics:
                  | Record<string, StatusCountObject>
                  | undefined = statics.table[tableNumber];

                let countObject: StatusCountObject = {
                  Pending: 0,
                  Processing: 0,
                  Delivered: 0,
                  Paid: 0,
                  Rejected: 0,
                };

                const servingGuestCount = Object.values(
                  servingGuestByTableNumber[tableNumber] ?? {}
                ).length;

                if (tableStatics) {
                  for (const guestId in tableStatics) {
                    const guestStatics = tableStatics[guestId];

                    countObject = {
                      Pending:
                        countObject.Pending + (guestStatics.Pending ?? 0),
                      Processing:
                        countObject.Processing + (guestStatics.Processing ?? 0),
                      Delivered:
                        countObject.Delivered + (guestStatics.Delivered ?? 0),
                      Paid: countObject.Paid + (guestStatics.Paid ?? 0),
                      Rejected:
                        countObject.Rejected + (guestStatics.Rejected ?? 0),
                    };
                  }
                }

                const activeOrderCount =
                  countObject.Pending +
                  countObject.Processing +
                  countObject.Delivered;
                const hasActiveOrders = activeOrderCount > 0;
                const canOpenGuestDetail =
                  hasActiveOrders && servingGuestCount > 0;

                return (
                  <div
                    key={tableNumber}
                    className={cn(
                      "grid w-full grid-cols-[2.5rem_1px_1fr] items-center gap-x-3 rounded-lg border border-transparent bg-secondary px-3 py-2.5 text-sm transition-colors xs:w-auto",
                      canOpenGuestDetail &&
                        "cursor-pointer hover:bg-secondary/80 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    )}
                    onClick={() => {
                      if (canOpenGuestDetail)
                        setSelectedTableNumber(tableNumber);
                    }}
                    role={canOpenGuestDetail ? "button" : undefined}
                    tabIndex={canOpenGuestDetail ? 0 : undefined}
                    onKeyDown={(event) => {
                      if (
                        canOpenGuestDetail &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        setSelectedTableNumber(tableNumber);
                      }
                    }}
                  >
                    <div className="flex flex-col items-center justify-center gap-1.5">
                      <span className="text-base font-semibold tabular-nums leading-none">
                        {tableNumber}
                      </span>
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Users className="size-3" />
                              <span className="tabular-nums">
                                {servingGuestCount}
                              </span>
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            Đang phục vụ: {servingGuestCount} khách
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Separator
                      orientation="vertical"
                      className="h-full min-h-[2.75rem] bg-muted-foreground/30"
                    />
                    {!hasActiveOrders && (
                      <div className="flex min-w-0 items-center justify-start">
                        <TableStatusBadge status={table.status} />
                      </div>
                    )}
                    {hasActiveOrders && (
                      <TooltipProvider delayDuration={200}>
                        <div className="flex min-w-0 flex-row flex-wrap items-center gap-x-4 gap-y-1.5 xs:flex-col xs:items-start xs:gap-1.5">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="flex items-center gap-1.5 text-xs">
                                <OrderStatusIcon.Pending className="size-3.5" />
                                <span className="tabular-nums">
                                  {countObject[OrderStatus.Pending] ?? 0}
                                </span>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              {getOrderStatus(OrderStatus.Pending)}:{" "}
                              {countObject[OrderStatus.Pending] ?? 0} đơn
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="flex items-center gap-1.5 text-xs">
                                <OrderStatusIcon.Processing className="size-3.5" />
                                <span className="tabular-nums">
                                  {countObject[OrderStatus.Processing] ?? 0}
                                </span>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              {getOrderStatus(OrderStatus.Processing)}:{" "}
                              {countObject[OrderStatus.Processing] ?? 0} đơn
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="flex items-center gap-1.5 text-xs">
                                <OrderStatusIcon.Delivered className="size-3.5" />
                                <span className="tabular-nums">
                                  {countObject[OrderStatus.Delivered] ?? 0}
                                </span>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              {getOrderStatus(OrderStatus.Delivered)}:{" "}
                              {countObject[OrderStatus.Delivered] ?? 0} đơn
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <section>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tổng hợp trạng thái
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {OrderStatusValues.map((status) => {
              const config = orderStatusBadgeConfig[status];
              return (
                <Badge
                  variant="secondary"
                  key={status}
                  className="gap-1.5 tabular-nums"
                >
                  <span
                    className={cn(
                      "inline-block size-1.5 rounded-full",
                      config?.dotClassName
                    )}
                  />
                  {getOrderStatus(status)}: {statics.status[status] ?? 0}
                </Badge>
              );
            })}
          </div>
        </section>
      </div>
    </Fragment>
  );
}
