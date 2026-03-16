import http from "@/lib/http";
import {
  DashboardIndicatorQueryParamsType,
  DashboardIndicatorResType,
} from "@/schemas/dashboard.schema";
import queryString from "query-string";

const prefix = "/indicators";

const dashboardApiRequest = {
  getDashboardIndicators: (queryParams: DashboardIndicatorQueryParamsType) =>
    http.get<DashboardIndicatorResType>(
      `${prefix}/dashboard?` +
        queryString.stringify({
          fromDate: queryParams.fromDate.toISOString(),
          toDate: queryParams.toDate.toISOString(),
        })
    ),
};

export default dashboardApiRequest;
