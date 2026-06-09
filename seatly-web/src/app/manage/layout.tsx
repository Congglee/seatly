import ManagePanelLayout from "@/app/manage/_components/layouts/manage-panel-layout";

interface ManageLayoutProps {
  children: React.ReactNode;
}

export default function ManageLayout({ children }: ManageLayoutProps) {
  return <ManagePanelLayout>{children}</ManagePanelLayout>;
}
