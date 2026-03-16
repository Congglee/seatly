import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import TablesView from "@/app/manage/tables/tables-view";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Tables", href: "/tables" },
];

export default function Tables() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Tables"
      description="Manage tables"
      hasManageFilters={false}
    >
      <TablesView />
    </ManageContentLayout>
  );
}
