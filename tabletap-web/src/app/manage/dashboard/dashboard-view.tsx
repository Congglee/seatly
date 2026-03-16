"use client";

import DashboardFilters from "@/app/manage/dashboard/_components/dashboard-filters";
import DashboardSkeleton from "@/app/manage/dashboard/_components/dashboard-skeleton";
import DashboardStatsCards from "@/app/manage/dashboard/_components/dashboard-stats-cards";
import DishRankingCharts from "@/app/manage/dashboard/_components/dish-ranking-charts";
import RevenueCharts from "@/app/manage/dashboard/_components/revenue-charts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/providers/app-provider";
import { useDashboardIndicatorQuery } from "@/queries/use-dashboard";
import { useQueryClient } from "@tanstack/react-query";
import { endOfDay, startOfDay } from "date-fns";
import { useEffect, useMemo, useState } from "react";

const getDefaultDateRange = () => ({
  fromDate: startOfDay(new Date()),
  toDate: endOfDay(new Date()),
});

const parseDateInput = (value: string, fallback: Date) => {
  const nextDate = new Date(value);

  return Number.isNaN(nextDate.getTime()) ? fallback : nextDate;
};

export default function DashboardView() {
  const [fromDate, setFromDate] = useState(
    () => getDefaultDateRange().fromDate
  );
  const [toDate, setToDate] = useState(() => getDefaultDateRange().toDate);
  const socket = useAppStore((state) => state.socket);
  const queryClient = useQueryClient();

  const dashboardQuery = useDashboardIndicatorQuery({ fromDate, toDate });
  const dashboardData = dashboardQuery.data?.payload.data;

  useEffect(() => {
    const refreshDashboard = () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard-indicators"],
      });
    };

    socket?.on("new-order", refreshDashboard);
    socket?.on("update-order", refreshDashboard);
    socket?.on("payment", refreshDashboard);

    return () => {
      socket?.off("new-order", refreshDashboard);
      socket?.off("update-order", refreshDashboard);
      socket?.off("payment", refreshDashboard);
    };
  }, [queryClient, socket]);

  const stats = useMemo(
    () => ({
      revenue: dashboardData?.revenue ?? 0,
      guests: dashboardData?.guestCount ?? 0,
      orders: dashboardData?.orderCount ?? 0,
      activeTables: dashboardData?.servingTableCount ?? 0,
    }),
    [dashboardData]
  );

  const dishRankingData = useMemo(
    () =>
      (dashboardData?.dishIndicator ?? []).map((dish) => ({
        id: dish.id,
        name: dish.name,
        orders: dish.successOrders,
        image: dish.image,
        description: dish.description,
      })),
    [dashboardData]
  );

  const handleResetDateFilter = () => {
    const nextRange = getDefaultDateRange();
    setFromDate(nextRange.fromDate);
    setToDate(nextRange.toDate);
  };

  const handleFromDateChange = (value: string) => {
    const nextFromDate = parseDateInput(value, fromDate);

    setFromDate(nextFromDate);
    if (nextFromDate > toDate) {
      setToDate(nextFromDate);
    }
  };

  const handleToDateChange = (value: string) => {
    const nextToDate = parseDateInput(value, toDate);

    setToDate(nextToDate);
    if (nextToDate < fromDate) {
      setFromDate(nextToDate);
    }
  };

  return (
    <div className="mt-8 space-y-8">
      <DashboardFilters
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={handleFromDateChange}
        onToDateChange={handleToDateChange}
        onReset={handleResetDateFilter}
      />

      {dashboardQuery.isPending && !dashboardData ? (
        <DashboardSkeleton />
      ) : dashboardQuery.isError && !dashboardData ? (
        <Card className="drop-shadow-sm">
          <CardHeader>
            <CardTitle>Dashboard unavailable</CardTitle>
            <CardDescription>
              Could not load analytics data for the selected time range.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="button" onClick={() => dashboardQuery.refetch()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <DashboardStatsCards stats={stats} />
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
              <RevenueCharts data={dashboardData?.revenueByDate ?? []} />
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
              <DishRankingCharts data={dishRankingData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
