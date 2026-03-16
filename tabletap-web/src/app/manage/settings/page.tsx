import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import SettingsOverview from "@/app/manage/settings/_components/settings-overview";
import SettingsShell from "@/app/manage/settings/_components/settings-shell";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Settings", href: "/manage/settings" },
];

export default function SettingsPage() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Settings"
      description="Manage your profile and security preferences"
      hasManageFilters={false}
    >
      <SettingsShell>
        <SettingsOverview />
      </SettingsShell>
    </ManageContentLayout>
  );
}
