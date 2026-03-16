import { create } from "zustand";

type NewDishStore = {
  newDishSheetOpen: boolean;
  setNewDishSheetOpen: (isNewDishSheetOpen: boolean) => void;
  onOpenNewDishSheet: () => void;
  onCloseNewDishSheet: () => void;
};

export const useNewDishStore = create<NewDishStore>((set) => ({
  newDishSheetOpen: false,
  setNewDishSheetOpen: (newDishSheetOpen) => set({ newDishSheetOpen }),
  onOpenNewDishSheet: () => set({ newDishSheetOpen: true }),
  onCloseNewDishSheet: () => set({ newDishSheetOpen: false }),
}));
