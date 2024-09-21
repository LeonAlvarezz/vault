import { create } from "zustand";

type QuickSnipState = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

export const useQuickSnipStore = create<QuickSnipState>((set) => ({
  showModal: false,
  setShowModal: (showModal) => set({ showModal }),
}));
