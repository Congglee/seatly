import { columns } from "@/app/manage/orders/_components/columns";
import EditOrder from "@/app/manage/orders/_components/edit-order";
import NewOrder from "@/app/manage/orders/_components/new-order";
import OrderSkeleton from "@/app/manage/orders/_components/order-skeleton";
import OrderStatics from "@/app/manage/orders/_components/order-statics";
import OrderStatusFilter from "@/app/manage/orders/_components/order-status-filter";
import {
  OrderObjectByGuestID,
  useOrderTableData,
} from "@/app/manage/orders/hooks/use-order-table-data";
import AutoPagination from "@/components/auto-pagination";
import DataTable from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_LIMIT, MAX_LIST_LIMIT } from "@/constants/pagination";
import { OrderStatusValues } from "@/constants/type";
import { handleErrorApi } from "@/lib/utils/api-error";
import { useAppStore } from "@/providers/app-provider";
import {
  useGetOrderListQuery,
  useUpdateOrderMutation,
} from "@/queries/use-order";
import { useGetTableListQuery } from "@/queries/use-table";
import { GuestCreateOrdersResType } from "@/schemas/guest.schema";
import {
  PayGuestOrdersResType,
  UpdateOrderResType,
} from "@/schemas/order.schema";
import { useNewOrderStore } from "@/store/orders/use-new-order";
import { Plus, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { createContext, useEffect } from "react";
import { toast } from "sonner";

export const OrderTableContext = createContext({
  handleUpdateOrderStatus: (_payload: {
    orderId: string;
    dishId: string;
    status: (typeof OrderStatusValues)[number];
    quantity: number;
  }) => {},
  orderObjectByGuestId: {} as OrderObjectByGuestID,
});

export default function OrderTable() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;

  const { onOpenNewOrderSheet } = useNewOrderStore();

  const orderListQuery = useGetOrderListQuery({
    page,
    limit: DEFAULT_LIMIT,
  });

  const orders = orderListQuery.data?.payload.data.items ?? [];
  const totalItems = orderListQuery.data?.payload.data.totalItem ?? 0;
  const totalPages = Math.ceil(totalItems / DEFAULT_LIMIT) || 1;
  const refetchOrderList = orderListQuery.refetch;

  const orderOverviewQuery = useGetOrderListQuery({
    page: 1,
    limit: MAX_LIST_LIMIT,
  });
  const overviewOrders = orderOverviewQuery.data?.payload.data.items ?? [];
  const refetchOrderOverview = orderOverviewQuery.refetch;

  const tableListQuery = useGetTableListQuery({
    page: 1,
    limit: MAX_LIST_LIMIT,
  });
  const tableList = tableListQuery.data?.payload.data.items ?? [];
  const tableListSortedByNumber = [...tableList].sort(
    (a, b) => a.number - b.number
  );

  const { statics, orderObjectByGuestId, servingGuestByTableNumber } =
    useOrderTableData(overviewOrders);

  const updateOrderMutation = useUpdateOrderMutation();

  const socket = useAppStore((state) => state.socket);

  const handleUpdateOrderStatus = async (body: {
    orderId: string;
    dishId: string;
    status: (typeof OrderStatusValues)[number];
    quantity: number;
  }) => {
    try {
      await updateOrderMutation.mutateAsync(body);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  useEffect(() => {
    if (socket?.connected) {
      onConnect();
    }

    function onConnect() {
      console.log(socket?.id);
    }

    function onDisconnect() {
      console.log("disconnect");
    }

    function refetch() {
      refetchOrderList();
      refetchOrderOverview();
    }

    function onUpdateOrder(data: UpdateOrderResType["data"]) {
      toast.success(`Order ${data.id} status updated to ${data.status}`);

      refetch();
    }

    function onNewOrder(data: GuestCreateOrdersResType["data"]) {
      if (data.length === 0) {
        return;
      }

      const { guest } = data[0];
      toast.success(
        `${guest?.name} tại bàn ${guest?.tableNumber} vừa đặt ${data.length} đơn`
      );
      refetch();
    }

    function onPayment(data: PayGuestOrdersResType["data"]) {
      if (data.length === 0) {
        return;
      }

      const { guest } = data[0];
      toast.success(
        `${guest?.name} tại bàn ${guest?.tableNumber} thanh toán thành công ${data.length} đơn`
      );
      refetch();
    }

    socket?.on("update-order", onUpdateOrder);
    socket?.on("new-order", onNewOrder);
    socket?.on("connect", onConnect);
    socket?.on("disconnect", onDisconnect);
    socket?.on("payment", onPayment);

    return () => {
      socket?.off("connect", onConnect);
      socket?.off("disconnect", onDisconnect);
      socket?.off("update-order", onUpdateOrder);
      socket?.off("new-order", onNewOrder);
      socket?.off("payment", onPayment);
    };
  }, [refetchOrderList, refetchOrderOverview, socket]);

  return (
    <OrderTableContext.Provider
      value={{ handleUpdateOrderStatus, orderObjectByGuestId }}
    >
      <OrderStatics
        statics={statics}
        tableList={tableListSortedByNumber}
        servingGuestByTableNumber={servingGuestByTableNumber}
      />
      <DataTable
        columns={columns}
        tableData={orders}
        pageSize={DEFAULT_LIMIT}
        loading={orderListQuery.isPending}
        loadingFallback={<OrderSkeleton />}
        onRenderToolbar={(table) => {
          const isFiltered = table.getState().columnFilters.length > 0;
          const hasStatusColumn = table.getColumn("status") !== null;

          return (
            <div className="my-2 flex w-full items-center justify-between gap-2 overflow-auto px-1 py-2 scroll">
              <div className="flex flex-1 items-center gap-2">
                <Input
                  placeholder="Filter table number or guest name"
                  value={
                    (table.getColumn("guestName")?.getFilterValue() as
                      | string
                      | undefined) ?? ""
                  }
                  onChange={(event) => {
                    const filterValue = event.target.value ?? "";

                    table.getColumn("guestName")?.setFilterValue(filterValue);
                  }}
                  className="h-9 w-40 lg:w-64"
                />
                {hasStatusColumn && (
                  <OrderStatusFilter column={table.getColumn("status")} />
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
                onClick={onOpenNewOrderSheet}
              >
                <Plus className="size-4" />
                Add order
              </Button>
            </div>
          );
        }}
        onRenderFooter={(table) =>
          orderListQuery.isPending ? null : (
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
                  pathname="/manage/orders"
                />
              </div>
            </div>
          )
        }
      />
      <NewOrder />
      <EditOrder />
    </OrderTableContext.Provider>
  );
}
