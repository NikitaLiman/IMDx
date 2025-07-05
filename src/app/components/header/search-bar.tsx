"use client";
import React from "react";
import Styles from "./sass/Search-page.module.scss";
import { Container } from "../container";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import { MovieAndTvShow, SearchResultItem } from "@/interfaces";
import {
  getImagePath,
  getKnowFor,
  getTitle,
  getYear,
} from "@/app/utils/searchSplitFunctions";
import { Title, WatchlistButton } from "@/app/shared/ui";
import Link from "next/link";
import star from "@/app/img/star-svgrepo-com.svg";

import user from "@/app/img/User-avatar.svg.png";
import { CircleOff } from "lucide-react";
import { useRecentlyViewed } from "@/app/store/RecentlyViewed";
import { useTranslation } from "react-i18next";
interface Props {
  queryValue: SearchResultItem[];
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  quary: string;
}

export const SearchPage: React.FC<Props> = ({
  queryValue,
  setQuery,
  quary,
}) => {
  const { addToRecentlyViewed, isInViewed } = useRecentlyViewed();
  const movies = queryValue?.filter((type) => type?.media_type === "movie");
  const tv = queryValue.filter((type) => type.media_type === "tv");
  const persons = queryValue.filter((type) => type.media_type === "person");
  const { t } = useTranslation();

  const handleClickToViewed = (item: MovieAndTvShow) => {
    if (isInViewed(item.id || 0)) {
      return;
    } else {
      addToRecentlyViewed(item);
    }
  };

  React.useEffect(() => {
    if (quary) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [quary]);
  return (
    <div className={`${Styles.container}`}>
      <Container classname={Styles.container_scroll}>
        <div className={Styles.container__content}>
          <div className={Styles.hightest_block}>
            <div className={Styles.best_result}>
              <h1>{t("bestResult")}</h1>
              <div className={Styles.best_result__card}>
                {getImagePath(queryValue?.[0]) ? (
                  <Image
                    src={GetCreditJpg(
                      getImagePath(queryValue?.[0]) || "",
                      "original"
                    )}
                    alt=""
                    width={1000}
                    height={1000}
                  />
                ) : (
                  <div className={Styles.noPoster}>
                    <CircleOff />
                  </div>
                )}
                <div className={Styles.name}>
                  <Link
                    href={`/${queryValue?.[0]?.media_type}/${queryValue?.[0]?.id}`}>
                    <p
                      onClick={() => {
                        handleClickToViewed(queryValue?.[0]);
                        setQuery("");
                      }}>
                      {getTitle(queryValue?.[0])}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className={Styles.fiveResults}>
            <h1>{t("featuredResults")}</h1>
            {queryValue.slice(0, 4).map((item) => (
              <div key={item.id} className={Styles.fiveResults__card}>
                <div className={Styles.fiveResults__card__content}>
                  {" "}
                  <div className={Styles.poster_path}>
                    {getImagePath(item) ? (
                      <Image
                        src={GetCreditJpg(getImagePath(item) || "", "original")}
                        alt=""
                        width={1000}
                        height={1000}
                      />
                    ) : (
                      <div className={Styles.noPoster}>
                        <CircleOff />
                      </div>
                    )}
                  </div>
                  <div
                    onClick={() => handleClickToViewed(item)}
                    className={Styles.info}>
                    <Link href={`${item.media_type}/${item.id}`}>
                      <h2 onClick={() => setQuery("")}>{getTitle(item)}</h2>
                    </Link>
                    <p>
                      <span>{getYear(item)}</span>
                    </p>
                  </div>
                </div>
                <div className={Styles.pop}>
                  <p>
                    {t("popularity")}: {getKnowFor(item)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {movies.length > 0 && (
          <div className={Styles.movie}>
            <Title title={t("movies")} />
            <div className={Styles.scrollContainer}>
              {movies.map((item, i) => (
                <div key={item.id} className={Styles.card}>
                  <Link href={`/movie/${item.id}`}>
                    <div
                      onClick={() => {
                        handleClickToViewed(item);
                        setQuery("");
                      }}
                      className={Styles.poster_path}>
                      {item.poster_path ? (
                        <Image
                          src={GetCreditJpg(item.poster_path || "", "original")}
                          alt=""
                          width={193}
                          height={287}
                        />
                      ) : (
                        <div className={Styles.noPoster}>
                          <CircleOff />
                        </div>
                      )}
                    </div>{" "}
                  </Link>
                  <div className={Styles.card__info}>
                    <div className={Styles.mark}>
                      <Image src={star} alt="" />
                      <span>{item.vote_average}</span>
                    </div>
                    <Link href={`/movie/${item.id}`}>
                      {" "}
                      <div
                        onClick={() => {
                          handleClickToViewed(item);
                          setQuery("");
                        }}
                        className={Styles.queue}>
                        <p>
                          {i + 1}.{item.original_title}
                        </p>
                      </div>
                    </Link>

                    {item && <WatchlistButton item={item} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tv.length > 0 && (
          <div className={Styles.tv}>
            <Title title={t("tv")} />
            <div className={Styles.scrollContainer}>
              {tv.map((item, i) => (
                <div key={i} className={Styles.card}>
                  <Link href={`/tv/${item.id}`}>
                    <div
                      onClick={() => {
                        handleClickToViewed(item);
                        setQuery("");
                      }}
                      className={Styles.poster_path}>
                      {item.poster_path ? (
                        <Image
                          src={GetCreditJpg(item.poster_path || "", "original")}
                          alt=""
                          width={193}
                          height={287}
                        />
                      ) : (
                        <div className={Styles.noPoster}>
                          <CircleOff />
                        </div>
                      )}
                    </div>{" "}
                  </Link>
                  <div className={Styles.card__info}>
                    <div className={Styles.mark}>
                      <Image src={star} alt="" />
                      <span>{item.vote_average}</span>
                    </div>{" "}
                    <Link key={i} href={`/tv/${item.id}`}>
                      <div
                        onClick={() => {
                          handleClickToViewed(item);
                          setQuery("");
                        }}
                        className={Styles.queue}>
                        <p>
                          {i + 1}.{item.original_name}
                        </p>
                      </div>
                    </Link>
                    {item && <WatchlistButton item={item} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {persons.length > 0 && (
          <div className={Styles.persons}>
            <Title title="Cast" />
            <div className={Styles.scrollContainer}>
              {persons.map((item, i) => (
                <Link key={i} href={`/person/${item.id}`}>
                  <div onClick={() => setQuery("")} className={Styles.card}>
                    <div className={Styles.poster_path}>
                      <Image
                        src={
                          item.profile_path
                            ? GetCreditJpg(item.profile_path, "original")
                            : user
                        }
                        alt=""
                        width={1000}
                        height={1000}
                      />
                    </div>
                    <div className={Styles.Fullname}>
                      <p>{item.original_name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
