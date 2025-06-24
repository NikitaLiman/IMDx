"use client";
import { Container } from "@/app/components";
import React, { use } from "react";
import Styles from "../sass/CastPage.module.scss";
import { Actor, MovieDetails } from "@/interfaces";
import { getMovieCredits } from "@/services/getMovie&SeriasCreadit";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import { Title } from "@/app/shared/ui";
import user from "@/app/img/User-avatar.svg.png";
import { GetCurrentMovie } from "@/services/fetchMovies&Serias";
import Link from "next/link";
import { useTranslation } from "react-i18next";
interface Props {
  params: Promise<{ id: string }>;
}

export default function CastPage({ params }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { id } = use(params);
  const [creditDetails, setCreditDetails] = React.useState<Actor[] | null>(
    null
  );
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails | null>(
    null
  );
  const fetch = async () => {
    const credit = await getMovieCredits(Number(id));
    setCreditDetails(credit);
    console.log(credit, ";eawfawf");
    const res = await GetCurrentMovie(Number(id));
    setMovieDetails(res);
    console.log(res, ";res");
  };
  React.useEffect(() => {
    setLoading(true);
    fetch().then(() => setLoading(false));
  }, []);
  return (
    <Container classname={Styles.container}>
      <div className={Styles.container__content}>
        <div className={Styles.subhead}>
          <Title title={t("cast")} />
        </div>
        <div className={Styles.cont}>
          {loading
            ? [...Array(40)].map((_, i) => (
                <div key={i} className={Styles.cardSkeleton}>
                  <div className={Styles.poster_path}></div>
                  <div className={Styles.info}>
                    <div className={Styles.title}></div>
                    <div className={Styles.subtitle}></div>
                  </div>
                </div>
              ))
            : creditDetails?.map((item) => (
                <div key={item.id} className={Styles.card}>
                  <div className={Styles.card__image}>
                    <Link href={`/person/${item.id}`}>
                      <Image
                        src={
                          item.profile_path
                            ? GetCreditJpg(item.profile_path, "original")
                            : user
                        }
                        alt={item.original_name}
                        width={46}
                        height={46}
                      />
                    </Link>
                  </div>
                  <div className={Styles.card__info}>
                    <Link href={`/person/${item.id}`}>
                      <p className={Styles.card__name}>{item.original_name}</p>
                    </Link>

                    <p className={Styles.card__character}>{item.character}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div className={Styles.aside}>
        <div className={Styles.poster_path}>
          {loading ? (
            <div className={Styles.imageSkeleton}></div>
          ) : (
            <Image
              src={GetCreditJpg(movieDetails?.poster_path || "", "original")}
              alt=""
              width={1000}
              height={1000}
            />
          )}
        </div>
        <div className={Styles.blocked_inforamtion}>
          <Link href={`/movie/${movieDetails?.id}`}>
            <div className={Styles.name}>
              {loading ? (
                <div className={Styles.titleSkeleton}></div>
              ) : (
                <p>{movieDetails?.original_title}</p>
              )}
            </div>{" "}
          </Link>
          <div className={Styles.tagline}>
            {" "}
            {loading ? (
              <div className={Styles.taglineSkeleton}></div>
            ) : (
              <p>{movieDetails?.tagline}</p>
            )}
          </div>
          <div className={Styles.genres}>
            <ul>
              {loading
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className={Styles.genresSkeleton}></div>
                  ))
                : movieDetails?.genres.map((item, i) => (
                    <li key={i}>{item.name}</li>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
