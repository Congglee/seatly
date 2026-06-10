import DishActions from "@/app/manage/dishes/_components/dish-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DishStatus } from "@/constants/type";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";
import { type DishListResType } from "@/schemas/dish.schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheck, CircleDot, CircleX } from "lucide-react";

type DishItem = DishListResType["data"]["items"][number];

const statusConfig: Record<
  string,
  { label: string; icon: typeof CircleCheck; className: string }
> = {
  [DishStatus.Available]: {
    label: "Available",
    icon: CircleCheck,
    className:
      "bg-emerald-500/15 text-emerald-700 border-emerald-500/25 hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-400/20",
  },
  [DishStatus.Unavailable]: {
    label: "Unavailable",
    icon: CircleDot,
    className:
      "bg-amber-500/15 text-amber-700 border-amber-500/25 hover:bg-amber-500/20 dark:text-amber-400 dark:border-amber-400/20",
  },
  [DishStatus.Hidden]: {
    label: "Hidden",
    icon: CircleX,
    className:
      "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 hover:bg-zinc-500/15 dark:text-zinc-400 dark:border-zinc-400/15",
  },
};

export const columns: ColumnDef<DishItem>[] = [
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
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      const dishName = row.getValue("name") as string;

      return (
        <div className="h-12 w-12 overflow-hidden rounded-md border border-border/60 bg-muted">
          <div
            role="img"
            aria-label={`${dishName} image`}
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dish Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <p className="font-medium leading-snug">{row.getValue("name")}</p>
        <p className="text-xs text-muted-foreground">ID: {row.original.id}</p>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="tabular-nums">
        {formatCurrency(row.getValue("price") as number)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const config = statusConfig[status];

      if (!config) {
        return <span>{status}</span>;
      }

      const StatusIcon = config.icon;

      return (
        <Badge
          variant="outline"
          className={cn(
            "gap-1.5 px-2 py-0.5 font-medium transition-colors",
            config.className
          )}
        >
          <StatusIcon className="size-3.5" />
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      const preview =
        description.length > 96
          ? `${description.slice(0, 93)}...`
          : description;

      return (
        <p
          className="max-w-[22rem] text-sm text-muted-foreground"
          title={description}
        >
          {preview}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DishActions dishId={row.original.id} />,
  },
];
