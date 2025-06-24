"use client";
import React from "react";
import { Container } from "../index";
import Styles from "./sass/top-movies-in-week.module.scss";
import Image from "next/image";
import { Title, WatchlistButton } from "@/app/shared/ui/index";
import { GetWeeklyMovies } from "@/services/fetchMovies&Serias";
import { Movie } from "@/interfaces";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import star from "@/app/img/star-svgrepo-com.svg";
import Link from "next/link";
import { CircleOff } from "lucide-react";
import { useRecentlyViewed } from "@/app/store/RecentlyViewed";
import { useTranslation } from "react-i18next";
interface Props {}

export const TopMoviesInWeek: React.FC<Props> = () => {
  const { t } = useTranslation();
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const { addToRecentlyViewed, isInViewed } = useRecentlyViewed();
  const [loading, setLoading] = React.useState<boolean>(true);
  const handleClickToViewed = (item: Movie) => {
    if (isInViewed(item.id)) {
      return;
    } else {
      addToRecentlyViewed(item);
    }
  };
  const fetch = async () => {
    const res = await GetWeeklyMovies();
    setMovies(res.results);
  };
  React.useEffect(() => {
    setLoading(true);
    fetch().then(() => setLoading(false));
  }, []);

  return (
    <Container classname={Styles.container}>
      <Title curPointer="auto" title={t("top10ThisWeek")} />
      <div className={Styles.container__content}>
        {loading
          ? [...Array(10)].map((_, i) => (
              <div key={i} className={Styles.cardSkeleton}></div>
            ))
          : movies.slice(0, 10).map((item, i) => (
              <div key={i} className={Styles.card}>
                <Link
                  onClick={() => handleClickToViewed(item)}
                  href={`/movie/${item.id}`}>
                  <div className={Styles.poster_path}>
                    {item.poster_path ? (
                      <Image
                        src={GetCreditJpg(item.poster_path, "original")}
                        alt=""
                        width={193}
                        height={287}
                      />
                    ) : (
                      <div className={Styles.noPoster}>
                        <CircleOff />
                      </div>
                    )}
                  </div>
                </Link>
                <div className={Styles.card__info}>
                  <div className={Styles.mark}>
                    <Image src={star} alt="" />
                    <span>{item.vote_average}</span>
                  </div>
                  <Link href={`/movie/${item.id}`}>
                    {" "}
                    <div
                      onClick={() => handleClickToViewed(item)}
                      className={Styles.queue}>
                      <p>
                        {i + 1}.{item.original_title}
                      </p>
                    </div>
                  </Link>

                  <WatchlistButton item={item} />
                </div>
              </div>
            ))}
      </div>
    </Container>
  );
};
