import { Badge } from "@/components/ui/badge";
import { TABLE_STATUS_CONFIG } from "@/constants/table-status";
import { cn } from "@/lib/utils";
import type { TableStatusType } from "@/schemas/table.schema";

interface TableStatusBadgeProps {
  status: TableStatusType | string;
  className?: string;
  showIcon?: boolean;
}

export default function TableStatusBadge({
  status,
  className,
  showIcon = true,
}: TableStatusBadgeProps) {
  const config = TABLE_STATUS_CONFIG[status];

  if (!config) {
    return (
      <span className={cn("text-xs text-muted-foreground", className)}>
        {status}
      </span>
    );
  }

  const StatusIcon = config.icon;

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 whitespace-nowrap px-2 py-0.5 font-medium transition-colors",
        config.className,
        className
      )}
    >
      {showIcon && <StatusIcon className="size-3.5" />}
      {config.label}
    </Badge>
  );
}
