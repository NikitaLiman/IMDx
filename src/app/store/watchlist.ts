import { MovieAndTvShow } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WathlistProps {
  watchlist: MovieAndTvShow[];
  addToWatchlist: (item: MovieAndTvShow) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  clearWatchlist: () => void;
}

export const useWatchlist = create<WathlistProps>()(
  persist(
    (set, get) => ({
      watchlist: [],
      addToWatchlist(item) {
        const exists = get().watchlist.some((el) => el.id === item.id);
        if (!exists) {
          set((state) => ({
            watchlist: [...state.watchlist, item],
          }));
        }
      },

      removeFromWatchlist(id) {
        set((state) => ({
          watchlist: state.watchlist.filter((el) => el.id !== id),
        }));
      },

      clearWatchlist() {
        set({ watchlist: [] });
      },
      isInWatchlist: (id) => {
        return get().watchlist.some((el) => el.id === id);
      },
    }),
    { name: "watchlist-storage" }
  )
);
