import AutoPagination from "@/components/auto-pagination";
import DataTable from "@/components/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PAGE_SIZE } from "@/constants/pagination";
import { TableStatus } from "@/constants/type";
import { handleErrorApi } from "@/lib/utils/api-error";
import { cn } from "@/lib/utils";
import { simpleMatchText } from "@/lib/utils/text";
import { useGetTableListQuery } from "@/queries/use-table";
import { TableListResType } from "@/schemas/table.schema";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleDot, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

type TableItem = TableListResType["data"]["items"][number];

interface TablesDialogProps {
  onTableChoose: (table: TableItem) => void;
}

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
  [TableStatus.Reserved]: {
    label: "Reserved",
    icon: CircleDot,
    className:
      "bg-amber-500/15 text-amber-700 border-amber-500/25 hover:bg-amber-500/20 dark:text-amber-400 dark:border-amber-400/20",
  },
  [TableStatus.Hidden]: {
    label: "Hidden",
    icon: CircleX,
    className:
      "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 hover:bg-zinc-500/15 dark:text-zinc-400 dark:border-zinc-400/15",
  },
};

const columns: ColumnDef<TableItem>[] = [
  {
    accessorKey: "number",
    header: "Table",
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <p className="font-medium leading-snug">Table {row.original.number}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{row.original.capacity} seats</span>
          {row.original.isOccupied && <span>In use</span>}
        </div>
      </div>
    ),
    filterFn: (row, _columnId, filterValue: string) => {
      if (filterValue === undefined) return true;

      return simpleMatchText(String(row.original.number), String(filterValue));
    },
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => <span className="tabular-nums">{row.original.capacity}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
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
  },
];

export function TablesDialog({ onTableChoose }: TablesDialogProps) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const tableListQuery = useGetTableListQuery({
    page,
    limit: PAGE_SIZE,
  }, {
    enabled: open,
  });

  const tables = tableListQuery.data?.payload.data.items ?? [];
  const totalItems = tableListQuery.data?.payload.data.totalItem ?? 0;
  const totalPages = tableListQuery.data?.payload.data.totalPage ?? 1;

  useEffect(() => {
    if (tableListQuery.error) {
      handleErrorApi({ error: tableListQuery.error });
    }
  }, [tableListQuery.error]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setPage(1);
    }
  };

  const handleTableSelect = (table: TableItem) => {
    if (
      (table.status !== TableStatus.Available &&
        table.status !== TableStatus.Reserved) ||
      table.isOccupied
    ) {
      return;
    }

    onTableChoose(table);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Choose table
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Choose a table</DialogTitle>
        </DialogHeader>
        <DataTable
          columns={columns}
          tableData={tables}
          pageSize={PAGE_SIZE}
          loading={tableListQuery.isPending}
          emptyMessage="No matching tables found."
          onRenderToolbar={(table) => (
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter table number"
                value={
                  (table.getColumn("number")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("number")?.setFilterValue(event.target.value)
                }
                className="h-9 w-40 lg:w-56"
              />
            </div>
          )}
          onGetRowProps={(row) => {
            const isSelectable =
              (row.original.status === TableStatus.Available ||
                row.original.status === TableStatus.Reserved) &&
              !row.original.isOccupied;

            return {
              onClick: () => handleTableSelect(row.original),
              className: cn(
                isSelectable
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-60"
              ),
            };
          }}
          onRenderFooter={(table) =>
            tableListQuery.isPending ? null : (
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 py-4 text-xs text-muted-foreground">
                  Display <strong>{table.getPaginationRowModel().rows.length}</strong>{" "}
                  out of <strong>{totalItems}</strong> results
                </div>
                {totalPages > 1 && (
                  <div>
                    <AutoPagination
                      page={page}
                      pageSize={totalPages}
                      onClick={setPage}
                      isLink={false}
                    />
                  </div>
                )}
              </div>
            )
          }
        />
      </DialogContent>
    </Dialog>
  );
}

export default TablesDialog;
