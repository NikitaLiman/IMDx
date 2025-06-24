import React from "react";
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

export const ScrollDiscover: React.FC<Props> = ({
  ReleaseMovies,
  title,
  loading,
}) => {
  const { t } = useTranslation();
  const { addToRecentlyViewed, isInViewed } = useRecentlyViewed();

  const handleClickToViewed = (item: Movie) => {
    if (isInViewed(item.id)) {
      return;
    } else {
      addToRecentlyViewed(item);
    }
  };
  return (
    <div className={Styles.container}>
      <div className={Styles.title}>{title}</div>
      <div className={Styles.container__content}>
        {" "}
        {ReleaseMovies.map((item, i) => (
          <div key={i} className={Styles.card}>
            {loading ? (
              <div className={Styles.poster_pathSKeleton}></div>
            ) : (
              <div className={Styles.poster_path}>
                <Image
                  src={GetCreditJpg(item?.poster_path, "original")}
                  alt=""
                  width={88}
                  height={130}
                />
              </div>
            )}
            <div className={Styles.card__info}>
              <Link href={`/movie/${item?.id}`}>
                <div
                  onClick={() => handleClickToViewed(item)}
                  className={Styles.play}>
                  <div className={Styles.play__svg}>
                    <Play size={17} />
                  </div>
                  <div className={Styles.duration}>
                    {loading ? (
                      <div className={Styles.durationSkeleton}></div>
                    ) : (
                      <p>{item?.release_date}</p>
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
                    item?.vote_average
                  )}
                </p>
                <span>
                  <NotebookPen color="crimson" size={17} />

                  {loading ? (
                    <i className={Styles.votingSkeleton}></i>
                  ) : (
                    item?.vote_count
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
