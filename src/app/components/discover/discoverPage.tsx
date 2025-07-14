"use client";

import React from "react";
import { Container } from "../container";
import { Slider, ScrollDiscover } from "./index";
import Styles from "./sass/discover.module.scss";
import { GetReleaseMovies } from "@/services/fetchMovies&Serias";
import { Movie } from "@/interfaces";
import { useTranslation } from "react-i18next";

export const DiscoverPage = () => {
  const { t } = useTranslation();
  const [ReleaseMovies, setReleaseMovies] = React.useState<Movie[]>([]);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
  const GetRelease = async () => {
    setLoading(true);
    const data = await GetReleaseMovies();
    setReleaseMovies(data);
    setLoading(false);
  };

  React.useEffect(() => {
    GetRelease();
  }, []);

  const GetNextMovies = (movies: Movie[], startIndex: number, count = 4) => {
    if (!movies || movies.length === 0) return [];
    const result = [];

    for (let i = 1; i <= count; i++) {
      const index = (startIndex + i) % movies.length;
      if (movies[index]) result.push(movies[index]);
    }
    return result;
  };

  return (
    <Container classname={Styles.container}>
      <div className={Styles.container__content}>
        <Slider
          loading={loading}
          ReleaseMovies={ReleaseMovies}
          setActiveIndex={setActiveIndex}
        />
        <ScrollDiscover
          loading={loading}
          title={t("upNext")}
          ReleaseMovies={GetNextMovies(ReleaseMovies, activeIndex)}
        />
      </div>
    </Container>
  );
};
