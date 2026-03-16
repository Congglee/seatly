import { DISH_RANKING_CHART_COLORS } from "@/constants/charts";
import { Separator } from "@/components/ui/separator";
import { type DishRankingDataPoint } from "@/types/utils.type";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DishRankingPieChartProps {
  data: DishRankingDataPoint[];
  height?: number;
}

export default function DishRankingPieChart({
  data,
  height = 350,
}: DishRankingPieChartProps) {
  return (
    <div className="flex h-full flex-col">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const entry = payload[0];
                const colorIndex = data.findIndex(
                  (dish) => dish.name === entry.name
                );

                return (
                  <div className="overflow-hidden rounded-lg border bg-background shadow-sm">
                    <div className="bg-muted px-3 py-2 text-sm text-muted-foreground">
                      {entry.name}
                    </div>
                    <Separator />
                    <div className="p-3">
                      <div className="flex items-center justify-between gap-x-4">
                        <div className="flex items-center gap-x-2">
                          <div
                            className="size-2 rounded-full"
                            style={{
                              backgroundColor:
                                DISH_RANKING_CHART_COLORS[
                                  colorIndex % DISH_RANKING_CHART_COLORS.length
                                ],
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            Orders
                          </span>
                        </div>
                        <span className="text-sm font-medium tabular-nums">
                          {entry.value}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            }}
          />
          <Pie
            data={data}
            dataKey="orders"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={120}
            strokeWidth={2}
            stroke="hsl(var(--background))"
            animationDuration={600}
            animationEasing="ease-out"
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell
                key={`dish-pie-cell-${index}`}
                fill={
                  DISH_RANKING_CHART_COLORS[
                    index % DISH_RANKING_CHART_COLORS.length
                  ]
                }
                className="transition-opacity duration-200 hover:opacity-80"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {data.map((dish, index) => (
          <div key={dish.id} className="flex items-center gap-x-2">
            <div
              className="size-2.5 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  DISH_RANKING_CHART_COLORS[
                    index % DISH_RANKING_CHART_COLORS.length
                  ],
              }}
            />
            <span className="text-xs text-muted-foreground">{dish.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
