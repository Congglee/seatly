import { ThemeOption } from "@/constants/options";
import { cn } from "@/lib/utils";

export default function ThemePreview({
  variant,
}: {
  variant: ThemeOption["preview"];
}) {
  const base =
    "flex h-16 w-full overflow-hidden rounded-md border border-border/60";

  if (variant === "system") {
    return (
      <div className={base}>
        <div className="flex w-1/2 flex-col gap-1.5 bg-[#f7f4ec] p-2">
          <span className="h-1.5 w-8 rounded-full bg-[#cdb892]" />
          <span className="h-1.5 w-10 rounded-full bg-[#e2dcc9]" />
          <span className="h-1.5 w-6 rounded-full bg-[#e2dcc9]" />
        </div>
        <div className="flex w-1/2 flex-col gap-1.5 bg-[#16150f] p-2">
          <span className="h-1.5 w-8 rounded-full bg-[#cbb27e]" />
          <span className="h-1.5 w-10 rounded-full bg-[#33312a]" />
          <span className="h-1.5 w-6 rounded-full bg-[#33312a]" />
        </div>
      </div>
    );
  }

  const isDark = variant === "dark";

  return (
    <div className={cn(base, isDark ? "bg-[#16150f]" : "bg-[#f7f4ec]")}>
      <div className="flex flex-col gap-1.5 p-2">
        <span
          className={cn(
            "h-1.5 w-8 rounded-full",
            isDark ? "bg-[#cbb27e]" : "bg-[#cdb892]"
          )}
        />
        <span
          className={cn(
            "h-1.5 w-12 rounded-full",
            isDark ? "bg-[#33312a]" : "bg-[#e2dcc9]"
          )}
        />
        <span
          className={cn(
            "h-1.5 w-9 rounded-full",
            isDark ? "bg-[#33312a]" : "bg-[#e2dcc9]"
          )}
        />
      </div>
    </div>
  );
}
