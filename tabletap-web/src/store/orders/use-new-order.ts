import { create } from "zustand";

type NewOrderStore = {
  newOrderSheetOpen: boolean;
  setNewOrderSheetOpen: (isNewOrderSheetOpen: boolean) => void;
  onOpenNewOrderSheet: () => void;
  onCloseNewOrderSheet: () => void;
};

export const useNewOrderStore = create<NewOrderStore>((set) => ({
  newOrderSheetOpen: false,
  setNewOrderSheetOpen: (newOrderSheetOpen) => set({ newOrderSheetOpen }),
  onOpenNewOrderSheet: () => set({ newOrderSheetOpen: true }),
  onCloseNewOrderSheet: () => set({ newOrderSheetOpen: false }),
}));
