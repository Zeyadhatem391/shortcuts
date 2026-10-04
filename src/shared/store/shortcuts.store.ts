import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Shortcuts } from "../types/type";

interface ShortcutsStore {
  shortcuts: Shortcuts[];

  addShortcut: (shortcut: Shortcuts) => void;
  removeShortcut: (id: string) => void;
  toggleFavorite: (id: string) => void;
  getShortcutsByCategory: (categoryId: string) => Shortcuts[];
}

export const useShortcutsStore = create<ShortcutsStore>()(
  devtools(
    persist(
      (set, get) => ({
        shortcuts: [],

        addShortcut: (shortcut) =>
          set((state) => ({
            shortcuts: [...state.shortcuts, shortcut],
          })),

        removeShortcut: (id) =>
          set((state) => ({
            shortcuts: state.shortcuts.filter(
              (shortcut) => shortcut.id !== id,
            ),
          })),

        toggleFavorite: (id) =>
          set((state) => ({
            shortcuts: state.shortcuts.map((shortcut) =>
              shortcut.id === id
                ? {
                    ...shortcut,
                    favorite: !shortcut.favorite,
                  }
                : shortcut,
            ),
          })),

        getShortcutsByCategory: (categoryId) =>
          get().shortcuts.filter((shortcut) =>
            shortcut.category?.some(
              (category) => category.id === categoryId,
            ),
          ),
      }),
      {
        name: "shortcuts-storage",
        skipHydration: true,
      },
    ),
  ),
);