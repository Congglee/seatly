import { columns } from "@/app/manage/dishes/_components/columns";
import DishSkeleton from "@/app/manage/dishes/_components/dish-skeleton";
import DishStatusFilter from "@/app/manage/dishes/_components/dish-status-filter";
import EditDish from "@/app/manage/dishes/_components/edit-dish";
import NewDish from "@/app/manage/dishes/_components/new-dish";
import AutoPagination from "@/components/auto-pagination";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_LIMIT } from "@/constants/pagination";
import { useDishListQuery } from "@/queries/use-dish";
import { useNewDishStore } from "@/store/dishes/use-new-dish";
import { Plus, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function DishTable() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;

  const { onOpenNewDishSheet } = useNewDishStore();

  const dishListQuery = useDishListQuery({
    page,
    limit: DEFAULT_LIMIT,
  });

  const dishes = dishListQuery.data?.payload.data.items ?? [];
  const totalItems = dishListQuery.data?.payload.data.totalItem ?? 0;
  const totalPages = Math.ceil(totalItems / DEFAULT_LIMIT) || 1;

  return (
    <>
      <DataTable
        columns={columns}
        tableData={dishes}
        pageSize={DEFAULT_LIMIT}
        loading={dishListQuery.isPending}
        loadingFallback={<DishSkeleton />}
        onRenderToolbar={(table) => {
          const isFiltered = table.getState().columnFilters.length > 0;
          const allColumns = table.getAllColumns();

          const hasStatusColumn = allColumns.find(
            (column) => column.id === "status"
          );

          return (
            <div className="my-2 flex w-full items-center justify-between gap-2 overflow-auto px-1 py-2 scroll">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Filter dish name"
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="h-9 w-40 lg:w-64"
                />
                {hasStatusColumn && (
                  <DishStatusFilter column={table.getColumn("status")} />
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
                onClick={onOpenNewDishSheet}
              >
                <Plus className="size-4" />
                Add dish
              </Button>
            </div>
          );
        }}
        onRenderFooter={(table) =>
          dishListQuery.isPending ? null : (
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 py-4 text-xs text-muted-foreground">
                Display{" "}
                <strong>{table.getPaginationRowModel().rows.length}</strong> out
                of <strong>{totalItems}</strong> results
              </div>
              <div>
                <AutoPagination
                  page={page}
                  pageSize={totalPages}
                  pathname="/manage/dishes"
                />
              </div>
            </div>
          )
        }
      />
      <NewDish />
      <EditDish />
    </>
  );
}
