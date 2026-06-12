import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import TablesView from "@/app/manage/tables/tables-view";

const breadcrumbs = [
  { name: "Trang chủ", href: "/" },
  { name: "Bàn", href: "/tables" },
];

export default function Tables() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Bàn"
      description="Quản lý bàn và mã QR gọi món"
      hasManageFilters={false}
    >
      <TablesView />
    </ManageContentLayout>
  );
}
