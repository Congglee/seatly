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
import { Input } from "@/components/ui/input";
import { PAGE_SIZE } from "@/constants/pagination";
import { formatDateTimeToLocaleString } from "@/lib/utils/date";
import { simpleMatchText } from "@/lib/utils/text";
import { useGetGuestListQuery } from "@/queries/use-account";
import { GetListGuestsResType } from "@/schemas/account.schema";
import { ColumnDef } from "@tanstack/react-table";
import { endOfDay, format, startOfDay } from "date-fns";
import { useState } from "react";

type GuestItem = GetListGuestsResType["data"][0];

interface GuestsDialogProps {
  onGuestChoose: (guest: GuestItem) => void;
}

export const columns: ColumnDef<GuestItem>[] = [
  {
    accessorKey: "name",
    header: "Tên",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("name")} | (#{row.original.id})
      </div>
    ),
    filterFn: (row, columnId, filterValue: string) => {
      if (filterValue === undefined) return true;
      return simpleMatchText(
        row.original.name + String(row.original.id),
        String(filterValue)
      );
    },
  },
  {
    accessorKey: "tableNumber",
    header: "Số bàn",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tableNumber")}</div>
    ),
    filterFn: (row, columnId, filterValue: string) => {
      if (filterValue === undefined) return true;
      return simpleMatchText(
        String(row.original.tableNumber),
        String(filterValue)
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Tạo</div>,
    cell: ({ row }) => (
      <div className="flex items-center space-x-4 text-sm">
        {formatDateTimeToLocaleString(row.getValue("createdAt"))}
      </div>
    ),
  },
];

const initFromDate = startOfDay(new Date());
const initToDate = endOfDay(new Date());

export default function GuestsDialog({ onGuestChoose }: GuestsDialogProps) {
  const [open, setOpen] = useState(false);
  const [fromDate, setFromDate] = useState(initFromDate);
  const [toDate, setToDate] = useState(initToDate);
  const guestsListQuery = useGetGuestListQuery({ fromDate, toDate });
  const data = guestsListQuery.data?.payload.data ?? [];

  const handleGuestSelect = (guest: GuestItem) => {
    onGuestChoose(guest);
    setOpen(false);
  };

  const handleResetDateFilter = () => {
    setFromDate(initFromDate);
    setToDate(initToDate);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Chọn khách</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-full overflow-auto">
        <DialogHeader>
          <DialogTitle>Chọn khách hàng</DialogTitle>
        </DialogHeader>
        <div>
          <div className="w-full">
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center">
                <span className="mr-2">Từ</span>
                <Input
                  type="datetime-local"
                  placeholder="Từ ngày"
                  className="text-sm"
                  value={format(fromDate, "yyyy-MM-dd HH:mm").replace(" ", "T")}
                  onChange={(event) =>
                    setFromDate(new Date(event.target.value))
                  }
                />
              </div>
              <div className="flex items-center">
                <span className="mr-2">Đến</span>
                <Input
                  type="datetime-local"
                  placeholder="Đến ngày"
                  value={format(toDate, "yyyy-MM-dd HH:mm").replace(" ", "T")}
                  onChange={(event) => setToDate(new Date(event.target.value))}
                />
              </div>
              <Button
                className=""
                variant={"outline"}
                onClick={handleResetDateFilter}
              >
                Reset
              </Button>
            </div>
            <DataTable
              columns={columns}
              tableData={data}
              pageIndex={0}
              pageSize={PAGE_SIZE}
              loading={guestsListQuery.isPending}
              onRenderToolbar={(table) => (
                <div className="flex items-center py-4 gap-2">
                  <Input
                    placeholder="Tên hoặc Id"
                    value={
                      (table.getColumn("name")?.getFilterValue() as string) ??
                      ""
                    }
                    onChange={(event) =>
                      table
                        .getColumn("name")
                        ?.setFilterValue(event.target.value)
                    }
                    className="w-[170px]"
                  />
                  <Input
                    placeholder="Số bàn"
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
                    className="w-[80px]"
                  />
                </div>
              )}
              onGetRowProps={(row) => ({
                onClick: () => handleGuestSelect(row.original),
                className: "cursor-pointer",
              })}
              onRenderFooter={(table) =>
                guestsListQuery.isPending ? null : (
                  <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="text-xs text-muted-foreground py-4 flex-1 ">
                      Hiển thị{" "}
                      <strong>
                        {table.getPaginationRowModel().rows.length}
                      </strong>{" "}
                      trong <strong>{data.length}</strong> kết quả
                    </div>
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
                  </div>
                )
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
