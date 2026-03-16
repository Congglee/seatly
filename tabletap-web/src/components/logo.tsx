import { cn } from "@/lib/utils";
import { ConciergeBell } from "lucide-react";

interface LogoProps {
  wrapperClassName?: string;
  logoClassName?: string;
  sideBarOpen?: boolean;
  textClassName?: string;
}

export default function Logo({
  wrapperClassName,
  logoClassName,
  sideBarOpen,
  textClassName,
}: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", wrapperClassName)}>
      <ConciergeBell className={cn("size-8 text-primary", logoClassName)} />
      <h3
        className={cn(
          "bg-gradient-to-r from-primary to-[#f97316] bg-clip-text text-2xl font-semibold leading-tight tracking-tighter text-transparent transition-[transform,opacity,display] ease-in-out duration-300 whitespace-nowrap",
          textClassName,
          sideBarOpen === false
            ? "-translate-x-96 opacity-0 hidden"
            : "translate-x-0 opacity-100"
        )}
      >
        TableTap
      </h3>
    </div>
  );
}
