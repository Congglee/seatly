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
import { DISH_STATUS_CONFIG } from "@/constants/dish-status";
import { PAGE_SIZE } from "@/constants/pagination";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils/currency";
import { simpleMatchText } from "@/lib/utils/text";
import { useGetDishListQuery } from "@/queries/use-dish";
import { DishListResType } from "@/schemas/dish.schema";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type DishItem = DishListResType["data"]["items"][number];

interface DishesDialogProps {
  onDishChoose: (dish: DishItem) => void;
  onResetDish?: () => void;
  canReset?: boolean;
}

export const columns: ColumnDef<DishItem>[] = [
  {
    accessorKey: "image",
    header: "Ảnh",
    cell: ({ row }) => (
      <div className="h-12 w-12 overflow-hidden rounded-md border border-border/60 bg-muted">
        <Image
          src={row.original.image}
          alt={row.original.name}
          width={48}
          height={48}
          className="h-12 w-12 object-cover"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tên món
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <p className="font-medium leading-snug">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">ID: {row.original.id}</p>
      </div>
    ),
    filterFn: (row, _columnId, filterValue: string) => {
      if (filterValue === undefined) return true;
      return simpleMatchText(String(row.original.name), String(filterValue));
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Giá
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="tabular-nums">
        {formatCurrency(row.getValue("price") as number)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trạng thái
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const config = DISH_STATUS_CONFIG[status];

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

export function DishesDialog({
  onDishChoose,
  onResetDish,
  canReset = false,
}: DishesDialogProps) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const dishListQuery = useGetDishListQuery({
    page,
    limit: PAGE_SIZE,
  });

  const data = dishListQuery.data?.payload.data.items ?? [];
  const totalItems = dishListQuery.data?.payload.data.totalItem ?? 0;
  const totalPages = dishListQuery.data?.payload.data.totalPage ?? 1;

  const handleDishSelect = (dish: DishItem) => {
    onDishChoose(dish);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    if (!isOpen) {
      setPage(1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div className="flex items-center gap-2">
        <DialogTrigger asChild>
          <Button variant="outline">Đổi món</Button>
        </DialogTrigger>
        <Button
          type="button"
          variant="ghost"
          onClick={onResetDish}
          disabled={!canReset}
        >
          Đặt lại
        </Button>
      </div>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Chọn món</DialogTitle>
        </DialogHeader>
        <DataTable
          columns={columns}
          tableData={data}
          pageSize={PAGE_SIZE}
          loading={dishListQuery.isPending}
          emptyMessage="Không tìm thấy món phù hợp."
          onRenderToolbar={(table) => (
            <div className="flex items-center py-4">
              <Input
                placeholder="Lọc theo tên món"
                value={
                  (table.getColumn("name")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="h-9 w-40 lg:w-64"
              />
            </div>
          )}
          onGetRowProps={(row) => ({
            onClick: () => handleDishSelect(row.original),
            className: "cursor-pointer",
          })}
          onRenderFooter={(table) =>
            dishListQuery.isPending ? null : (
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 py-4 text-xs text-muted-foreground">
                  Hiển thị{" "}
                  <strong>{table.getPaginationRowModel().rows.length}</strong>{" "}
                  trên <strong>{totalItems}</strong> kết quả
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
