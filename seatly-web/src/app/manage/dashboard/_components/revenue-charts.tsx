import RevenueAreaChart from "@/app/manage/dashboard/_components/revenue-area-chart";
import RevenueBarChart from "@/app/manage/dashboard/_components/revenue-bar-chart";
import RevenueLineChart from "@/app/manage/dashboard/_components/revenue-line-chart";
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
import { formatCurrency } from "@/lib/utils/currency";
import { type ChartConfig } from "@/types/utils.type";
import { AreaChart, BarChart3, FileSearch, LineChart } from "lucide-react";
import { useState } from "react";

interface RevenueDataPoint {
  date: string;
  revenue: number;
}

type ChartType = "area" | "line" | "bar";

const chartConfigs: ChartConfig[] = [
  {
    dataKey: "revenue",
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
];

interface RevenueChartsProps {
  data: RevenueDataPoint[];
}

export default function RevenueCharts({ data }: RevenueChartsProps) {
  const [chartType, setChartType] = useState<ChartType>("area");

  const handleTypeChange = (type: ChartType) => {
    setChartType(type);
  };

  const valueFormatter = (value: number) => formatCurrency(value);

  return (
    <Card className="drop-shadow-sm h-full flex flex-col">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl line-clamp-1">Revenue</CardTitle>
          <CardDescription>Revenue chart by day</CardDescription>
        </div>
        <Select value={chartType} onValueChange={handleTypeChange}>
          <SelectTrigger className="lg:w-[180px] h-9 rounded-md px-3 border dark:border-neutral-600">
            <SelectValue placeholder="Select chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Area chart</p>
              </div>
            </SelectItem>
            <SelectItem value="line">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Line chart</p>
              </div>
            </SelectItem>
            <SelectItem value="bar">
              <div className="flex items-center">
                <BarChart3 className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Bar chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto scroll">
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              No data for the selected time period
            </p>
          </div>
        ) : (
          <div className="min-w-[500px] w-full">
            {chartType === "line" && (
              <RevenueLineChart
                data={data}
                xAxisKey="date"
                configs={chartConfigs}
                valueFormatter={valueFormatter}
              />
            )}
            {chartType === "area" && (
              <RevenueAreaChart
                data={data}
                xAxisKey="date"
                configs={chartConfigs}
                valueFormatter={valueFormatter}
              />
            )}
            {chartType === "bar" && (
              <RevenueBarChart
                data={data}
                xAxisKey="date"
                configs={chartConfigs}
                valueFormatter={valueFormatter}
              />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
