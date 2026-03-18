import { columns } from "@/app/manage/tables/_components/columns";
import EditTable from "@/app/manage/tables/_components/edit-table";
import NewTable from "@/app/manage/tables/_components/new-table";
import TableSkeleton from "@/app/manage/tables/_components/table-skeleton";
import TableStatusFilter from "@/app/manage/tables/_components/table-status-filter";
import AutoPagination from "@/components/auto-pagination";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_LIMIT } from "@/constants/pagination";
import { useTableListQuery } from "@/queries/use-table";
import { useNewTableStore } from "@/store/tables/use-new-table";
import { Plus, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function TableTable() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;

  const { onOpenNewTableSheet } = useNewTableStore();

  const tableListQuery = useTableListQuery({
    page,
    limit: DEFAULT_LIMIT,
  });
  const tables = tableListQuery.data?.payload.data.items ?? [];
  const totalItems = tableListQuery.data?.payload.data.totalItem ?? 0;
  const totalPages = Math.ceil(totalItems / DEFAULT_LIMIT) || 1;

  return (
    <>
      <DataTable
        columns={columns}
        tableData={tables}
        pageSize={DEFAULT_LIMIT}
        loading={tableListQuery.isPending}
        loadingFallback={<TableSkeleton />}
        onRenderToolbar={(table) => {
          const isFiltered = table.getState().columnFilters.length > 0;
          const allColumns = table.getAllColumns();

          const hasStatusColumn = allColumns.find(
            (column) => column.id === "status"
          );

          return (
            <div className="flex w-full items-center justify-between gap-2 overflow-auto px-1 py-2 my-2 scroll">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Filter table number"
                  value={
                    (table.getColumn("number")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("number")
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-9 w-40 lg:w-64"
                />
                {hasStatusColumn && (
                  <TableStatusFilter column={table.getColumn("status")} />
                )}
                {isFiltered && (
                  <Button
                    variant="ghost"
                    onClick={() => table.resetColumnFilters()}
                    className="h-8 px-2 lg:px-3"
                  >
                    Reset
                    <X />
                  </Button>
                )}
              </div>
              <Button
                size="sm"
                className="h-9 gap-1"
                onClick={onOpenNewTableSheet}
              >
                <Plus className="size-4" />
                Add table
              </Button>
            </div>
          );
        }}
        onRenderFooter={(table) =>
          tableListQuery.isPending ? null : (
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-xs text-muted-foreground py-4 flex-1 ">
                Display{" "}
                <strong>{table.getPaginationRowModel().rows.length}</strong> out
                of <strong>{totalItems}</strong> results
              </div>
              <div>
                <AutoPagination
                  page={page}
                  pageSize={totalPages}
                  pathname="/manage/tables"
                />
              </div>
            </div>
          )
        }
      />
      <NewTable />
      <EditTable />
    </>
  );
}
