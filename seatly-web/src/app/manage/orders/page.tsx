import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import OrdersView from "@/app/manage/orders/orders-view";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Orders", href: "/orders" },
];

export default function Orders() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Orders"
      description="Manage orders"
      hasManageFilters={false}
    >
      <OrdersView />
    </ManageContentLayout>
  );
}
