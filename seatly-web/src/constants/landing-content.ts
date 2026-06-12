import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Coffee,
  LayoutGrid,
  QrCode,
  Soup,
  Store,
  UtensilsCrossed,
  Wallet,
  Zap,
} from "lucide-react";

export const LANDING_NAV_ITEMS = [
  { label: "Tính năng", href: "#tinh-nang" },
  { label: "Cách hoạt động", href: "#cach-hoat-dong" },
  { label: "Dành cho ai", href: "#danh-cho-ai" },
  { label: "FAQ", href: "#faq" },
] as const;

export const LANDING_TRUST_ITEMS = [
  { label: "Cập nhật order gần realtime" },
  { label: "Mobile-first cho khách" },
  { label: "QR riêng từng bàn" },
  { label: "Thanh toán QR tích hợp" },
  { label: "Tập trung quán nhỏ–vừa" },
] as const;

export const LANDING_PAIN_POINTS = [
  {
    title: "Khách chờ menu, gọi món lâu",
    description:
      "Giờ cao điểm khiến khách phải đợi nhân viên mang menu hoặc ghi order thủ công.",
    solution:
      "QR giúp khách xem menu ngay trên điện thoại và gửi order tại bàn.",
  },
  {
    title: "Ghi order tay dễ nhầm, sót bàn",
    description:
      "Sai số lượng, nhầm món hoặc không rõ order thuộc bàn nào là lỗi phổ biến.",
    solution:
      "Mỗi bàn có token QR riêng — order luôn gắn đúng bàn và guest session.",
  },
  {
    title: "Giờ đông khó phối hợp phục vụ",
    description:
      "Nhân viên khó nắm bắt hàng đợi, trạng thái món và bàn đang cần hỗ trợ.",
    solution:
      "Hàng đợi order theo trạng thái và dashboard vận hành giúp quản lý tập trung.",
  },
  {
    title: "POS lớn quá phức tạp, quá đắt",
    description:
      "Nhiều module không dùng tới nhưng vẫn tốn chi phí triển khai và đào tạo.",
    solution:
      "Seatly là web app gọn — tập trung đúng quy trình phục vụ tại bàn.",
  },
] as const;

export type LandingFlowStep = {
  step: number;
  title: string;
  description: string;
};

export type LandingFlowTab = {
  id: string;
  label: string;
  steps: LandingFlowStep[];
};

export const LANDING_HOW_IT_WORKS_TABS: LandingFlowTab[] = [
  {
    id: "guest",
    label: "Khách hàng",
    steps: [
      {
        step: 1,
        title: "Quét QR tại bàn",
        description: "Hệ thống nhận diện đúng bàn qua mã QR riêng.",
      },
      {
        step: 2,
        title: "Nhập tên",
        description:
          "Tạo guest session tạm thời — không cần đăng ký tài khoản.",
      },
      {
        step: 3,
        title: "Chọn món & gửi order",
        description:
          "Menu trực quan trên điện thoại, giỏ hàng và gửi order nhanh.",
      },
      {
        step: 4,
        title: "Theo dõi & thanh toán",
        description:
          "Xem trạng thái món gần realtime và thanh toán QR khi cần.",
      },
    ],
  },
  {
    id: "staff",
    label: "Nhân viên",
    steps: [
      {
        step: 1,
        title: "Đăng nhập backoffice",
        description: "Truy cập khu vực quản lý dành cho nhân viên quán.",
      },
      {
        step: 2,
        title: "Nhận order mới",
        description:
          "Order mới được highlight — cập nhật gần realtime qua Socket.",
      },
      {
        step: 3,
        title: "Cập nhật trạng thái món",
        description:
          "Chờ xử lý → Đang chế biến → Đã giao → Đã thanh toán theo từng line item.",
      },
    ],
  },
  {
    id: "owner",
    label: "Chủ quán",
    steps: [
      {
        step: 1,
        title: "Thiết lập bàn & menu",
        description: "Tạo bàn, in QR và quản lý món với trạng thái còn/hết/ẩn.",
      },
      {
        step: 2,
        title: "Quản lý nhân viên",
        description: "Phân quyền Owner và Employee cho đội ngũ vận hành.",
      },
      {
        step: 3,
        title: "Theo dõi vận hành",
        description:
          "Dashboard doanh thu, số order, bàn đang phục vụ và món bán chạy.",
      },
    ],
  },
];

