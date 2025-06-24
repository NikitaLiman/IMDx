"use client";
import React from "react";
import { Container } from "../index";
import { GetPopularPersons } from "@/services/getMovie&SeriasCreadit";
import { Person } from "@/interfaces";
import { Title } from "@/app/shared/ui";
import Styles from "./sass/Pop-persons.module.scss";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import vector from "@/app/img/right-arrow-svgrepo-com.svg";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import user from "@/app/img/User-avatar.svg.png";

export const PopularPersons = () => {
  const { t } = useTranslation();
  const [TrendingPersons, setTrendingPresons] = React.useState<Person[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const fetch = async () => {
    const data = await GetPopularPersons();
    setTrendingPresons(data);
  };

  React.useEffect(() => {
    setLoading(true);
    fetch().then(() => setLoading(false));
  }, []);
  return (
    <Container classname={Styles.container}>
      <div className={Styles.title}>
        <Link href={`/celebrities`}>
          <Title title={t("mostPopularCelebrities")} />
        </Link>
        <span>
          <Image src={vector} alt="" width={25} height={25} />
        </span>
      </div>
      <div className={Styles.container__content}>
        {loading
          ? [...Array(10)].map((_, i) => (
              <div key={i} className={Styles.skeletonContent}>
                <div className={Styles.personSkeleton}></div>
                <div className={Styles.titleSkeleton}></div>
              </div>
            ))
          : TrendingPersons.slice(0, 10).map((item, i) => (
              <Link key={i} href={`/person/${item.id}`}>
                <div className={Styles.card}>
                  <div className={Styles.poster_path}>
                    <Image
                      src={
                        item.profile_path
                          ? GetCreditJpg(item.profile_path, "original")
                          : user
                      }
                      alt=""
                      width={194}
                      height={194}
                    />
                  </div>
                  <div className={Styles.Fullname}>
                    <p>{item.original_name}</p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </Container>
  );
};
