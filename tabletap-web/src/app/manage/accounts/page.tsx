import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import AccountsView from "@/app/manage/accounts/accounts-view";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Accounts", href: "/manage/accounts" },
];

export default function AccountsPage() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Accounts"
      description="Manage staff accounts and access roles"
      hasManageFilters={false}
    >
      <AccountsView />
    </ManageContentLayout>
  );
}
