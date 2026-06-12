import { DishStatus } from "@/constants/type";
import { CircleCheck, CircleDot, CircleX } from "lucide-react";

export const DISH_STATUS_CONFIG: Record<
  string,
  { label: string; icon: typeof CircleCheck; className: string }
> = {
  [DishStatus.Available]: {
    label: "Có sẵn",
    icon: CircleCheck,
    className:
      "bg-emerald-500/15 text-emerald-700 border-emerald-500/25 hover:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-400/20",
  },
  [DishStatus.Unavailable]: {
    label: "Tạm hết",
    icon: CircleDot,
    className:
      "bg-amber-500/15 text-amber-700 border-amber-500/25 hover:bg-amber-500/20 dark:text-amber-400 dark:border-amber-400/20",
  },
  [DishStatus.Hidden]: {
    label: "Đã ẩn",
    icon: CircleX,
    className:
      "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 hover:bg-zinc-500/15 dark:text-zinc-400 dark:border-zinc-400/15",
  },
};
