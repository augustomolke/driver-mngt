import { create } from "zustand";

type Store = {
  selected: number[];
  setSelected: (newSelected: number) => void;
};

export const useClusters = create<Store>()((set) => ({
  selected: [],
  closeBtn: () => {},
  setSelected: (newSelected) => {
    if (Array.isArray(newSelected)) {
      set({ selected: newSelected });
    } else {
      set((state) => ({
        selected: state.selected.includes(newSelected)
          ? state.selected.filter((id) => id !== newSelected)
          : [...state.selected, newSelected],
      }));
    }
  },

  setCloseBtn: (fn) => set((state) => ({ closeBtn: fn })),
}));
