import React, { useCallback } from "react";
import Styles from "./sass/ScrollDiscover.module.scss";
import { Movie } from "@/interfaces";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import Image from "next/image";
import { NotebookPen, Play, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { useRecentlyViewed } from "@/app/store/RecentlyViewed";
import { useTranslation } from "react-i18next";

interface Props {
  ReleaseMovies: Movie[];
  title?: string;
  loading: boolean;
}

const MovieCard: React.FC<{
  item: Movie;
  onViewedClick: (item: Movie) => void;
  loading: boolean;
  t: any;
}> = React.memo(({ item, onViewedClick, loading, t }) => (
  <div className={Styles.card}>
    <div className={Styles.poster_path}>
      {loading ? (
        <div className={Styles.poster_pathSKeleton}></div>
      ) : (
        <Image
          src={GetCreditJpg(item?.poster_path, "w300")}
          alt={`${item?.original_title} poster`}
          width={88}
          height={130}
          loading="lazy"
        />
      )}
    </div>

    <div className={Styles.card__info}>
      <Link href={`/movie/${item?.id}`}>
        <div
          onClick={() => onViewedClick(item)}
          className={Styles.play}
          role="button"
          aria-label="Play movie">
          <div className={Styles.play__svg}>
            <Play size={17} />
          </div>
          <div className={Styles.duration}>
            {loading ? (
              <div className={Styles.durationSkeleton}></div>
            ) : (
              <p>{new Date(item?.release_date).getFullYear()}</p>
            )}
          </div>
        </div>
      </Link>

      <div className={Styles.card__info__title}>
        {loading ? (
          <div className={Styles.titleSkeleton}></div>
        ) : (
          <h2>{item?.original_title}</h2>
        )}
        <p>{t("watchNewTrailer")}</p>
      </div>

      <div className={Styles.voting}>
        <p>
          <ThumbsUp color="gray" size={15} />
          {loading ? (
            <i className={Styles.votingSkeleton}></i>
          ) : (
            item?.vote_average?.toFixed(1)
          )}
        </p>
        <span>
          <NotebookPen color="crimson" size={17} />
          {loading ? (
            <i className={Styles.votingSkeleton}></i>
          ) : (
            item?.vote_count?.toLocaleString()
          )}
        </span>
      </div>
    </div>
  </div>
));

MovieCard.displayName = "MovieCard";

export const ScrollDiscover: React.FC<Props> = ({
  ReleaseMovies,
  title,
  loading,
}) => {
  const { t } = useTranslation();
  const { addToRecentlyViewed, isInViewed } = useRecentlyViewed();

  const handleViewedClick = useCallback(
    (item: Movie) => {
      if (!isInViewed(item.id)) {
        addToRecentlyViewed(item);
      }
    },
    [isInViewed, addToRecentlyViewed]
  );

  return (
    <div className={Styles.container}>
      {title && <div className={Styles.title}>{title}</div>}
      <div className={Styles.container__content}>
        {ReleaseMovies.map((item, i) => (
          <MovieCard
            key={item.id || i}
            item={item}
            onViewedClick={handleViewedClick}
            loading={loading}
            t={t}
          />
        ))}
      </div>
    </div>
  );
};
