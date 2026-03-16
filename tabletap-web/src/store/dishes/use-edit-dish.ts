import { create } from "zustand";

type EditDishStore = {
  dishId: string | undefined;
  setDishId: (dishId: string | undefined) => void;
  editDishSheetOpen: boolean;
  setEditDishSheetOpen: (editDishSheetOpen: boolean) => void;
  onOpenEditDishSheet: () => void;
  onCloseEditDishSheet: () => void;
};

export const useEditDishStore = create<EditDishStore>((set) => ({
  dishId: undefined,
  setDishId: (dishId) => set({ dishId }),
  editDishSheetOpen: false,
  setEditDishSheetOpen: (editDishSheetOpen) => set({ editDishSheetOpen }),
  onOpenEditDishSheet: () => set({ editDishSheetOpen: true }),
  onCloseEditDishSheet: () => set({ editDishSheetOpen: false }),
}));
