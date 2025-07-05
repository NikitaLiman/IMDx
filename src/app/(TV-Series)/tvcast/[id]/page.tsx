"use client";
import { Container } from "@/app/components";
import React, { use } from "react";
import Styles from "../sass/CastTv.module.scss";
import { AggregateActor, TVShow } from "@/interfaces";
import { getTVCredits } from "@/services/getMovie&SeriasCreadit";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import { Title } from "@/app/shared/ui";
import user from "@/app/img/User-avatar.svg.png";
import { GetSeriasCurrent } from "@/services/fetchMovies&Serias";
import Link from "next/link";
import { useTranslation } from "react-i18next";
interface Props {
  params: Promise<{ id: string }>;
}

export default function CastPage({ params }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(true);
  const { id } = use(params);
  const [creditDetails, setCreditDetails] = React.useState<
    AggregateActor[] | null
  >(null);
  const [tvDetails, setTvDetails] = React.useState<TVShow | null>(null);
  const fetch = async () => {
    const credit = await getTVCredits(Number(id));
    setCreditDetails(credit);
    const res = await GetSeriasCurrent(Number(id));
    setTvDetails(res);
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
                  <div className={Styles.cardSkeleton__content}>
                    <div className={Styles.poster_path}></div>
                    <div className={Styles.info}>
                      <div className={Styles.title}></div>
                      <div className={Styles.subtitle}></div>
                    </div>
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

                    <p className={Styles.card__character}>
                      {item.roles[0].character}
                      <span>{item.total_episode_count} episodes</span>
                    </p>
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
              src={GetCreditJpg(tvDetails?.poster_path || "", "original")}
              alt=""
              width={1000}
              height={1000}
            />
          )}
        </div>
        <div className={Styles.blocked_inforamtion}>
          <Link href={`/tv/${tvDetails?.id}`}>
            <div className={Styles.name}>
              {loading ? (
                <div className={Styles.titleSkeleton}></div>
              ) : (
                <p>{tvDetails?.original_name}</p>
              )}
            </div>{" "}
          </Link>
          <div className={Styles.tagline}>
            {" "}
            {loading ? (
              <div className={Styles.taglineSkeleton}></div>
            ) : (
              <p>{tvDetails?.tagline}</p>
            )}
          </div>
          <div className={Styles.genres}>
            <ul>
              {loading
                ? [...Array(3)].map((_, i) => (
                    <div key={i} className={Styles.genresSkeleton}></div>
                  ))
                : tvDetails?.genres
                    .slice(0.3)
                    .map((item, i) => <li key={i}>{item.name}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
