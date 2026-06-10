import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
  footer,
  className,
}: SettingsSectionProps) {
  return (
    <section
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
    >
      <header className="flex items-start gap-3 border-b px-5 py-4 sm:px-6">
        {Icon ? (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/15 text-primary">
            <Icon className="size-4" />
          </span>
        ) : null}
        <div className="space-y-0.5">
          <h3 className="text-base font-medium leading-none tracking-tight">
            {title}
          </h3>
          {description ? (
            <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {description}
            </p>
          ) : null}
        </div>
      </header>
      <div className="px-5 py-5 sm:px-6">{children}</div>
      {footer ? (
        <footer className="flex flex-col items-stretch gap-2 border-t bg-muted/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}
