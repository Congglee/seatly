import dishApiRequest from "@/apis/dish.api";
import {
  type DishListQueryType,
  type UpdateDishBodyType,
} from "@/schemas/dish.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDishListQuery = (params: DishListQueryType) => {
  return useQuery({
    queryFn: () => dishApiRequest.getDishList(params),
    queryKey: ["dishes", params],
  });
};

export const useAddDishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dishApiRequest.addDish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishes"],
      });
    },
  });
};

export const useGetDishDetailQuery = ({
  id,
  enabled,
}: {
  id: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["dishes", id],
    queryFn: () => dishApiRequest.getDishDetail(id),
    enabled,
  });
};

export const useUpdateDishMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateDishBodyType & { id: string }) =>
      dishApiRequest.updateDish(id, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishes"],
      });
    },
  });
};

export const useDeleteDishMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dishApiRequest.deleteDish,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dishes"],
      });
    },
  });
};
