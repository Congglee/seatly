import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

interface SidebarToggleProps {
  sidebarOpen: boolean;
  onSidebarToggle: (open: boolean) => void;
}

export default function SidebarToggle({
  sidebarOpen,
  onSidebarToggle,
}: SidebarToggleProps) {
  return (
    <div className="invisible md:visible absolute top-[12px] -right-[16px] z-20">
      <Button
        onClick={() => onSidebarToggle(!sidebarOpen)}
        className="rounded-md w-8 h-8"
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform ease-in-out duration-700",
            sidebarOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}
