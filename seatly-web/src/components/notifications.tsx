import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { mockNotifications } from "@/constants/mock-data";

export default function Notifications() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative transition-all duration-200 hover:bg-accent/80 hover:border-accent-foreground/20 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`Thông báo${
            unreadCount > 0 ? `, ${unreadCount} chưa đọc` : ""
          }`}
        >
          <Bell className="h-[1.2rem] w-[1.2rem]" strokeWidth={1.5} />
          {unreadCount > 0 && (
            <span
              className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground px-1"
              aria-hidden
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={8} className="w-80 p-0">
        <div className="border-b px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">Thông báo</h3>
        </div>
        <ScrollArea className="h-[280px]">
          <div className="flex flex-col gap-0.5 p-2">
            {mockNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Bell
                  className="h-10 w-10 text-muted-foreground/50 mb-2"
                  strokeWidth={1.5}
                />
                <p className="text-sm text-muted-foreground">
                  Chưa có thông báo nào
                </p>
              </div>
            ) : (
              mockNotifications.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex flex-col gap-0.5 px-3 py-2.5 rounded-md transition-colors cursor-default",
                    !item.read && "bg-muted/60"
                  )}
                >
                  <p className="text-sm font-medium text-foreground">
                    {item.title}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {item.message}
                  </p>
                  <span className="text-[11px] text-muted-foreground/80 mt-0.5">
                    {item.timestamp}
                  </span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
