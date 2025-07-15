"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Container } from "../container";
import { Slider, ScrollDiscover } from "./index";
import Styles from "./sass/discover.module.scss";
import { GetReleaseMovies } from "@/services/fetchMovies&Serias";
import { Movie } from "@/interfaces";
import { useTranslation } from "react-i18next";

const NEXT_MOVIES_COUNT = 4;

export const DiscoverPage = () => {
  const { t } = useTranslation();
  const [releaseMovies, setReleaseMovies] = useState<Movie[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReleaseMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await GetReleaseMovies();

      if (!data || data.length === 0) {
        throw new Error("No movies found");
      }

      setReleaseMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReleaseMovies();
  }, [fetchReleaseMovies]);

  const nextMovies = useMemo(() => {
    if (releaseMovies.length === 0) return [];

    const result: Movie[] = [];
    const totalMovies = releaseMovies.length;

    for (let i = 1; i <= NEXT_MOVIES_COUNT; i++) {
      const nextIndex = (activeIndex + i) % totalMovies;
      result.push(releaseMovies[nextIndex]);
    }

    return result;
  }, [releaseMovies, activeIndex]);

  const handleActiveIndexChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  if (error) {
    return (
      <Container classname={Styles.container}>
        <div className={Styles.error}>
          <p>Error: {error}</p>
          <button onClick={fetchReleaseMovies}>Retry</button>
        </div>
      </Container>
    );
  }

  return (
    <Container classname={Styles.container}>
      <div className={Styles.container__content}>
        <Slider
          loading={loading}
          ReleaseMovies={releaseMovies}
          setActiveIndex={handleActiveIndexChange}
        />
        <ScrollDiscover
          loading={loading}
          title={t("upNext")}
          ReleaseMovies={nextMovies}
        />
      </div>
    </Container>
  );
};
