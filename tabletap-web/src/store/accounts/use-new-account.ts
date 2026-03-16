import { create } from "zustand";

type NewAccountStore = {
  newAccountSheetOpen: boolean;
  setNewAccountSheetOpen: (newAccountSheetOpen: boolean) => void;
  onOpenNewAccountSheet: () => void;
  onCloseNewAccountSheet: () => void;
};

export const useNewAccountStore = create<NewAccountStore>((set) => ({
  newAccountSheetOpen: false,
  setNewAccountSheetOpen: (newAccountSheetOpen) => set({ newAccountSheetOpen }),
  onOpenNewAccountSheet: () => set({ newAccountSheetOpen: true }),
  onCloseNewAccountSheet: () => set({ newAccountSheetOpen: false }),
}));
