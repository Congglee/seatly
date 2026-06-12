import { DishStatusValues } from "@/constants/type";
import { z } from "zod";

export const DishStatus = z.enum(DishStatusValues);

export type DishStatusType = z.TypeOf<typeof DishStatus>;

export const CreateDishBody = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập tên món")
    .max(256, "Tên món không được vượt quá 256 ký tự"),
  price: z.coerce
    .number()
    .positive({ message: "Giá món phải lớn hơn 0" }),
  description: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập mô tả")
    .max(10000, "Mô tả không được vượt quá 10000 ký tự"),
  image: z
    .string()
    .trim()
    .min(1, "Vui lòng chọn ảnh món")
    .url({ message: "Đường dẫn ảnh không hợp lệ" }),
  status: z.enum(DishStatusValues).optional(),
});

export type CreateDishBodyType = z.TypeOf<typeof CreateDishBody>;

export const DishSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  image: z.string(),
  status: z.enum(DishStatusValues),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type DishType = z.TypeOf<typeof DishSchema>;

export const DishRes = z.object({
  data: DishSchema,
  message: z.string(),
});

export type DishResType = z.TypeOf<typeof DishRes>;

export const DishListQuery = z.object({
  page: z.coerce.number().positive().lte(10000).default(1),
  limit: z.coerce.number().positive().lte(10000).default(10),
});

export type DishListQueryType = z.TypeOf<typeof DishListQuery>;

export const DishListRes = z.object({
  data: z.object({
    items: z.array(DishSchema),
    totalItem: z.number(),
    totalPage: z.number(),
    page: z.number(),
    limit: z.number(),
  }),
  message: z.string(),
});

export type DishListResType = z.TypeOf<typeof DishListRes>;

export const UpdateDishBody = CreateDishBody;

export type UpdateDishBodyType = z.TypeOf<typeof UpdateDishBody>;

export const DishParams = z.object({
  id: z.string(),
});

export type DishParamsType = z.TypeOf<typeof DishParams>;
