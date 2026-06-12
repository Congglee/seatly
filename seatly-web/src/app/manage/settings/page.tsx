import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import SettingsView from "@/app/manage/settings/settings-view";

const breadcrumbs = [
  { name: "Trang chủ", href: "/" },
  { name: "Cài đặt", href: "/manage/settings" },
];

export default function Settings() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Cài đặt"
      description="Quản lý hồ sơ, bảo mật và tùy chọn không gian làm việc"
      hasManageFilters={false}
    >
      <SettingsView />
    </ManageContentLayout>
  );
}
