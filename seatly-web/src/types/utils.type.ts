export interface ChartConfig {
  dataKey: string;
  label: string;
  color: string;
}

export interface DishRankingDataPoint {
  id: string;
  name: string;
  orders: number;
  image: string;
  description: string;
}
