export interface MockNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "order" | "reservation" | "system";
}

export const mockNotifications: MockNotification[] = [
  {
    id: "notif-1",
    title: "New Order",
    message: "Table 12 just added 2 Crab Cakes",
    timestamp: "2 minutes ago",
    read: false,
    type: "order",
  },
  {
    id: "notif-2",
    title: "New Reservation",
    message:
      "Customer Nguyen Van Hung booked a table for 4 people at 19:00 tomorrow",
    timestamp: "15 minutes ago",
    read: false,
    type: "reservation",
  },
  {
    id: "notif-3",
    title: "Order Paid",
    message: "Table 8 has paid 2.450.000đ",
    timestamp: "1 hour ago",
    read: true,
    type: "order",
  },
  {
    id: "notif-4",
    title: "System Update",
    message: "Version 1.2.0 is ready with improved revenue report",
    timestamp: "3 hours ago",
    read: true,
    type: "system",
  },
  {
    id: "notif-5",
    title: "Cancel Reservation",
    message: "Table 6 at 18:30 has been canceled by the customer",
    timestamp: "5 giờ trước",
    read: true,
    type: "reservation",
  },
];
