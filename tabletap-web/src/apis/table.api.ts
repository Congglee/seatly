import http from "@/lib/http";
import type {
  CreateTableBodyType,
  TableResType,
  TableListQueryType,
  TableListResType,
  UpdateTableBodyType,
} from "@/schemas/table.schema";
import qs from "query-string";

const tableApiRequest = {
  getTableList: (params: TableListQueryType) =>
    http.get<TableListResType>(
      "/tables?" +
        qs.stringify({
          page: params.page,
          limit: params.limit,
        })
    ),

  addTable: (body: CreateTableBodyType) =>
    http.post<TableResType>("tables", body),

  getTableDetail: (id: number) => http.get<TableResType>(`tables/${id}`),

  updateTable: (id: number, body: UpdateTableBodyType) =>
    http.put<TableResType>(`tables/${id}`, body),

  deleteTable: (id: number) => http.delete<TableResType>(`tables/${id}`),
};

export default tableApiRequest;
