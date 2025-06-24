"use client";
import { useWatchlist } from "@/app/store/watchlist";
import { MovieAndTvShow } from "@/interfaces";
import Styles from "./sass/watchlistPages.module.scss";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  item?: MovieAndTvShow | null;
}

export const WatchlistButtonPages: React.FC<Props> = ({ item }) => {
  const { t } = useTranslation();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();
  if (!item) return null;

  const isOn = isInWatchlist(item.id || 0);

  const handleClick = () => {
    if (isOn) {
      removeFromWatchlist(item.id || 0);
    } else {
      addToWatchlist(item);
    }
  };

  return (
    <div className={Styles.watchlist}>
      {isOn ? (
        <button onClick={handleClick}>
          <span>
            <Check size={20} />
          </span>

          {t("inToWatchList")}
        </button>
      ) : (
        <button onClick={handleClick}>
          <span>+</span>
          {t("addToWatchList")}
        </button>
      )}
    </div>
  );
};
