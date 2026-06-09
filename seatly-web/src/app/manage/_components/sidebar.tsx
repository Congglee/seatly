import Logo from "@/components/logo";
import Menu from "@/app/manage/_components/menu";
import SidebarToggle from "@/app/manage/_components/sidebar-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/providers/app-provider";
import Link from "next/link";

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full md:translate-x-0 transition-[width] ease-in-out duration-300",
        sidebarOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <SidebarToggle
        sidebarOpen={sidebarOpen}
        onSidebarToggle={toggleSidebar}
      />
      <div className="relative h-full flex flex-col px-3 py-4 overflow-hidden shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 [&_svg]:size-8",
            sidebarOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/manage/dashboard">
            <Logo sideBarOpen={sidebarOpen} />
          </Link>
        </Button>
        <Menu sidebarOpen={sidebarOpen} />
      </div>
    </aside>
  );
}
