import SheetMenu from "@/app/manage/_components/sheet-menu";
import ModeToggle from "@/components/mode-toggle";
import Notifications from "@/components/notifications";
import UserNav from "@/components/user-nav";

export default function ManageNav() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-backdrop-filter:bg-background/60 dark:shadow-muted">
      <div className="px-4 sm:px-8 flex h-14 items-center">
        <div className="flex items-center space-x-4 md:space-x-0">
          <SheetMenu />
        </div>
        <div className="flex flex-1 items-center space-x-3 justify-end">
          <Notifications />
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
