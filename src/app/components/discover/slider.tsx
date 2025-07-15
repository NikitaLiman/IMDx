"use client";
import React, { useRef, useCallback, useMemo } from "react";
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

const MovieSlide: React.FC<{
  item: Movie;
  onWatchlistClick: (item: Movie) => void;
  onViewedClick: (item: Movie) => void;
  isInWatchlist: boolean;
  t: any;
}> = React.memo(
  ({ item, onWatchlistClick, onViewedClick, isInWatchlist, t }) => (
    <div className="movie-card">
      <div className="movie-card__image">
        <Image
          src={GetCreditJpg(item.backdrop_path, "original")}
          alt={`${item.original_title} backdrop`}
          width={10000}
          height={100}
          priority
        />
      </div>
      <div className="backdrop-block">
        <div className="card">
          <Image
            src={GetCreditJpg(item.poster_path, "w185")}
            alt={`${item.original_title} poster`}
            width={185}
            height={1000}
          />
          <div
            onClick={() => onWatchlistClick(item)}
            className={isInWatchlist ? "bookmarkChecked" : "bookmark"}
            role="button"
            aria-label={
              isInWatchlist ? "Remove from watchlist" : "Add to watchlist"
            }>
            {isInWatchlist ? <Check /> : "+"}
          </div>
        </div>
        <div className="info-movie">
          <Link onClick={() => onViewedClick(item)} href={`/movie/${item.id}`}>
            <div className="play" role="button" aria-label="Play movie">
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
                {item.vote_average?.toFixed(1)}
              </p>
              <span>
                <NotebookPen color="crimson" size={17} />
                {item.vote_count?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

MovieSlide.displayName = "MovieSlide";

export const Slider: React.FC<Props> = ({
  ReleaseMovies,
  setActiveIndex,
  loading,
}) => {
  const { t } = useTranslation();
  const { addToWatchlist, isInWatchlist, removeFromWatchlist } = useWatchlist();
  const { addToRecentlyViewed, isInViewed } = useRecentlyViewed();

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const handleViewedClick = useCallback(
    (item: Movie) => {
      if (!isInViewed(item.id)) {
        addToRecentlyViewed(item);
      }
    },
    [isInViewed, addToRecentlyViewed]
  );

  const handleWatchlistClick = useCallback(
    (item: Movie) => {
      if (isInWatchlist(item.id)) {
        removeFromWatchlist(item.id);
      } else {
        addToWatchlist(item);
      }
    },
    [isInWatchlist, addToWatchlist, removeFromWatchlist]
  );

  const handleSlideChange = useCallback(
    (swiper: any) => {
      setActiveIndex?.(swiper.realIndex);
    },
    [setActiveIndex]
  );

  const swiperConfig = useMemo(
    () => ({
      modules: [Navigation, Autoplay],
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      spaceBetween: 0,
      slidesPerView: 1 as const,
      loop: true,
      autoplay: {
        delay: 5500,
        disableOnInteraction: false,
      },
      onSlideChange: handleSlideChange,
    }),
    [handleSlideChange]
  );

  if (loading) {
    return (
      <div className="movie-slider">
        <div className="movie-slider__title">
          <Title title={t("nowPlaying")} />
        </div>
        <div className="movie-slider__container">
          <div className="skeleton">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-slider">
      <div className="movie-slider__title">
        <Title title={t("nowPlaying")} />
      </div>

      <Swiper {...swiperConfig} className="movie-slider__container">
        {ReleaseMovies.map((item, i) => (
          <SwiperSlide key={item.id || i} className="movie-slider__slide">
            <MovieSlide
              item={item}
              onWatchlistClick={handleWatchlistClick}
              onViewedClick={handleViewedClick}
              isInWatchlist={isInWatchlist(item.id)}
              t={t}
            />
            <div className="filter"></div>
          </SwiperSlide>
        ))}

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
