export const mockDashboardStats = {
  revenue: 12500000,
  guests: 45,
  orders: 32,
  activeTables: 8,
};

export const mockRevenueData = [
  { date: "01/12/2025", revenue: 15000000 },
  { date: "02/12/2025", revenue: 12000000 },
  { date: "03/12/2025", revenue: 8000000 },
  { date: "04/12/2025", revenue: 8000000 },
  { date: "05/12/2025", revenue: 10000000 },
  { date: "06/12/2025", revenue: 14000000 },
  { date: "07/12/2025", revenue: 18000000 },
];

export const mockDishRanking = [
  {
    id: "dish-1",
    name: "Chicken Wings",
    orders: 120,
    image: "/images/chicken-wings.jpg",
    description: "Chicken wings with cheese",
  },
  {
    id: "dish-2",
    name: "Crab Cake",
    orders: 95,
    image: "/images/crab-cake.jpg",
    description: "Crab cake with sauce",
  },
  {
    id: "dish-3",
    name: "Shrimp Cocktail",
    orders: 85,
    image: "/images/shrimp-cocktail.jpg",
    description: "Shrimp cocktail with salt and pepper",
  },
  {
    id: "dish-4",
    name: "Milkfish",
    orders: 70,
    image: "/images/milkfish.jpg",
    description: "Milkfish with garlic and oil",
  },
  {
    id: "dish-5",
    name: "Red Shrimp",
    orders: 60,
    image: "/images/red-shrimp.jpg",
    description: "Red shrimp with oil",
  },
];

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
