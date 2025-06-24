"use client";

import React from "react";
import { Container } from "../index";
import { Title, WatchlistButton } from "@/app/shared/ui/index";
import Styles from "./sass/Tv-page.module.scss";
import { GetSerias } from "@/services/fetchMovies&Serias";
import { TvShow } from "@/interfaces";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import star from "@/app/img/star-svgrepo-com.svg";
import Link from "next/link";
import { CircleOff } from "lucide-react";
import { useRecentlyViewed } from "@/app/store/RecentlyViewed";
import { useTranslation } from "react-i18next";

export const TvPage = () => {
  const { t } = useTranslation();
  const [Tv, setTv] = React.useState<TvShow[]>([]);
  const { addToRecentlyViewed, isInViewed } = useRecentlyViewed();

  const [loading, setLoading] = React.useState<boolean>(true);
  const handleClickToViewed = (item: TvShow) => {
    if (isInViewed(item.id)) {
      return;
    } else {
      addToRecentlyViewed(item);
    }
  };
  const fetch = async () => {
    const res = await GetSerias();
    setTv(res);
  };
  React.useEffect(() => {
    setLoading(true);
    fetch().then(() => setLoading(false));
  }, []);
  return (
    <Container classname={Styles.container}>
      <div className={Styles.title}>
        <Title curPointer="auto" title={t("topTVSeries")} />
      </div>
      <div className={Styles.container__content}>
        {loading
          ? [...Array(10)].map((_, i) => (
              <div className={Styles.cardSkeleton} key={i}></div>
            ))
          : Tv.slice(0, 10).map((item, i) => (
              <div key={i} className={Styles.card}>
                <Link
                  onClick={() => handleClickToViewed(item)}
                  href={`/tv/${item.id}`}>
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
                  <Link href={`/tv/${item.id}`}>
                    {" "}
                    <div
                      onClick={() => handleClickToViewed(item)}
                      className={Styles.queue}>
                      <p>
                        {i + 1}.{item.original_name}
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
