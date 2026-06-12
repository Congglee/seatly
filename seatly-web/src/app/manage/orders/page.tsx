import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import OrdersView from "@/app/manage/orders/orders-view";

const breadcrumbs = [
  { name: "Trang chủ", href: "/" },
  { name: "Đơn hàng", href: "/orders" },
];

export default function Orders() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Đơn hàng"
      description="Quản lý đơn gọi món"
      hasManageFilters={false}
    >
      <OrdersView />
    </ManageContentLayout>
  );
}
