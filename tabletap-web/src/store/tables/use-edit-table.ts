import { create } from "zustand";

type EditTableStore = {
  tableNumber: number | undefined;
  setTableNumber: (tableNumber: number | undefined) => void;
  editTableSheetOpen: boolean;
  setEditTableSheetOpen: (editTableSheetOpen: boolean) => void;
  onOpenEditTableSheet: () => void;
  onCloseEditTableSheet: () => void;
};

export const useEditTableStore = create<EditTableStore>((set) => ({
  tableNumber: undefined,
  setTableNumber: (tableNumber) => set({ tableNumber }),
  editTableSheetOpen: false,
  setEditTableSheetOpen: (editTableSheetOpen) => set({ editTableSheetOpen }),
  onOpenEditTableSheet: () => set({ editTableSheetOpen: true }),
  onCloseEditTableSheet: () => set({ editTableSheetOpen: false }),
}));
