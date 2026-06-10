import { OrderTableContext } from "@/app/manage/orders/_components/order-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OrderStatusValues } from "@/constants/type";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";
import { formatDateTimeToLocaleString } from "@/lib/utils/date";
import { getOrderStatus } from "@/lib/utils/restaurant-status";
import { simpleMatchText } from "@/lib/utils/text";
import { type GetOrdersResType } from "@/schemas/order.schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, User } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";
import OrderActions from "@/app/manage/orders/_components/order-actions";
import OrderGuestDetail from "@/app/manage/orders/_components/order-guest-detail";
import { ORDER_STATUS_CONFIG } from "@/constants/order-status";

type OrderItem = GetOrdersResType["data"]["items"][number];

export const columns: ColumnDef<OrderItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tableNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3"
        >
          Table
          <ArrowUpDown className="ml-1.5 size-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const tableNumber = row.getValue("tableNumber") as number | null;
      return (
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-muted text-xs font-semibold tabular-nums">
            {tableNumber ?? "—"}
          </div>
        </div>
      );
    },
    filterFn: (row, columnId, filterValue: string) => {
      if (filterValue === undefined) return true;
      return simpleMatchText(
        String(row.getValue(columnId) ?? ""),
        String(filterValue)
      );
    },
  },
  {
    id: "guestName",
    header: "Guest Name",
    cell: function Cell({ row }) {
      const { orderObjectByGuestId } = useContext(OrderTableContext);
      const guest = row.original.guest;

      if (!guest) {
        return (
          <span className="text-xs italic text-muted-foreground">
            Guest removed
          </span>
        );
      }

      return (
        <Popover>
          <PopoverTrigger asChild>
            <button className="group flex items-center gap-2 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-muted">
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="size-3.5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium leading-tight group-hover:text-primary">
                  {guest.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  #{guest.id.slice(0, 8)}
                </p>
              </div>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[340px] p-0 sm:w-[460px]" align="start">
            <OrderGuestDetail
              guest={guest}
              orders={orderObjectByGuestId[guest.id] ?? []}
            />
          </PopoverContent>
        </Popover>
      );
    },
    filterFn: (row, columnId, filterValue: string) => {
      if (filterValue === undefined) return true;
      return simpleMatchText(
        `${row.original.guest?.name ?? "Guest removed"} ${String(
          row.original.tableNumber ?? ""
        )}`,
        String(filterValue)
      );
    },
  },
  {
    id: "dishName",
    header: "Dish",
    cell: ({ row }) => {
      const dish = row.original.dishSnapshot;
      const quantity = row.original.quantity;
      const totalPrice = dish.price * quantity;

      return (
        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative shrink-0 overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  width={48}
                  height={48}
                  className="size-12 rounded-lg object-cover transition-transform hover:scale-105"
                />
                <div className="absolute -bottom-px -right-px flex size-5 items-center justify-center rounded-tl-md bg-foreground text-[10px] font-bold text-background">
                  x{quantity}
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-3" align="start">
              <div className="flex gap-3">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  width={80}
                  height={80}
                  className="size-20 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 space-y-1">
                  <h4 className="font-semibold leading-snug">{dish.name}</h4>
                  <p className="text-sm font-medium tabular-nums text-primary">
                    {formatCurrency(dish.price)}
                  </p>
                  {dish.description && (
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {dish.description}
                    </p>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium leading-snug">
              {dish.name}
            </p>
            <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
              {formatCurrency(totalPrice)}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: function Cell({ row }) {
      const { handleUpdateOrderStatus } = useContext(OrderTableContext);
      const currentStatus = row.getValue("status") as string;
      const config = ORDER_STATUS_CONFIG[currentStatus];
      const dishId = row.original.dishSnapshot.dishId;

      const changeOrderStatus = (
        status: (typeof OrderStatusValues)[number]
      ) => {
        if (!dishId) {
          return;
        }

        handleUpdateOrderStatus({
          orderId: row.original.id,
          dishId,
          status: status,
          quantity: row.original.quantity,
        });
      };

      return (
        <Select
          disabled={!dishId}
          onValueChange={(value: (typeof OrderStatusValues)[number]) =>
            changeOrderStatus(value)
          }
          value={currentStatus}
        >
          <SelectTrigger
            className={cn(
              "h-8 w-[140px] gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors",
              config?.className
            )}
          >
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {OrderStatusValues.map((status) => {
              const statusCfg = ORDER_STATUS_CONFIG[status];
              const StatusIcon = statusCfg?.icon;
              return (
                <SelectItem key={status} value={status}>
                  <span className="flex items-center gap-2">
                    {StatusIcon && <StatusIcon className="size-3.5 shrink-0" />}
                    {getOrderStatus(status)}
                  </span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    id: "orderHandlerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3"
        >
          Order Handler
          <ArrowUpDown className="ml-1.5 size-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const handler = row.original.orderHandler;

      if (!handler) {
        return <span className="text-xs text-muted-foreground">—</span>;
      }

      return (
        <div className="flex items-center gap-2">
          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold uppercase">
            {handler.name.charAt(0)}
          </div>
          <span className="text-sm">{handler.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3"
        >
          Created/Updated At
          <ArrowUpDown className="ml-1.5 size-3.5" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const updatedAt = row.original.updatedAt as unknown as string;

      return (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="space-y-1 text-sm tabular-nums">
                <p className="leading-snug">
                  {formatDateTimeToLocaleString(createdAt)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDateTimeToLocaleString(updatedAt)}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="text-xs">
              <p>
                <span className="font-medium">Created:</span>{" "}
                {formatDateTimeToLocaleString(createdAt)}
              </p>
              <p>
                <span className="font-medium">Updated:</span>{" "}
                {formatDateTimeToLocaleString(updatedAt)}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <OrderActions orderId={row.original.id} />,
  },
];
