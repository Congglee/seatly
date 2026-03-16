import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import DashboardView from "@/app/manage/dashboard/dashboard-view";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/manage/dashboard" },
];

export default function Dashboard() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Dashboard"
      description="Track revenue, paid orders, active tables, and dish performance"
      hasManageFilters={false}
    >
      <DashboardView />
    </ManageContentLayout>
  );
}
