import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import SecuritySettingsForm from "@/app/manage/settings/_components/security-settings-form";
import SettingsShell from "@/app/manage/settings/_components/settings-shell";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Settings", href: "/manage/settings" },
  { name: "Security", href: "/manage/settings/security" },
];

export default function SecuritySettingsPage() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Security"
      description="Protect your account with a fresh password"
      hasManageFilters={false}
    >
      <SettingsShell>
        <SecuritySettingsForm />
      </SettingsShell>
    </ManageContentLayout>
  );
}
