import ManageContentLayout from "@/app/manage/_components/layouts/manage-content-layout";
import DishesView from "@/app/manage/dishes/dishes-view";

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Dishes", href: "/manage/dishes" },
];

export default function DishesPage() {
  return (
    <ManageContentLayout
      breadcrumbs={breadcrumbs}
      heading="Dishes"
      description="Manage menu dishes"
      hasManageFilters={false}
    >
      <DishesView />
    </ManageContentLayout>
  );
}
