import ChartTooltip from "@/app/manage/dashboard/_components/chart-tooltip";
import { formatCompactCurrency } from "@/lib/utils/currency";
import { type ChartConfig } from "@/types/utils.type";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const getGradientId = (dataKey: string) => `revenue-bar-gradient-${dataKey}`;

interface RevenueBarChartProps {
  data: any[];
  xAxisKey: string;
  configs: ChartConfig[];
  height?: number;
  xAxisFormatter?: (value: string) => string;
  valueFormatter?: (value: number, dataKey: string) => string;
}

export default function RevenueBarChart({
  data,
  xAxisKey,
  configs,
  height = 350,
  xAxisFormatter,
  valueFormatter,
}: RevenueBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data}>
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
              <stop offset="0%" stopColor={config.color} stopOpacity={1} />
              <stop offset="100%" stopColor={config.color} stopOpacity={0.6} />
            </linearGradient>
          ))}
        </defs>
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
          cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
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
          <Bar
            key={config.dataKey}
            dataKey={config.dataKey}
            fill={`url(#${getGradientId(config.dataKey)})`}
            radius={[6, 6, 0, 0]}
            animationDuration={600}
            animationEasing="ease-out"
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
