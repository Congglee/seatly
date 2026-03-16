"use client";

import ManageFooter from "@/app/manage/_components/manage-footer";
import Sidebar from "@/app/manage/_components/sidebar";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/providers/app-provider";

interface ManagePanelLayoutProps {
  children: React.ReactNode;
}

export default function ManagePanelLayout({
  children,
}: ManagePanelLayoutProps) {
  const { sidebarOpen } = useAppStore();

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh-56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebarOpen === false ? "md:ml-[90px]" : "md:ml-72"
        )}
      >
        {children}
      </main>
      <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          sidebarOpen === false ? "md:ml-[90px]" : "md:ml-72"
        )}
      >
        <ManageFooter />
      </footer>
    </>
  );
}