export type LandingFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export const LANDING_FEATURES: LandingFeature[] = [
  {
    title: "QR menu thông minh",
    description:
      "Mỗi bàn một mã QR riêng — khách vào đúng menu, không nhầm order giữa các bàn.",
    icon: QrCode,
    className: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Order realtime",
    description:
      "Khách và nhân viên thấy cập nhật trạng thái gần như tức thì khi có thay đổi.",
    icon: Zap,
  },
  {
    title: "Quản lý món linh hoạt",
    description: "Đánh dấu có sẵn, tạm hết hoặc ẩn món khỏi menu khi cần.",
    icon: UtensilsCrossed,
  },
  {
    title: "Snapshot giá món",
    description:
      "Lưu đúng giá và thông tin món tại thời điểm khách đặt — dữ liệu lịch sử chính xác.",
    icon: Camera,
  },
  {
    title: "Dashboard vận hành",
    description:
      "Doanh thu, số khách, order và bàn đang phục vụ — góc nhìn tổng quan cho chủ quán.",
    icon: LayoutGrid,
    className: "md:col-span-2",
  },
  {
    title: "Thanh toán QR",
    description:
      "Khách quét chuyển khoản, hệ thống theo dõi trạng thái thanh toán tự động.",
    icon: Wallet,
  },
];

export const LANDING_SHOWCASE_ITEMS = [
  {
    id: "menu",
    title: "Menu khách trên điện thoại",
    description:
      "Giao diện mobile-first — chọn món, chỉnh số lượng và gửi order nhanh.",
    badge: "Guest · Menu",
  },
  {
    id: "orders",
    title: "Theo dõi order của khách",
    description:
      "Trạng thái rõ ràng: chờ xử lý, đang chế biến, đã giao và đã thanh toán.",
    badge: "Guest · Orders",
  },
  {
    id: "manage",
    title: "Hàng đợi order cho nhân viên",
    description:
      "Lọc theo trạng thái, cập nhật một chạm và nhận order mới ngay lập tức.",
    badge: "Manage · Orders",
  },
  {
    id: "dashboard",
    title: "Tổng quan vận hành",
    description:
      "KPI doanh thu, số order, bàn đang phục vụ và biểu đồ món bán chạy.",
    badge: "Manage · Dashboard",
  },
] as const;

export const LANDING_COMPARISON_ROWS = [
  {
    criteria: "Triển khai",
    seatly: "Nhanh, web-based, không cần cài phần mềm riêng",
    legacy: "Phức tạp, thường cần training và thiết bị bổ sung",
  },
  {
    criteria: "Chi phí & quy mô",
    seatly: "Phù hợp quán nhỏ–vừa, một chi nhánh",
    legacy: "Chi phí cao hơn, nhiều module vượt nhu cầu thực tế",
  },
  {
    criteria: "Trọng tâm",
    seatly: "QR ordering tại bàn, phục vụ và thanh toán đơn giản",
    legacy: "Toàn bộ vận hành FnB / POS ecosystem",
  },
  {
    criteria: "Trải nghiệm khách",
    seatly: "Quét QR trên trình duyệt — không cần tải app",
    legacy: "Tùy nền tảng, đôi khi yêu cầu app hoặc thiết bị",
  },
] as const;

export const LANDING_USE_CASES = [
  {
    title: "Quán cà phê & trà sữa",
    description:
      "Giảm chen lấn quầy — khách tự gọi món tại bàn, nhân viên tập trung pha chế.",
    icon: Coffee,
  },
  {
    title: "Quán ăn vặt & gia đình",
    description:
      "Giờ đông vẫn rõ order từng bàn, hạn chế nhầm món và sót món khi ghi tay.",
    icon: Soup,
  },
  {
    title: "Quán nước quy mô nhỏ",
    description:
      "Chủ quán vừa vận hành vừa theo dõi dashboard gọn — không cần hệ thống cồng kềnh.",
    icon: Store,
  },
] as const;

export const LANDING_FAQ_ITEMS = [
  {
    question: "Khách có cần tải app không?",
    answer:
      "Không. Khách chỉ cần quét mã QR tại bàn và mở menu trên trình duyệt điện thoại.",
  },
  {
    question: "Một bàn có nhiều khách cùng order được không?",
    answer:
      "Có. Mỗi khách nhập tên để tạo guest session riêng, gắn với cùng một bàn.",
  },
  {
    question: "Có bắt buộc máy POS hoặc máy in không?",
    answer:
      "Không bắt buộc ở giai đoạn hiện tại. Seatly tập trung vào web app và quy trình tại bàn.",
  },
  {
    question: "Thanh toán hoạt động thế nào?",
    answer:
      "Khách có thể thanh toán qua QR chuyển khoản. Nhân viên cũng có thể xác nhận trạng thái thanh toán trên hệ thống.",
  },
  {
    question: "Seatly hỗ trợ nhiều chi nhánh không?",
    answer:
      "Giai đoạn hiện tại tập trung một quán, một phạm vi vận hành — phù hợp mô hình nhỏ đến vừa.",
  },
  {
    question: "Bắt đầu sử dụng như thế nào?",
    answer:
      "Đăng nhập quản lý, thiết lập bàn và món, in QR dán tại bàn — khách có thể order ngay.",
  },
] as const;
