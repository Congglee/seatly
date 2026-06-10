import { OrderStatus } from "@/constants/type";
import { GetOrdersResType } from "@/schemas/order.schema";
import { useMemo } from "react";

type OrderItem = GetOrdersResType["data"]["items"][number];
type OrderStatusValue = OrderItem["status"];

export type StatusCountObject = Record<OrderStatusValue, number>;
export type Statics = {
  status: StatusCountObject;
  table: Record<number, Record<string, StatusCountObject>>;
};
export type OrderObjectByGuestID = Record<string, OrderItem[]>;
export type ServingGuestByTableNumber = Record<number, OrderObjectByGuestID>;

const ACTIVE_ORDER_STATUSES: OrderStatusValue[] = [
  OrderStatus.Pending,
  OrderStatus.Processing,
  OrderStatus.Delivered,
];

const createEmptyStatusCount = (): StatusCountObject => ({
  Pending: 0,
  Processing: 0,
  Delivered: 0,
  Paid: 0,
  Rejected: 0,
});

export const useOrderTableData = (
  orderList: GetOrdersResType["data"]["items"]
) => {
  const result = useMemo(() => {
    const statics: Statics = {
      status: createEmptyStatusCount(),
      table: {},
    };

    const orderObjectByGuestId: OrderObjectByGuestID = {};
    const guestByTableNumber: ServingGuestByTableNumber = {};

    orderList.forEach((order) => {
      statics.status[order.status] = statics.status[order.status] + 1;

      if (order.tableNumber !== null && order.guestId !== null) {
        if (!statics.table[order.tableNumber]) {
          statics.table[order.tableNumber] = {};
        }

        if (!statics.table[order.tableNumber][order.guestId]) {
          statics.table[order.tableNumber][order.guestId] =
            createEmptyStatusCount();
        }

        statics.table[order.tableNumber][order.guestId] = {
          ...statics.table[order.tableNumber][order.guestId],
          [order.status]:
            statics.table[order.tableNumber][order.guestId][order.status] + 1,
        };
      }

      if (order.guestId !== null) {
        if (!orderObjectByGuestId[order.guestId]) {
          orderObjectByGuestId[order.guestId] = [];
        }

        orderObjectByGuestId[order.guestId].push(order);
      }

      if (order.tableNumber !== null && order.guestId !== null) {
        if (!guestByTableNumber[order.tableNumber]) {
          guestByTableNumber[order.tableNumber] = {};
        }

        guestByTableNumber[order.tableNumber][order.guestId] =
          orderObjectByGuestId[order.guestId];
      }
    });

    const servingGuestByTableNumber: ServingGuestByTableNumber = {};

    for (const tableNumber in guestByTableNumber) {
      const guestObject = guestByTableNumber[tableNumber];
      const servingGuestObject: OrderObjectByGuestID = {};

      for (const guestId in guestObject) {
        const guestOrders = guestObject[guestId];
        const isServingGuest = guestOrders.some((order) =>
          ACTIVE_ORDER_STATUSES.includes(order.status)
        );

        if (isServingGuest) {
          servingGuestObject[guestId] = guestOrders;
        }
      }

      if (Object.keys(servingGuestObject).length) {
        servingGuestByTableNumber[Number(tableNumber)] = servingGuestObject;
      }
    }

    return { statics, orderObjectByGuestId, servingGuestByTableNumber };
  }, [orderList]);

  return result;
};
