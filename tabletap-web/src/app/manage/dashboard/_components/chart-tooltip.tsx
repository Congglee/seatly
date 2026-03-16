import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/currency";
import { type ChartConfig } from "@/types/utils.type";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: Record<string, unknown>;
  }>;
  labelKey: string;
  labelFormatter?: (value: string) => string;
  valueFormatter?: (value: number, dataKey: string) => string;
  configs: ChartConfig[];
}

export default function ChartTooltip({
  active,
  payload,
  labelKey,
  labelFormatter,
  valueFormatter,
  configs,
}: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const labelValue = payload[0]?.payload?.[labelKey] as string;
  const formattedLabel = labelFormatter
    ? labelFormatter(labelValue)
    : labelValue;

  const configMap = new Map(configs.map((c) => [c.dataKey, c]));

  return (
    <div className="rounded-lg border bg-background shadow-sm overflow-hidden">
      <div className="px-3 py-2 bg-muted text-sm text-muted-foreground">
        {formattedLabel}
      </div>
      <Separator />
      <div className="p-3 space-y-1.5">
        {payload.map((entry, index) => {
          const config = configMap.get(entry.dataKey);
          if (!config) return null;

          const formattedValue = valueFormatter
            ? valueFormatter(entry.value, entry.dataKey)
            : formatCurrency(entry.value);

          return (
            <div
              key={index}
              className="flex items-center justify-between gap-x-4"
            >
              <div className="flex items-center gap-x-2">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {config.label}
                </span>
              </div>
              <span className="text-sm font-medium">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
