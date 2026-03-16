import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import ProfileSettingsForm from "@/app/manage/settings/_components/profile-settings-form";
import SettingsShell from "@/app/manage/settings/_components/settings-shell";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Settings", href: "/manage/settings" },
  { name: "Profile", href: "/manage/settings/profile" },
];

export default function ProfileSettingsPage() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Profile"
      description="Update your identity and avatar used across the system"
      hasManageFilters={false}
    >
      <SettingsShell>
        <ProfileSettingsForm />
      </SettingsShell>
    </ManageContentLayout>
  );
}
