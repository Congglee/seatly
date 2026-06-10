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
    "Are you sure you want to delete this account?",
    "This action will revoke the account's active sessions.",
    "destructive"
  );

  const { data: meData } = useGetMeQuery();
  const currentAccountId = meData?.payload.data.id;

  const { setAccountId, setEditAccountSheetOpen } = useEditAccountStore();
  const { mutateAsync } = useDeleteAccountMutation();

  const isCurrentAccount = currentAccountId === accountId;

  const handleEditAccountSheetOpen = () => {
    if (isCurrentAccount) {
      toast.info("Use My profile to update your own account.");
      return;
    }

    setAccountId(accountId);
    setEditAccountSheetOpen(true);
  };

  const handleDeleteAccount = async () => {
    if (isCurrentAccount) {
      toast.info("You cannot delete your own account here.");
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
            Edit account
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDeleteAccount}
            className="cursor-pointer p-[10px] font-medium text-destructive focus:text-destructive/80"
          >
            <Trash className="mr-2 size-4 stroke-2" />
            Delete account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
