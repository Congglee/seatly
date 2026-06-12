import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import DishesView from "@/app/manage/dishes/dishes-view";

const breadcrumbs = [
  { name: "Trang chủ", href: "/" },
  { name: "Món ăn", href: "/manage/dishes" },
];

export default function Dishes() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Món ăn"
      description="Quản lý các món trong thực đơn"
      hasManageFilters={false}
    >
      <DishesView />
    </ManageContentLayout>
  );
}
