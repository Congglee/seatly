import { Badge } from "@/components/ui/badge";
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
import {
  ServingGuestByTableNumber,
  Statics,
  StatusCountObject,
} from "@/app/manage/orders/hooks/use-order-table-data";

const createEmptyStatusCount = (): StatusCountObject => ({
  Pending: 0,
  Processing: 0,
  Delivered: 0,
  Paid: 0,
  Rejected: 0,
});

const hasActiveOrders = (countObject: StatusCountObject) =>
  [countObject.Pending, countObject.Processing, countObject.Delivered].some(
    (status) => status > 0
  );

const statusBadgeConfig: Record<string, { dotClassName: string }> = {
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
}

export default function OrderStatics({
  statics,
  tableList,
  servingGuestByTableNumber,
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
              <DialogTitle>Guests at table {selectedTableNumber}</DialogTitle>
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
        <section>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Table overview
          </p>
          <div className="flex flex-wrap items-stretch gap-3">
            {tableList.map((table) => {
              const tableNumber: number = table.number;
              const tableStatics:
                | Record<string, StatusCountObject>
                | undefined = statics.table[tableNumber];

              let isEmptyTable = true;
              let countObject: StatusCountObject = createEmptyStatusCount();

              const servingGuestCount = Object.values(
                servingGuestByTableNumber[tableNumber] ?? {}
              ).length;

              if (tableStatics) {
                for (const guestId in tableStatics) {
                  const guestStatics = tableStatics[guestId];

                  if (hasActiveOrders(guestStatics)) {
                    isEmptyTable = false;
                  }

                  countObject = {
                    Pending: countObject.Pending + (guestStatics.Pending ?? 0),
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

              return (
                <div
                  key={tableNumber}
                  className={cn(
                    "flex items-stretch gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors",
                    {
                      "cursor-pointer bg-secondary border-transparent hover:bg-secondary/80 active:scale-[0.98]":
                        !isEmptyTable,
                      "border-border/60": isEmptyTable,
                    }
                  )}
                  onClick={() => {
                    if (!isEmptyTable) setSelectedTableNumber(tableNumber);
                  }}
                  role={!isEmptyTable ? "button" : undefined}
                  tabIndex={!isEmptyTable ? 0 : undefined}
                  onKeyDown={(event) => {
                    if (
                      !isEmptyTable &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      setSelectedTableNumber(tableNumber);
                    }
                  }}
                >
                  <div className="flex flex-col items-center justify-center gap-1.5 min-w-[2.5rem]">
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
                          Serving: {servingGuestCount} guests
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Separator
                    orientation="vertical"
                    className={cn("h-auto self-stretch", {
                      "bg-muted-foreground/30": !isEmptyTable,
                    })}
                  />
                  {isEmptyTable && (
                    <div className="flex items-center px-1">
                      <span className="text-xs text-muted-foreground">
                        Ready
                      </span>
                    </div>
                  )}
                  {!isEmptyTable && (
                    <TooltipProvider delayDuration={200}>
                      <div className="flex flex-col justify-center gap-1.5">
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
                            {countObject[OrderStatus.Pending] ?? 0} orders
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
                            {countObject[OrderStatus.Processing] ?? 0} orders
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
                            {countObject[OrderStatus.Delivered] ?? 0} orders
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>
                  )}
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Status summary
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {OrderStatusValues.map((status) => {
              const config = statusBadgeConfig[status];
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
