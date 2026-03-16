import { create } from "zustand";

type EditOrderStore = {
  orderId: string | undefined;
  setOrderId: (orderId: string | undefined) => void;
  editOrderSheetOpen: boolean;
  setEditOrderSheetOpen: (editOrderSheetOpen: boolean) => void;
  onOpenEditOrderSheet: () => void;
  onCloseEditOrderSheet: () => void;
};

export const useEditOrderStore = create<EditOrderStore>((set) => ({
  orderId: undefined,
  setOrderId: (orderId) => set({ orderId }),
  editOrderSheetOpen: false,
  setEditOrderSheetOpen: (editOrderSheetOpen) => set({ editOrderSheetOpen }),
  onOpenEditOrderSheet: () => set({ editOrderSheetOpen: true }),
  onCloseEditOrderSheet: () => set({ editOrderSheetOpen: false }),
}));
