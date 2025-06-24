"use client";
import { useWatchlist } from "@/app/store/watchlist";
import { MovieAndTvShow, SearchResultItem } from "@/interfaces";
import Styles from "./sass/watchlist.module.scss";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  item?: MovieAndTvShow;
}

export const WatchlistButton: React.FC<Props> = ({ item }) => {
  if (!item) return null;
  const { t } = useTranslation();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();

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
          {t("watchList")}
        </button>
      ) : (
        <button onClick={handleClick}>
          <span>+</span>
          {t("watchList")}
        </button>
      )}
    </div>
  );
};
