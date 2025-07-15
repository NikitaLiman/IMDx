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
    console.log("Fetched movies:", data);
    setReleaseMovies(data);
    setLoading(false);
  };

  React.useEffect(() => {
    GetRelease();
  }, []);

  const GetNextMovies = (Movie: Movie[], startIndex: number, count = 4) => {
    if (ReleaseMovies.length === 0) return [];
    let result = [];

    for (let i = 1; i <= count; i++) {
      result.push(Movie[(startIndex + i) % Movie.length]);
    }

    console.log("result:", result);
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
