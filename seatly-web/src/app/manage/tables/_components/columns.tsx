import TableActions from "@/app/manage/tables/_components/table-actions";
import QRCodeTable from "@/components/qrcode-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableStatus } from "@/constants/type";
import { cn } from "@/lib/utils";
import { type TableListResType } from "@/schemas/table.schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, CircleCheck, CircleDot, CircleX } from "lucide-react";

type TableItem = TableListResType["data"]["items"][number];

const statusConfig: Record<
  string,
  { label: string; icon: typeof CircleCheck; className: string }
> = {
  [TableStatus.Available]: {
    label: "Available",
    icon: CircleCheck,
    className:
      "bg-emerald-500/15 text-emerald-700 border-emerald-500/25 hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-400/20",
  },
  [TableStatus.Hidden]: {
    label: "Hidden",
    icon: CircleX,
    className:
      "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 hover:bg-zinc-500/15 dark:text-zinc-400 dark:border-zinc-400/15",
  },
  [TableStatus.Reserved]: {
    label: "Reserved",
    icon: CircleDot,
    className:
      "bg-amber-500/15 text-amber-700 border-amber-500/25 hover:bg-amber-500/20 dark:text-amber-400 dark:border-amber-400/20",
  },
};

export const columns: ColumnDef<TableItem>[] = [
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
    accessorKey: "number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Table Number
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">{row.getValue("number")}</span>
    ),
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Capacity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <span className="tabular-nums">{row.getValue("capacity")}</span>
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
    accessorKey: "token",
    header: "QR Code",
    cell: ({ row }) => (
      <div className="py-1">
        <QRCodeTable
          token={row.getValue("token")}
          tableNumber={row.getValue("number")}
          width={100}
        />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <TableActions tableNumber={row.original.number} />,
  },
];
