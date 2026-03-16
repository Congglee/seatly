import DishRankingBarChart from "@/app/manage/dashboard/_components/dish-ranking-bar-chart";
import DishRankingPieChart from "@/app/manage/dashboard/_components/dish-ranking-pie-chart";
import { type DishRankingDataPoint } from "@/types/utils.type";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart3, FileSearch, PieChart as PieChartIcon } from "lucide-react";
import { useState } from "react";

type DishChartType = "bar" | "pie";

interface DishRankingChartsProps {
  data: DishRankingDataPoint[];
}

export default function DishRankingCharts({ data }: DishRankingChartsProps) {
  const [chartType, setChartType] = useState<DishChartType>("bar");

  const handleTypeChange = (type: DishChartType) => {
    setChartType(type);
  };

  return (
    <Card className="drop-shadow-sm h-full flex flex-col">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <div className="space-y-1">
          <CardTitle className="line-clamp-1 text-xl">Dish ranking</CardTitle>
          <CardDescription>Most called</CardDescription>
        </div>
        <Select value={chartType} onValueChange={handleTypeChange}>
          <SelectTrigger className="h-9 rounded-md border px-3 dark:border-neutral-600 lg:w-[180px]">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart3 className="mr-2 size-4 shrink-0" />
                <p className="line-clamp-1">Bar chart</p>
              </div>
            </SelectItem>
            <SelectItem value="pie">
              <div className="flex items-center">
                <PieChartIcon className="mr-2 size-4 shrink-0" />
                <p className="line-clamp-1">Pie chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="flex-1">
        {data.length === 0 ? (
          <div className="flex h-[350px] w-full flex-col items-center justify-center gap-y-4">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No data for the selected time period
            </p>
          </div>
        ) : chartType === "bar" ? (
          <DishRankingBarChart data={data} />
        ) : (
          <DishRankingPieChart data={data} />
        )}
      </CardContent>
    </Card>
  );
}
