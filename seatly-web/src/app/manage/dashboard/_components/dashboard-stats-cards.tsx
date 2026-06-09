import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

interface DashboardStatsCardsProps {
  stats: {
    revenue: number;
    guests: number;
    orders: number;
    activeTables: number;
  };
}

export default function DashboardStatsCards({
  stats,
}: DashboardStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="drop-shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <div className="rounded-lg bg-blue-500/20 p-2">
            <DollarSign className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.revenue.toLocaleString("vi-VN")} đ
          </div>
        </CardContent>
      </Card>
      <Card className="drop-shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Guests</CardTitle>
          <div className="rounded-lg bg-green-500/20 p-2">
            <Users className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.guests}</div>
          <p className="text-xs text-muted-foreground">Call orders</p>
        </CardContent>
      </Card>
      <Card className="drop-shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Orders</CardTitle>
          <div className="rounded-lg bg-orange-500/20 p-2">
            <CreditCard className="h-4 w-4 text-orange-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.orders}</div>
          <p className="text-xs text-muted-foreground">Paid</p>
        </CardContent>
      </Card>
      <Card className="drop-shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tables in use</CardTitle>
          <div className="rounded-lg bg-red-500/20 p-2">
            <Activity className="h-4 w-4 text-red-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeTables}</div>
        </CardContent>
      </Card>
    </div>
  );
}
