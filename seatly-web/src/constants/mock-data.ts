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
    name: "Cánh gà chiên",
    orders: 120,
    image: "/images/chicken-wings.jpg",
    description: "Cánh gà phủ phô mai",
  },
  {
    id: "dish-2",
    name: "Bánh cua",
    orders: 95,
    image: "/images/crab-cake.jpg",
    description: "Bánh cua ăn kèm sốt",
  },
  {
    id: "dish-3",
    name: "Tôm cocktail",
    orders: 85,
    image: "/images/shrimp-cocktail.jpg",
    description: "Tôm cocktail muối tiêu",
  },
  {
    id: "dish-4",
    name: "Cá măng",
    orders: 70,
    image: "/images/milkfish.jpg",
    description: "Cá măng sốt tỏi dầu",
  },
  {
    id: "dish-5",
    name: "Tôm đỏ",
    orders: 60,
    image: "/images/red-shrimp.jpg",
    description: "Tôm đỏ áp chảo",
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
    title: "Đơn hàng mới",
    message: "Bàn 12 vừa thêm 2 bánh cua",
    timestamp: "2 phút trước",
    read: false,
    type: "order",
  },
  {
    id: "notif-2",
    title: "Đặt bàn mới",
    message:
      "Khách hàng Nguyễn Văn Hùng đặt bàn cho 4 người lúc 19:00 ngày mai",
    timestamp: "15 phút trước",
    read: false,
    type: "reservation",
  },
  {
    id: "notif-3",
    title: "Đơn đã thanh toán",
    message: "Bàn 8 đã thanh toán 2.450.000đ",
    timestamp: "1 giờ trước",
    read: true,
    type: "order",
  },
  {
    id: "notif-4",
    title: "Cập nhật hệ thống",
    message: "Phiên bản 1.2.0 đã sẵn sàng với báo cáo doanh thu cải tiến",
    timestamp: "3 giờ trước",
    read: true,
    type: "system",
  },
  {
    id: "notif-5",
    title: "Hủy đặt bàn",
    message: "Bàn 6 lúc 18:30 đã được khách hàng hủy",
    timestamp: "5 giờ trước",
    read: true,
    type: "reservation",
  },
];
