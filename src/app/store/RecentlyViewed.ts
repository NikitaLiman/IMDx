import { MovieAndTvShow } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RecentlyViewed {
  Viewed: MovieAndTvShow[];
  addToRecentlyViewed: (item: MovieAndTvShow) => void;
  isInViewed: (id: number) => boolean;
  clearViewed: () => void;
}

export const useRecentlyViewed = create<RecentlyViewed>()(
  persist(
    (set, get) => ({
      Viewed: [],
      addToRecentlyViewed(item) {
        const exists = get().Viewed.some((el) => el.id === item.id);
        if (!exists) {
          set((state) => ({
            Viewed: [...state.Viewed, item],
          }));
        }
      },
      isInViewed(id) {
        return get().Viewed.some((el) => el.id === id);
      },
      clearViewed() {
        set({ Viewed: [] });
      },
    }),
    { name: "Viewed-storage" }
  )
);
