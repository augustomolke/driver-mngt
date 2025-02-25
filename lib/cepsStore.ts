import { create } from "zustand";

type Store = {
  selectedValues: string[];
};

export const useCepsStore = create<Store>()((set) => ({
  selectedValues: null,
  resetCeps: () => {
    set({ selectedValues: [] });
  },
  setSelectedValues: (data) => {
    set({ selectedValues: data });
  },
}));
