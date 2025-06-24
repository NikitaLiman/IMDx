"use client";
import React, { use } from "react";
import { Container } from "@/app/components";
import { ActorRow, TitleBar } from "../index";
import {
  GetSeriasCurrent,
  getTvRecommendations,
} from "@/services/fetchMovies&Serias";
import { Actor, TvShow, TVShow } from "@/interfaces";
import Styles from "../sass/TvPage.module.scss";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import { GetTvTrailer } from "@/services/fetchTrailer";
import { Clapperboard, Youtube } from "lucide-react";
import Link from "next/link";
import { Title, WatchlistButtonPages } from "@/app/shared/ui";
import { getTVCredits } from "@/services/getMovie&SeriasCreadit";
import { useTranslation } from "react-i18next";
interface Props {
  params: Promise<{ id: string }>;
}
export default function TvPage({ params }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [Tv, setTv] = React.useState<TVShow | null>(null);
  const [trailerKey, setTrailerKey] = React.useState<string | null>(null);
  const [creditDetails, setCreditDetails] = React.useState<Actor[] | null>(
    null
  );
  const [recDetails, setRecDetails] = React.useState<TvShow[] | null>(null);
  const { id } = use(params);
  const fetch = async () => {
    const tv = await GetSeriasCurrent(Number(id));
    setTv(tv);
    const trailer = await GetTvTrailer(Number(id));
    setTrailerKey(trailer);
    const credits = await getTVCredits(Number(id));
    setCreditDetails(credits);
    const Recommendations = await getTvRecommendations(Number(id));
    setRecDetails(Recommendations);
  };
  console.log(recDetails, "recdd");
  React.useEffect(() => {
    setLoading(true);
    fetch().then(() => setLoading(false));
  }, []);
  const titleOBJ = {
    title: Tv?.original_name,
    popularity: Tv?.popularity,
    year: Tv?.first_air_date,
  };
  return (
    <Container classname={Styles.container}>
      <TitleBar titleOBJ={titleOBJ} />
      <div className={Styles.container__content}>
        <div className={Styles.poster_path}>
          {loading ? (
            <div className={Styles.poster_pathSkeleton}></div>
          ) : (
            <Image
              src={GetCreditJpg(Tv?.poster_path || "", "original")}
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
                  Tv?.production_companies?.[0]?.logo_path || "",
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
          {loading ? (
            <div className={Styles.adaptive__skeleton}></div>
          ) : (
            <Image
              src={GetCreditJpg(Tv?.poster_path || "", "original")}
              alt=""
              width={278}
              height={414}
            />
          )}
          <div className={Styles.infoBlock}>
            <div className={Styles.genres}>
              <ul>
                {loading
                  ? [...Array(3)].map((_, i) => (
                      <li key={i} className={Styles.genresSkeleton}></li>
                    ))
                  : Tv?.genres.map((genre, i) => <li key={i}>{genre.name}</li>)}
              </ul>
            </div>
            <div className={Styles.tagline}>
              <h2>{t("tagline")}</h2>
              <p>{Tv?.tagline ? Tv?.tagline : "Tagline doesnt exists"}</p>
            </div>
            <div className={Styles.overwievText}>
              {loading ? (
                <p className={Styles.pSkeleton}></p>
              ) : (
                <p>{Tv?.overview}</p>
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
            <WatchlistButtonPages item={Tv} />
          )}
        </div>
      </div>
      <div className={Styles.underBlock}>
        <div className={Styles.Actors}>
          <ActorRow
            loading={loading}
            tvId={Number(Tv?.id)}
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
                            <h2>{item.original_name}</h2>
                            <div className={Styles.rating}>
                              <p>Popularity: {item.popularity}</p>
                              <p>{item.first_air_date}</p>
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
