import { useConfirm } from "@/hooks/use-confirm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEditTableStore } from "@/store/tables/use-edit-table";
import { useDeleteTableMutation } from "@/queries/use-table";
import { toast } from "sonner";

interface TableActionsProps {
  tableNumber: number;
}

export default function TableActions({ tableNumber }: TableActionsProps) {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this table?",
    "You are about to delete this table.",
    "destructive"
  );

  const { setTableNumber, setEditTableSheetOpen } = useEditTableStore();

  const { mutateAsync } = useDeleteTableMutation();

  const handleEditTableSheetOpen = () => {
    setTableNumber(tableNumber);
    setEditTableSheetOpen(true);
  };

  const handleDeleteTable = async () => {
    const ok = await confirm();

    if (ok) {
      const result = await mutateAsync(tableNumber);
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
            onClick={handleEditTableSheetOpen}
            className="cursor-pointer font-medium p-[10px]"
          >
            <Edit className="size-4 mr-2 stroke-2" />
            Edit Table
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteTable}
            className="cursor-pointer font-medium p-[10px] text-destructive focus:text-destructive/80"
          >
            <Trash className="size-4 mr-2 stroke-2" />
            Delete Table
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
