"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movie } from "@/interfaces";
import Image from "next/image";
import { Navigation, Autoplay } from "swiper/modules";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import "swiper/css";
import "./sass/MovieSlider.scss";
import { Title } from "@/app/shared/ui";
import {
  ArrowBigLeft,
  ArrowBigRight,
  Check,
  NotebookPen,
  Play,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useWatchlist } from "@/app/store/watchlist";
import { useRecentlyViewed } from "@/app/store/RecentlyViewed";
import { useTranslation } from "react-i18next";

interface Props {
  ReleaseMovies: Movie[];
  loading: boolean;
  setActiveIndex?: (index: number) => void;
}

export const Slider: React.FC<Props> = ({
  ReleaseMovies,
  setActiveIndex,
  loading,
}) => {
  const { t } = useTranslation();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();
  const { addToRecentlyViewed, isInViewed } = useRecentlyViewed();

  const handleClickToViewed = (item: Movie) => {
    if (isInViewed(item.id)) {
      return;
    } else {
      addToRecentlyViewed(item);
    }
  };
  const handleClickToWatclist = (item: Movie) => {
    if (isInWatchlist(item.id)) {
      removeFromWatchlist(item.id || 0);
    } else {
      addToWatchlist(item);
    }
  };
  const prevRef = React.useRef<HTMLDivElement>(null);
  const nextRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="movie-slider">
      <div className="movie-slider__title">
        <Title title={t("nowPlaying")} />
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveIndex?.(swiper.realIndex)}
        className="movie-slider__container">
        {loading ? (
          <div className="skeleton">ads</div>
        ) : (
          ReleaseMovies.map((item, i) => (
            <SwiperSlide key={i} className="movie-slider__slide">
              <div className="movie-card">
                <div className="movie-card__image">
                  <Image
                    src={GetCreditJpg(`${item.backdrop_path}`, "original")}
                    alt="Actor image"
                    width={10000}
                    height={100}
                  />
                </div>
                <div className="backdrop-block">
                  <div className="card">
                    <Image
                      src={GetCreditJpg(`${item.poster_path}`, "w185")}
                      alt="Actor image"
                      width={185}
                      height={1000}
                    />
                    {isInWatchlist(item.id) ? (
                      <div
                        onClick={() => handleClickToWatclist(item)}
                        className="bookmarkChecked">
                        <Check />
                      </div>
                    ) : (
                      <div
                        onClick={() => handleClickToWatclist(item)}
                        className="bookmark">
                        +
                      </div>
                    )}
                  </div>
                  <div className="info-movie">
                    <Link
                      onClick={() => handleClickToViewed(item)}
                      href={`/movie/${item.id}`}>
                      <div className="play">
                        {" "}
                        <Play />
                      </div>
                    </Link>
                    <div className="info-movie__info">
                      <div className="title">
                        <h2>{item.original_title}</h2>
                        <p>{t("watchNewTrailer")}</p>
                      </div>
                      <div className="voting">
                        <p>
                          <ThumbsUp color="gray" size={17} />
                          {item.vote_average}
                        </p>
                        <span>
                          <NotebookPen color="crimson" size={17} />
                          {item.vote_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="filter"></div>
            </SwiperSlide>
          ))
        )}
        <div className="swiper-nav-wrapper">
          <div ref={prevRef} className="swiper-button-prev custom-nav">
            <ArrowBigLeft />
          </div>
          <div ref={nextRef} className="swiper-button-next custom-nav">
            <ArrowBigRight />
          </div>
        </div>
      </Swiper>
    </div>
  );
};
