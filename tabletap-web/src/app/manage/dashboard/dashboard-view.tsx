"use client";

import DashboardStatsCards from "@/app/manage/dashboard/_components/dashboard-stats-cards";
import DishRankingCharts from "@/app/manage/dashboard/_components/dish-ranking-charts";
import RevenueCharts from "@/app/manage/dashboard/_components/revenue-charts";
import {
  mockDashboardStats,
  mockDishRanking,
  mockRevenueData,
} from "@/constants/mock-data";

export default function DashboardView() {
  return (
    <div className="mt-8 space-y-8">
      <DashboardStatsCards stats={mockDashboardStats} />
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <RevenueCharts data={mockRevenueData} />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <DishRankingCharts data={mockDishRanking} />
        </div>
      </div>
    </div>
  );
}
