import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import AccountsView from "@/app/manage/accounts/accounts-view";

const breadcrumbs = [
  { name: "Trang chủ", href: "/" },
  { name: "Tài khoản", href: "/manage/accounts" },
];

export default function Accounts() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Tài khoản"
      description="Quản lý tài khoản nhân viên và quyền truy cập"
      hasManageFilters={false}
    >
      <AccountsView />
    </ManageContentLayout>
  );
}
