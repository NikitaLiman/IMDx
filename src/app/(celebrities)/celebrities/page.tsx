"use client";
import { Container } from "@/app/components";
import React from "react";
import Styles from "./sass/celebrities.module.scss";
import { Person } from "@/interfaces";
import { GetListOfPersons } from "@/services/getMovie&SeriasCreadit";
import Image from "next/image";
import user from "@/app/img/User-avatar.svg.png";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import { Title } from "@/app/shared/ui";
import Link from "next/link";
import { ArrowDown, ArrowUp, Grid3x3, SquareMenu } from "lucide-react";

export default function Celebrities() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [TrendingPersons, setTrendingPresons] = React.useState<Person[]>([]);
  const [sortOrder, setSortOrder] = React.useState<boolean>(false);
  const [order, setOrder] = React.useState<"Grid view" | "Compact view">(
    "Compact view"
  );

  const fetch = async () => {
    const data = await GetListOfPersons(100);
    setTrendingPresons(data);
    console.log(data, "awo;mkaeg;okmag");
  };
  const sortedPersons = React.useMemo(() => {
    const sorted = [...TrendingPersons];
    return sortOrder
      ? sorted.sort((a, b) => a.popularity - b.popularity)
      : sorted.sort((a, b) => b.popularity - a.popularity);
  }, [TrendingPersons, sortOrder]);

  const handle = () => {
    setSortOrder(!sortOrder);
  };

  React.useEffect(() => {
    setLoading(true);
    fetch().then(() => setLoading(false));
  }, []);
  return (
    <Container classname={Styles.container}>
      <header>
        {" "}
        <Title color="black" title="Most popular celebs" />
        <div className={Styles.sortButtons}>
          <div className={Styles.view}>
            <ul>
              <li
                onClick={() => setOrder("Compact view")}
                className={order === "Compact view" ? Styles.active : ""}>
                <SquareMenu />
              </li>
              <li
                onClick={() => setOrder("Grid view")}
                className={order === "Grid view" ? Styles.active : ""}>
                <Grid3x3 />
              </li>
            </ul>
          </div>
          <div className={Styles.sort}>
            <p>Sort by:</p>
            <button onClick={handle}>
              {sortOrder ? <ArrowUp /> : <ArrowDown />}
            </button>
          </div>
        </div>
      </header>
      {order === "Compact view" ? (
        <div className={Styles.container__content}>
          {loading
            ? [...Array(40)].map((_, i) => (
                <div key={i} className={Styles.cardSkeleton}>
                  <div className={Styles.poster_pathSkeleton}></div>
                  <div className={Styles.info}>
                    <div className={Styles.title}></div>
                    <div className={Styles.role}></div>
                    <div className={Styles.moviesInRecorded}></div>
                  </div>
                </div>
              ))
            : sortedPersons.map((item, i) => (
                <div key={i} className={Styles.card}>
                  <div className={Styles.card__content}>
                    <Link href={`/person/${item.id}`}>
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
                      </div>{" "}
                    </Link>
                    <div className={Styles.info}>
                      <Link href={`/person/${item.id}`}>
                        <p className={Styles.name}>{item.original_name}</p>
                      </Link>
                      <div className={Styles.departaming}>
                        <p>{item.known_for_department}</p>
                      </div>
                      <ul>
                        {item.known_for.slice(0, 1).map((title, i) => (
                          <li key={i}>
                            <Link href={`/${title.media_type}/${title.id}`}>
                              {title.original_title ||
                                title.original_name ||
                                "Untitled"}
                            </Link>
                            <span>
                              (
                              {(
                                title.release_date || title.first_air_date
                              )?.slice(0, 4)}
                              )
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      ) : (
        <div className={Styles.container__GridContent}>
          {sortedPersons.map((item, i) => (
            <div key={i} className={Styles.card}>
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
              <div className={Styles.info}>
                <Link href={`/person/${item.id}`}>
                  <p className={Styles.name}>{item.original_name}</p>
                </Link>
                <ul>
                  {item.known_for.slice(0, 1).map((title, i) => (
                    <li key={i}>
                      <Link href={`/${title.media_type}/${title.id}`}>
                        {title.original_title ||
                          title.original_name ||
                          "Untitled"}
                      </Link>
                      <span>
                        (
                        {(title.release_date || title.first_air_date)?.slice(
                          0,
                          4
                        )}
                        )
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
