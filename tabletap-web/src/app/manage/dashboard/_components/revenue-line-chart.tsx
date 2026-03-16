import ChartTooltip from "@/app/manage/dashboard/_components/chart-tooltip";
import { formatCompactCurrency } from "@/lib/utils/currency";
import { type ChartConfig } from "@/types/utils.type";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface RevenueLineChartProps {
  data: any[];
  xAxisKey: string;
  configs: ChartConfig[];
  height?: number;
  xAxisFormatter?: (value: string) => string;
  valueFormatter?: (value: number, dataKey: string) => string;
}

export default function RevenueLineChart({
  data,
  xAxisKey,
  configs,
  height = 350,
  xAxisFormatter,
  valueFormatter,
}: RevenueLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          strokeOpacity={0.2}
          vertical={false}
        />
        <XAxis
          dataKey={xAxisKey}
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={xAxisFormatter}
          tickMargin={16}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => formatCompactCurrency(value)}
          width={45}
        />
        <Tooltip
          content={
            <ChartTooltip
              labelKey={xAxisKey}
              labelFormatter={xAxisFormatter}
              valueFormatter={valueFormatter}
              configs={configs}
            />
          }
        />
        {configs.map((config) => (
          <Line
            key={config.dataKey}
            type="monotone"
            dataKey={config.dataKey}
            stroke={config.color}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: config.color,
              fill: "hsl(var(--background))",
            }}
            animationDuration={800}
            animationEasing="ease-out"
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
