import AutoPagination from "@/components/auto-pagination";
import DataTable from "@/components/data-table";
import TableStatusBadge from "@/components/table-status-badge";
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
import { useEffect, useState } from "react";

type TableItem = TableListResType["data"]["items"][number];

const columns: ColumnDef<TableItem>[] = [
  {
    accessorKey: "number",
    header: "Bàn",
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <p className="font-medium leading-snug">Bàn {row.original.number}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{row.original.capacity} chỗ</span>
          {row.original.isOccupied && <span>Đang sử dụng</span>}
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
    header: "Sức chứa",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.original.capacity}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const status = row.original.status;
      return <TableStatusBadge status={status} />;
    },
  },
];

interface TablesDialogProps {
  onTableChoose: (table: TableItem) => void;
}

export default function TablesDialog({ onTableChoose }: TablesDialogProps) {
  const [tablesDialogOpen, setTablesDialogOpen] = useState(false);
  const [page, setPage] = useState(1);

  const tableListQuery = useGetTableListQuery(
    {
      page,
      limit: PAGE_SIZE,
    },
    {
      enabled: tablesDialogOpen,
    }
  );

  const tables = tableListQuery.data?.payload.data.items ?? [];
  const totalItems = tableListQuery.data?.payload.data.totalItem ?? 0;
  const totalPages = tableListQuery.data?.payload.data.totalPage ?? 1;

  useEffect(() => {
    if (tableListQuery.error) {
      handleErrorApi({ error: tableListQuery.error });
    }
  }, [tableListQuery.error]);

  const handleTablesDialogOpenChange = (isOpen: boolean) => {
    setTablesDialogOpen(isOpen);

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
    setTablesDialogOpen(false);
  };

  return (
    <Dialog open={tablesDialogOpen} onOpenChange={handleTablesDialogOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          Chọn bàn
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Chọn bàn</DialogTitle>
        </DialogHeader>
        <DataTable
          columns={columns}
          tableData={tables}
          pageSize={PAGE_SIZE}
          loading={tableListQuery.isPending}
          emptyMessage="Không tìm thấy bàn phù hợp."
          onRenderToolbar={(table) => (
            <div className="flex items-center px-1 py-4">
              <Input
                placeholder="Lọc theo số bàn"
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
