import { create } from "zustand";
import { LatLonBounds } from "leaflet";

type Store = {
  selected: number[];
  setSelected: (newSelected: number) => void;
  bound: any;
  setBound: any;
};

export const useClusters = create<Store>()((set) => ({
  selected: [],
  bound: () => {},
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
  setBound: (fn) => set((state) => ({ bound: fn })),
  setCloseBtn: (fn) => set((state) => ({ closeBtn: fn })),
}));
