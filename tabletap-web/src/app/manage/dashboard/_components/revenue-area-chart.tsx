import ChartTooltip from "@/app/manage/dashboard/_components/chart-tooltip";
import { formatCompactCurrency } from "@/lib/utils/currency";
import type { ChartConfig } from "@/types/utils.type";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const getGradientId = (dataKey: string) => `revenue-area-gradient-${dataKey}`;

interface RevenueAreaChartProps {
  data: any[];
  xAxisKey: string;
  configs: ChartConfig[];
  height?: number;
  xAxisFormatter?: (value: string) => string;
  valueFormatter?: (value: number, dataKey: string) => string;
}

export default function RevenueAreaChart({
  data,
  xAxisKey,
  configs,
  height = 350,
  xAxisFormatter,
  valueFormatter,
}: RevenueAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          strokeOpacity={0.2}
          vertical={false}
        />
        <defs>
          {configs.map((config) => (
            <linearGradient
              key={config.dataKey}
              id={getGradientId(config.dataKey)}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={config.color} stopOpacity={0.4} />
              <stop offset="60%" stopColor={config.color} stopOpacity={0.15} />
              <stop offset="100%" stopColor={config.color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
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
          <Area
            key={config.dataKey}
            type="monotone"
            dataKey={config.dataKey}
            stroke={config.color}
            strokeWidth={2}
            fill={`url(#${getGradientId(config.dataKey)})`}
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
      </AreaChart>
    </ResponsiveContainer>
  );
}
