import { useConfirm } from "@/hooks/use-confirm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditDishStore } from "@/store/dishes/use-edit-dish";
import { useDeleteDishMutation } from "@/queries/use-dish";
import { toast } from "sonner";

interface DishActionsProps {
  dishId: string;
}

export default function DishActions({ dishId }: DishActionsProps) {
  const [ConfirmDialog, confirm] = useConfirm(
    "Bạn có chắc muốn xóa món này?",
    "Bạn sắp xóa món này khỏi thực đơn.",
    "destructive"
  );

  const { setDishId, setEditDishSheetOpen } = useEditDishStore();

  const { mutateAsync } = useDeleteDishMutation();

  const handleEditDishSheetOpen = () => {
    setDishId(dishId);
    setEditDishSheetOpen(true);
  };

  const handleDeleteDish = async () => {
    const ok = await confirm();

    if (ok) {
      const result = await mutateAsync(dishId);
      toast.success(result.payload.message);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={handleEditDishSheetOpen}
            className="cursor-pointer p-[10px] font-medium"
          >
            <Edit className="mr-2 size-4 stroke-2" />
            Chỉnh sửa món
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteDish}
            className="cursor-pointer p-[10px] font-medium text-destructive focus:text-destructive/80"
          >
            <Trash className="mr-2 size-4 stroke-2" />
            Xóa món
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
