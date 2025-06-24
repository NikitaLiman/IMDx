"use client";
import React, { use } from "react";
import { Container } from "@/app/components";
import { ActorRow, TitleBar } from "../index";
import Styles from "../sass/movie-page.module.scss";
import {
  GetCurrentMovie,
  getMovieRecommendations,
} from "@/services/fetchMovies&Serias";
import { Actor, MovieDetails, MovieRecommendation } from "@/interfaces";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import { GetMovieTrailer } from "@/services/fetchTrailer";
import { getMovieCredits } from "@/services/getMovie&SeriasCreadit";
import { Clapperboard, Youtube } from "lucide-react";
import { Title, WatchlistButtonPages } from "@/app/shared/ui";
import Link from "next/link";
import { useTranslation } from "react-i18next";
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MoviePage({ params }: PageProps) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails | null>(
    null
  );
  const [creditDetails, setCreditDetails] = React.useState<Actor[] | null>(
    null
  );
  const [recDetails, setRecDetails] = React.useState<
    MovieRecommendation[] | null
  >(null);
  const [trailerKey, setTrailerKey] = React.useState<string | null>(null);

  const titleOBJ = {
    title: movieDetails?.original_title,
    popularity: movieDetails?.popularity,
    year: movieDetails?.release_date,
  };
  const { id } = use(params);
  const fetch = async () => {
    const res = await GetCurrentMovie(Number(id));
    setMovieDetails(res);
    const trailer = await GetMovieTrailer(Number(id));
    console.log(trailer, typeof trailer, "trailer");
    setTrailerKey(trailer);
    const credit = await getMovieCredits(Number(id));
    setCreditDetails(credit);
    const recMovies = await getMovieRecommendations(Number(id));
    setRecDetails(recMovies);
  };
  React.useEffect(() => {
    setLoading(true);
    fetch().then(() => setLoading(false));
  }, [id]);
  return (
    <Container classname={Styles.container}>
      <TitleBar loading={loading} titleOBJ={titleOBJ} />
      <div className={Styles.container__content}>
        <div className={Styles.poster_path}>
          {loading ? (
            <div className={Styles.poster_pathSkeleton}></div>
          ) : (
            <Image
              src={GetCreditJpg(movieDetails?.poster_path || "", "original")}
              alt=""
              width={278}
              height={414}
            />
          )}
        </div>
        <div className={Styles.trailer}>
          {trailerKey ? (
            <div className={Styles.trailerWrapper}>
              <iframe
                width="100%"
                height="417"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen></iframe>
            </div>
          ) : (
            <div className={Styles.trailerSkeleton}></div>
          )}
        </div>
        <div className={Styles.blocked_inforamtion}>
          <div className={Styles.blocked_inforamtion__block}>
            {loading ? (
              <div className={Styles.blockSkeleton}></div>
            ) : (
              <Image
                src={GetCreditJpg(
                  movieDetails?.production_companies?.[0]?.logo_path || "",
                  "original"
                )}
                alt=""
                width={150}
                height={50}
              />
            )}
          </div>
          <div className={Styles.blocked_inforamtion__block}>
            <div className={Styles.more}>
              <h2>{t("watchMore")}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className={Styles.overwiev}>
        <div className={Styles.adaptive}>
          {" "}
          {loading ? (
            <div className={Styles.adaptive__skeleton}></div>
          ) : (
            <Image
              src={GetCreditJpg(movieDetails?.poster_path || "", "original")}
              alt=""
              width={278}
              height={414}
            />
          )}
          <div className={Styles.infoBlock}>
            <div className={Styles.genres}>
              <ul>
                {loading
                  ? [...Array(7)].map((_, i) => (
                      <li key={i} className={Styles.genresSkeleton}></li>
                    ))
                  : movieDetails?.genres.map((genre, i) => (
                      <li key={i}>{genre.name}</li>
                    ))}
              </ul>
            </div>
            <div className={Styles.tagline}>
              <h2>{t("tagline")}</h2>
              <p>
                {movieDetails?.tagline
                  ? movieDetails?.tagline
                  : "Tagline doesnt exists"}
              </p>
            </div>
            <div className={Styles.overwievText}>
              {loading ? (
                <p className={Styles.pSkeleton}></p>
              ) : (
                <p>{movieDetails?.overview}</p>
              )}
            </div>
          </div>
        </div>
        <div className={Styles.blockWithDetails}>
          <div className={Styles.Links}>
            <h2>{t("linksOn")}</h2>
            <div className={Styles.Links__content}>
              <div className={Styles.block}>
                <Youtube size={40} color="white" />
              </div>{" "}
              <div className={Styles.block}>
                <Clapperboard size={40} color="white" />
              </div>
            </div>
          </div>
          {loading ? (
            <div className={Styles.buttonSkeleton}></div>
          ) : (
            <WatchlistButtonPages item={movieDetails} />
          )}
        </div>
      </div>{" "}
      <div className={Styles.underBlock}>
        <div className={Styles.Actors}>
          <ActorRow
            loading={loading}
            movieId={Number(movieDetails?.id)}
            Actors={creditDetails || undefined}
          />
        </div>
        {Array.isArray(recDetails) && recDetails.length > 0 && (
          <div className={Styles.Recommendations}>
            <Title title={t("suggested")} />
            <div className={Styles.Recommendations__content}>
              {loading
                ? [...Array(10)].map((_, i) => (
                    <div className={Styles.cardSkeleton} key={i}></div>
                  ))
                : recDetails?.slice(0, 10).map((item) => (
                    <Link key={item.id} href={`/tv/${item.id}`}>
                      {" "}
                      <div className={Styles.card}>
                        <div className={Styles.infoMovie}>
                          <div className={Styles.title}>
                            <h2>{item.original_title}</h2>
                            <div className={Styles.rating}>
                              <p>Popularity: {item.popularity}</p>
                              <p>{item.release_date}</p>
                            </div>
                          </div>
                        </div>
                        <div className={Styles.poster_path}>
                          <Image
                            src={GetCreditJpg(item.poster_path, "original")}
                            alt=""
                            width={72}
                            height={86}
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
