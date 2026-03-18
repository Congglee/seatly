import tableApiRequest from "@/apis/table.api";
import {
  type UpdateTableBodyType,
  type TableListQueryType,
} from "@/schemas/table.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useTableListQuery = (params: TableListQueryType) => {
  return useQuery({
    queryFn: () => tableApiRequest.getTableList(params),
    queryKey: ["tables", params],
  });
};

export const useAddTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tableApiRequest.addTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });
};

export const useGetTableDetailQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["tables", id],
    queryFn: () => tableApiRequest.getTableDetail(id),
    enabled,
  });
};

export const useUpdateTableMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateTableBodyType & { id: number }) =>
      tableApiRequest.updateTable(id, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });
};

export const useDeleteTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tableApiRequest.deleteTable,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tables"],
      });
    },
  });
};
