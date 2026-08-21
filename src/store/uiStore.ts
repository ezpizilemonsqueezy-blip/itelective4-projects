import { create } from "zustand";

export interface UiState {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  searchTerm: "",
  setSearchTerm: (value: string) => set({ searchTerm: value }),
}));
