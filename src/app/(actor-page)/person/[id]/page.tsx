"use client";
import React, { use } from "react";
import { Container } from "@/app/components";
import {
  GetCreditInfo,
  GetPersonalInfo,
} from "@/services/getInformationPerson";
import Styles from "../sass/actor-page.module.scss";
import { Movie, MovieCredit, PersonInfo } from "@/interfaces";

import { TitleBar } from "../components/top-title";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import Link from "next/link";
import { useRecentlyViewed } from "@/app/store/RecentlyViewed";
import { useTranslation } from "react-i18next";

interface Props {
  params: Promise<{ id: string }>;
}

export default function MoviePage({ params }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [PersonalInfo, setPersonalInfo] = React.useState<PersonInfo | null>(
    null
  );
  const [flag, setFlag] = React.useState<boolean>(false);
  const [creditInfo, setCreditInfo] = React.useState<MovieCredit[]>([]);

  const { id } = use(params);
  const { addToRecentlyViewed, isInViewed } = useRecentlyViewed();

  const handleClickToViewed = (item: Movie) => {
    if (isInViewed(item.id)) {
      return;
    } else {
      addToRecentlyViewed(item);
    }
  };

  const fetch = async () => {
    try {
      const PersnonalInfo = await GetPersonalInfo(Number(id));
      setPersonalInfo(PersnonalInfo);
      const creditInfo = await GetCreditInfo(Number(id));
      setCreditInfo(creditInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const titleObj = {
    title: PersonalInfo?.name,
    popularity: PersonalInfo?.popularity,
    year: PersonalInfo?.birthday,
  };

  React.useEffect(() => {
    setLoading(true);
    fetch().then(() => setLoading(false));
  }, []);

  const More = () => {
    setFlag(!flag);
  };

  const renderSkeletonCards = () => {
    return [...Array(10)].map((_, i) => (
      <div key={i} className={Styles.skeletonItem}>
        <div className={Styles.cardSkeleton}></div>
        <div className={Styles.cardTitleSkeleton}></div>
      </div>
    ));
  };

  const renderMovieCards = () => {
    return creditInfo.slice(0, 15).map((item) => (
      <Link
        onClick={() => handleClickToViewed(item)}
        href={`/movie/${item.id}`}
        key={item.id}
        className={Styles.movieLink}>
        <div className={Styles.card}>
          <div className={Styles.card__poster_path}>
            <Image
              src={GetCreditJpg(item.poster_path || "", "w185")}
              alt={item.original_title || "Movie poster"}
              width={130}
              height={195}
              loading="lazy"
            />
          </div>
          <div className={Styles.title}>
            <p>{item.original_title}</p>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <Container classname={Styles.container}>
      <TitleBar loading={loading} titleOBJ={titleObj} />
      <div className={Styles.container__content}>
        <div className={Styles.leftColumn}>
          <div className={Styles.poster_path}>
            {loading ? (
              <div className={Styles.poster_pathSkeleton}></div>
            ) : (
              <Image
                src={GetCreditJpg(PersonalInfo?.profile_path || "", "original")}
                alt={PersonalInfo?.name || "Actor photo"}
                width={278}
                height={414}
                priority
              />
            )}
          </div>

          <div className={Styles.personalInfo}>
            {loading ? (
              <div className={Styles.titleSkeleton}></div>
            ) : (
              <h2 className={Styles.personalInfoTitle}>{t("personalInfo")}</h2>
            )}

            <div className={Styles.infoBox}>
              {loading ? (
                <h3 className={Styles.tagSkeleton}></h3>
              ) : (
                <h3>{t("knownFor")}</h3>
              )}
              {loading ? (
                <p className={Styles.subSkeleton}></p>
              ) : (
                <p>{PersonalInfo?.known_for_department}</p>
              )}
            </div>

            <div className={Styles.infoBox}>
              {loading ? (
                <h3 className={Styles.tagSkeleton}></h3>
              ) : (
                <h3>{t("gender")}</h3>
              )}
              {loading ? (
                <p className={Styles.subSkeleton}></p>
              ) : (
                <p>{PersonalInfo?.gender === 2 ? "Male" : "Female"}</p>
              )}
            </div>

            <div className={Styles.infoBox}>
              {loading ? (
                <h3 className={Styles.tagSkeleton}></h3>
              ) : (
                <h3>{t("placeOfBirth")}</h3>
              )}
              {loading ? (
                <p className={Styles.subSkeleton}></p>
              ) : (
                <p>{PersonalInfo?.place_of_birth}</p>
              )}
            </div>
          </div>
        </div>

        <div className={Styles.rightColumn}>
          <div className={Styles.biography}>
            <h2>{t("biography")}</h2>
            {loading ? (
              <div className={Styles.paragraphWrapperSkeleton}></div>
            ) : (
              <div
                className={`${Styles.paragraphWrapper} ${
                  flag ? Styles.expanded : Styles.collapsed
                }`}>
                {(flag
                  ? PersonalInfo?.biography?.split("\n\n")
                  : PersonalInfo?.biography?.split("\n\n").slice(0, 2)
                )?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            )}
            {PersonalInfo?.biography && (
              <button
                className={Styles.moreButton}
                onClick={More}
                type="button">
                {flag ? t("readLess") : t("readMore")}
              </button>
            )}
          </div>

          <div className={Styles.knownFor}>
            <h2>{t("knownFor")}</h2>
            <div className={Styles.scrollContainer}>
              {loading ? renderSkeletonCards() : renderMovieCards()}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
