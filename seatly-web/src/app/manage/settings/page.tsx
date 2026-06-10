import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import SettingsView from "@/app/manage/settings/settings-view";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Settings", href: "/manage/settings" },
];

export default function Settings() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Settings"
      description="Manage your profile, security, and workspace preferences"
      hasManageFilters={false}
    >
      <SettingsView />
    </ManageContentLayout>
  );
}
