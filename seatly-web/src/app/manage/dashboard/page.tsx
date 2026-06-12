import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import DashboardView from "@/app/manage/dashboard/dashboard-view";

const breadcrumbs = [
  { name: "Trang chủ", href: "/" },
  { name: "Tổng quan", href: "/manage/dashboard" },
];

export default function Dashboard() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Tổng quan"
      description="Theo dõi doanh thu, đơn đã thanh toán, bàn đang hoạt động và hiệu suất món ăn"
      hasManageFilters={false}
    >
      <DashboardView />
    </ManageContentLayout>
  );
}
