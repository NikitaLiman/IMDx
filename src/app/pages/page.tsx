"use client";
import React from "react";
import Styles from "./sass/Home.module.scss";
import { Header } from "../components/header/index";
import { DiscoverPage } from "../components/discover/index";
import { PopularPersons } from "../components/PopularPersons/index";
import { TopMoviesInWeek } from "../components/Top-list-of-movies/index";
import { TvPage } from "../components/Tvs/index";
import Image from "next/image";
import upArrow from "@/app/img/arrow-drop-up-1.svg";
import { Footer } from "../components/footer";

export const HomePage = () => {
  const [showScrollUp, setShowScrollUp] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollUp(scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={Styles.container}>
      <Header />
      <DiscoverPage />
      <PopularPersons />
      <TopMoviesInWeek />
      <TvPage />
      <div
        className={`${Styles.scrollTopAlert} ${
          showScrollUp ? Styles.visible : ""
        }`}
        onClick={scrollToTop}>
        <Image src={upArrow} alt="Scroll to top" width={20} height={20} />
        <span>Back to top</span>
      </div>
      <Footer />
    </div>
  );
};
