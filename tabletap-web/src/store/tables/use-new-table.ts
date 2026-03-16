import { create } from "zustand";

type NewTableStore = {
  newTableSheetOpen: boolean;
  setNewTableSheetOpen: (isNewTableSheetOpen: boolean) => void;
  onOpenNewTableSheet: () => void;
  onCloseNewTableSheet: () => void;
};

export const useNewTableStore = create<NewTableStore>((set) => ({
  newTableSheetOpen: false,
  setNewTableSheetOpen: (newTableSheetOpen) => set({ newTableSheetOpen }),
  onOpenNewTableSheet: () => set({ newTableSheetOpen: true }),
  onCloseNewTableSheet: () => set({ newTableSheetOpen: false }),
}));
