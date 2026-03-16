import dashboardApiRequest from "@/apis/dashboard.api";
import { DashboardIndicatorQueryParamsType } from "@/schemas/dashboard.schema";
import { useQuery } from "@tanstack/react-query";

export const useDashboardIndicatorQuery = (
  queryParams: DashboardIndicatorQueryParamsType
) => {
  return useQuery({
    queryFn: () => dashboardApiRequest.getDashboardIndicators(queryParams),
    queryKey: ["dashboard-indicators", queryParams],
  });
};
