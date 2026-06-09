import http from "@/lib/http";
import type {
  CreateDishBodyType,
  DishListQueryType,
  DishListResType,
  DishResType,
  UpdateDishBodyType,
} from "@/schemas/dish.schema";
import qs from "query-string";

const dishApiRequest = {
  getDishList: (params: DishListQueryType) =>
    http.get<DishListResType>(
      "/dishes?" +
        qs.stringify({
          page: params.page,
          limit: params.limit,
        })
    ),

  addDish: (body: CreateDishBodyType) => http.post<DishResType>("dishes", body),

  getDishDetail: (id: string) => http.get<DishResType>(`dishes/${id}`),

  updateDish: (id: string, body: UpdateDishBodyType) =>
    http.put<DishResType>(`dishes/${id}`, body),

  deleteDish: (id: string) => http.delete<DishResType>(`dishes/${id}`),
};

export default dishApiRequest;
