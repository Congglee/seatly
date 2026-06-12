import { useConfirm } from "@/hooks/use-confirm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useDeleteAccountMutation, useGetMeQuery } from "@/queries/use-account";
import { useEditAccountStore } from "@/store/accounts/use-edit-account";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

interface AccountActionsProps {
  accountId: string;
}

export default function AccountActions({ accountId }: AccountActionsProps) {
  const [ConfirmDialog, confirm] = useConfirm(
    "Bạn có chắc muốn xóa tài khoản này?",
    "Hành động này sẽ thu hồi các phiên đăng nhập đang hoạt động của tài khoản.",
    "destructive"
  );

  const { data: meData } = useGetMeQuery();
  const currentAccountId = meData?.payload.data.id;

  const { setAccountId, setEditAccountSheetOpen } = useEditAccountStore();
  const { mutateAsync } = useDeleteAccountMutation();

  const isCurrentAccount = currentAccountId === accountId;

  const handleEditAccountSheetOpen = () => {
    if (isCurrentAccount) {
      toast.info("Hãy dùng mục Hồ sơ của tôi để cập nhật tài khoản của bạn.");
      return;
    }

    setAccountId(accountId);
    setEditAccountSheetOpen(true);
  };

  const handleDeleteAccount = async () => {
    if (isCurrentAccount) {
      toast.info("Bạn không thể xóa tài khoản của chính mình tại đây.");
      return;
    }

    const ok = await confirm();

    if (ok) {
      const result = await mutateAsync(accountId);
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
            onClick={handleEditAccountSheetOpen}
            className="cursor-pointer p-[10px] font-medium"
          >
            <Edit className="mr-2 size-4 stroke-2" />
            Chỉnh sửa tài khoản
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteAccount}
            className="cursor-pointer p-[10px] font-medium text-destructive focus:text-destructive/80"
          >
            <Trash className="mr-2 size-4 stroke-2" />
            Xóa tài khoản
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
