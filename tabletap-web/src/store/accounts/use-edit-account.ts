import { create } from "zustand";

type EditAccountStore = {
  accountId: string | undefined;
  setAccountId: (accountId: string | undefined) => void;
  editAccountSheetOpen: boolean;
  setEditAccountSheetOpen: (editAccountSheetOpen: boolean) => void;
  onOpenEditAccountSheet: () => void;
  onCloseEditAccountSheet: () => void;
};

export const useEditAccountStore = create<EditAccountStore>((set) => ({
  accountId: undefined,
  setAccountId: (accountId) => set({ accountId }),
  editAccountSheetOpen: false,
  setEditAccountSheetOpen: (editAccountSheetOpen) =>
    set({ editAccountSheetOpen }),
  onOpenEditAccountSheet: () => set({ editAccountSheetOpen: true }),
  onCloseEditAccountSheet: () => set({ editAccountSheetOpen: false }),
}));
