import AccountRoleFilter from "@/app/manage/accounts/_components/account-role-filter";
import AccountSkeleton from "@/app/manage/accounts/_components/account-skeleton";
import { columns } from "@/app/manage/accounts/_components/columns";
import EditAccount from "@/app/manage/accounts/_components/edit-account";
import NewAccount from "@/app/manage/accounts/_components/new-account";
import AutoPagination from "@/components/auto-pagination";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_LIMIT } from "@/constants/pagination";
import { useGetAccountListQuery } from "@/queries/use-account";
import { useNewAccountStore } from "@/store/accounts/use-new-account";
import { Plus, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function AccountTable() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;

  const { onOpenNewAccountSheet } = useNewAccountStore();

  const accountListQuery = useGetAccountListQuery({
    page,
    limit: DEFAULT_LIMIT,
  });

  const accounts = accountListQuery.data?.payload.data.items ?? [];
  const totalItems = accountListQuery.data?.payload.data.totalItem ?? 0;
  const totalPages = Math.ceil(totalItems / DEFAULT_LIMIT) || 1;

  return (
    <>
      <DataTable
        columns={columns}
        tableData={accounts}
        pageSize={DEFAULT_LIMIT}
        loading={accountListQuery.isPending}
        loadingFallback={<AccountSkeleton />}
        onRenderToolbar={(table) => {
          const isFiltered = table.getState().columnFilters.length > 0;
          const hasRoleColumn = table
            .getAllColumns()
            .find((column) => column.id === "role");

          return (
            <div className="my-2 flex w-full items-center justify-between gap-2 overflow-auto px-1 py-2 scroll">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Filter name, email or ID"
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="h-9 w-44 lg:w-72"
                />
                {hasRoleColumn && (
                  <AccountRoleFilter column={table.getColumn("role")} />
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
                onClick={onOpenNewAccountSheet}
              >
                <Plus className="size-4" />
                Add account
              </Button>
            </div>
          );
        }}
        onRenderFooter={(table) =>
          accountListQuery.isPending ? null : (
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
                  pathname="/manage/accounts"
                />
              </div>
            </div>
          )
        }
      />
      <NewAccount />
      <EditAccount />
    </>
  );
}
