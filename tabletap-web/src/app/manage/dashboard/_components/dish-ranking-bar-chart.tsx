import { type DishRankingDataPoint } from "@/types/utils.type";
import { Separator } from "@/components/ui/separator";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DishRankingBarChartProps {
  data: DishRankingDataPoint[];
  height?: number;
}

export default function DishRankingBarChart({
  data,
  height = 350,
}: DishRankingBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="dishBarGradient" x1="0" y1="0" x2="1" y2="0">
            <stop
              offset="0%"
              stopColor="hsl(var(--chart-1))"
              stopOpacity={0.5}
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--chart-1))"
              stopOpacity={1}
            />
          </linearGradient>
        </defs>
        <XAxis type="number" hide />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          axisLine={false}
          width={100}
          orientation="left"
          style={{ fontSize: "12px" }}
          className="fill-muted-foreground"
          tick={{ fill: "currentColor" }}
        />
        <Tooltip
          cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
                  <div className="bg-muted px-3 py-2 text-sm text-muted-foreground">
                    {payload[0].payload.name}
                  </div>
                  <Separator />
                  <div className="p-3">
                    <div className="flex items-center justify-between gap-x-4">
                      <div className="flex items-center gap-x-2">
                        <div className="size-2 rounded-full bg-[hsl(var(--chart-1))]" />
                        <span className="text-sm text-muted-foreground">
                          Orders
                        </span>
                      </div>
                      <span className="text-sm font-medium tabular-nums">
                        {payload[0].value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          }}
        />
        <Bar
          dataKey="orders"
          fill="url(#dishBarGradient)"
          radius={[0, 6, 6, 0]}
          animationDuration={600}
          animationEasing="ease-out"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
