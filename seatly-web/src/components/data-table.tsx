"use client";

import {
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  Row,
  SortingState,
  Table as TanstackTable,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
  emptyMessage?: string;
  loading?: boolean;
  loadingFallback?: ReactNode;
  pageIndex?: number;
  pageSize?: number;
  onRenderToolbar?: (table: TanstackTable<TData>) => ReactNode;
  onRenderFooter?: (table: TanstackTable<TData>) => ReactNode;
  onGetRowProps?: (row: Row<TData>) => HTMLAttributes<HTMLTableRowElement>;
};

export default function DataTable<TData, TValue>({
  columns,
  tableData,
  emptyMessage = "No results.",
  loading = false,
  loadingFallback,
  pageIndex = 0,
  pageSize = 10,
  onRenderToolbar,
  onRenderFooter,
  onGetRowProps,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize,
  });

  const handleResetPageIndex = () => {
    setPagination((current) => ({
      ...current,
      pageIndex: 0,
    }));
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updater) => {
    setSorting(updater);
    handleResetPageIndex();
  };

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = (
    updater
  ) => {
    setColumnFilters(updater);
    handleResetPageIndex();
  };

  const handlePaginationChange: OnChangeFn<PaginationState> = (updater) => {
    setPagination(updater);
  };

  const table = useReactTable({
    data: tableData,
    columns,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize,
    });
  }, [pageIndex, pageSize, table]);

  return (
    <div className="w-full overflow-auto">
      {onRenderToolbar?.(table)}
      {loading ? (
        loadingFallback ?? (
          <div className="rounded-md border">
            <div className="flex h-24 items-center justify-center text-sm text-muted-foreground">
              Loading...
            </div>
          </div>
        )
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    {...onGetRowProps?.(row)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      table.getVisibleLeafColumns().length || columns.length
                    }
                    className="h-24 text-center"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {onRenderFooter?.(table)}
    </div>
  );
}
