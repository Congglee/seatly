import AutoPagination from "@/components/auto-pagination";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { PAGE_SIZE } from "@/constants/pagination";
import {
  formatDateTimeToLocaleString,
  getDefaultDateRange,
} from "@/lib/utils/date";
import { simpleMatchText } from "@/lib/utils/text";
import { useGetGuestListQuery } from "@/queries/use-account";
import { GetListGuestsResType } from "@/schemas/account.schema";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import type { DateRange } from "react-day-picker";

type GuestItem = GetListGuestsResType["data"][number];

const columns: ColumnDef<GuestItem>[] = [
  {
    accessorKey: "name",
    header: "Guest",
    cell: ({ row }) => (
      <div className="space-y-0.5">
        <p className="font-medium leading-snug">{row.original.name}</p>
        <p className="text-xs text-muted-foreground">ID: {row.original.id}</p>
      </div>
    ),
    filterFn: (row, _columnId, filterValue: string) => {
      if (filterValue === undefined) return true;

      return simpleMatchText(
        `${row.original.name} ${row.original.id}`,
        String(filterValue)
      );
    },
  },
  {
    accessorKey: "tableNumber",
    header: "Table",
    cell: ({ row }) => (
      <span className="tabular-nums">{row.original.tableNumber ?? "-"}</span>
    ),
    filterFn: (row, _columnId, filterValue: string) => {
      if (filterValue === undefined) return true;

      return simpleMatchText(
        String(row.original.tableNumber ?? ""),
        String(filterValue)
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDateTimeToLocaleString(row.original.createdAt)}
      </span>
    ),
  },
];

interface GuestsDialogProps {
  onGuestChoose: (guest: GuestItem) => void;
}

export default function GuestsDialog({ onGuestChoose }: GuestsDialogProps) {
  const initialDateRange = getDefaultDateRange();
  const [guestsDialogOpen, setGuestsDialogOpen] = useState(false);
  const [fromDate, setFromDate] = useState(initialDateRange.fromDate);
  const [toDate, setToDate] = useState(initialDateRange.toDate);
  const selectedDateRange: DateRange = {
    from: fromDate,
    to: toDate,
  };

  const guestsListQuery = useGetGuestListQuery(
    { fromDate, toDate },
    { enabled: guestsDialogOpen }
  );

  const guests = guestsListQuery.data?.payload.data ?? [];

  const handleGuestSelect = (guest: GuestItem) => {
    onGuestChoose(guest);
    setGuestsDialogOpen(false);
  };

  const handleGuestsDialogOpenChange = (isOpen: boolean) => {
    setGuestsDialogOpen(isOpen);

    if (!isOpen) {
      const nextDateRange = getDefaultDateRange();
      setFromDate(nextDateRange.fromDate);
      setToDate(nextDateRange.toDate);
    }
  };

  const handleResetDateFilter = () => {
    const nextDateRange = getDefaultDateRange();
    setFromDate(nextDateRange.fromDate);
    setToDate(nextDateRange.toDate);
  };

  const handleDateRangeChange = ({ from, to }: { from: Date; to: Date }) => {
    setFromDate(from);
    setToDate(to);
  };

  return (
    <Dialog open={guestsDialogOpen} onOpenChange={handleGuestsDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Choose guest</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-auto sm:max-w-[760px]">
        <DialogHeader>
          <DialogTitle>Choose an existing guest</DialogTitle>
        </DialogHeader>
        <DataTable
          key={`${fromDate.toISOString()}-${toDate.toISOString()}`}
          columns={columns}
          tableData={guests}
          pageSize={PAGE_SIZE}
          loading={guestsListQuery.isPending}
          emptyMessage="No matching guests found."
          onRenderToolbar={(table) => (
            <div className="flex flex-col gap-3 px-1 py-4">
              <div className="flex flex-wrap gap-2">
                <Input
                  placeholder="Filter guest name or ID"
                  value={
                    (table.getColumn("name")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("name")?.setFilterValue(event.target.value)
                  }
                  className="h-9 w-full sm:w-56"
                />
                <Input
                  placeholder="Filter table"
                  value={
                    (table
                      .getColumn("tableNumber")
                      ?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("tableNumber")
                      ?.setFilterValue(event.target.value)
                  }
                  className="h-9 w-full sm:w-32"
                />
              </div>
              <div className="flex flex-wrap items-end gap-2">
                <div className="flex w-fit flex-col gap-1.5">
                  <p className="text-xs font-medium text-muted-foreground">
                    Date range
                  </p>
                  <DatePicker
                    id="guest-dialog-date-range"
                    date={selectedDateRange}
                    onDateSelect={handleDateRangeChange}
                    variant="outline"
                    numberOfMonths={2}
                    className="justify-start text-left font-normal"
                    aria-label="Choose guest created date range"
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResetDateFilter}
                >
                  Reset dates
                </Button>
              </div>
            </div>
          )}
          onGetRowProps={(row) => ({
            onClick: () => handleGuestSelect(row.original),
            className: "cursor-pointer",
          })}
          onRenderFooter={(table) =>
            guestsListQuery.isPending ? null : (
              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 py-4 text-xs text-muted-foreground">
                  Display{" "}
                  <strong>{table.getPaginationRowModel().rows.length}</strong>{" "}
                  out of <strong>{guests.length}</strong> results
                </div>
                {table.getPageCount() > 1 && (
                  <div>
                    <AutoPagination
                      page={table.getState().pagination.pageIndex + 1}
                      pageSize={table.getPageCount()}
                      onClick={(pageNumber) =>
                        table.setPagination({
                          pageIndex: pageNumber - 1,
                          pageSize: PAGE_SIZE,
                        })
                      }
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
