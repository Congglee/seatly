import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditOrderStore } from "@/store/orders/use-edit-order";
import { Edit, MoreHorizontal } from "lucide-react";

interface OrderActionsProps {
  orderId: string;
}

export default function OrderActions({ orderId }: OrderActionsProps) {
  const { setOrderId, setEditOrderSheetOpen } = useEditOrderStore();

  const handleEditOrderSheetOpen = () => {
    setOrderId(orderId);
    setEditOrderSheetOpen(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={handleEditOrderSheetOpen}
          className="cursor-pointer p-[10px] font-medium"
        >
          <Edit className="mr-2 size-4 stroke-2" />
          Chỉnh sửa đơn
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
