"use client";
import React from "react";
import { Container } from "@/app/components";

import Styles from "./sass/Watchlist.module.scss";
import { useWatchlist } from "@/app/store/watchlist";
import Image from "next/image";
import star from "@/app/img/star-svgrepo-com.svg";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import { CircleAlert } from "lucide-react";

import { PopUp } from "./index";
import { MovieAndTvShow } from "@/interfaces";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function WatchlistPage() {
  const { data: session }: any = useSession();
  const { t } = useTranslation();
  const [popUp, setPopUp] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<MovieAndTvShow | null>(
    null
  );
  const closePopUp = () => {
    setPopUp(false);
  };
  const WatchlistItems = useWatchlist((state) => state.watchlist);
  const { clearWatchlist } = useWatchlist();
  const router = useRouter();
  React.useEffect(() => {
    if (!session?.user?.name) {
      router.push("https://imdx.vercel.app/");
    }
  }, [session, router]);
  return (
    <>
      <Container classname={Styles.container}>
        {" "}
        <header>
          <h1>{t("yourWatchList")}</h1>
          <p>{t("watchlistDescription")}</p>
        </header>
        <div className={Styles.row}>
          <div className={Styles.row__content}>
            {WatchlistItems.length > 0 ? (
              WatchlistItems.map((item, i) => (
                <div key={item.id} className={Styles.card}>
                  <div className={Styles.card__content}>
                    <div className={Styles.main}>
                      <div className={Styles.poster_path}>
                        <Image
                          src={GetCreditJpg(item.poster_path || "", "original")}
                          alt=""
                          width={197}
                          height={10000}
                        />
                      </div>
                      <div className={Styles.Information}>
                        <div className={Styles.title}>
                          <Link href={`/${item.media_type}/${item.id}`}>
                            <h1>
                              <span>{i + 1}. </span>
                              {item.original_name || item.original_title}
                            </h1>
                          </Link>
                        </div>
                        <div className={Styles.rowYearPop}>
                          <ul>
                            <li>
                              {item.first_air_date?.slice(0, 4) ||
                                item.release_date?.slice(0, 4)}
                            </li>
                            <li className={Styles.metascore}>
                              {" "}
                              <span
                                style={
                                  (item.popularity ?? 0) < 50
                                    ? { backgroundColor: "red" }
                                    : {}
                                }>
                                {item.popularity !== undefined
                                  ? String(item.popularity).slice(0, 3)
                                  : "N/A"}
                              </span>
                              {t("metascore")}
                            </li>
                          </ul>
                        </div>
                        <div className={Styles.rating}>
                          <Image src={star} alt="" />
                          <p>
                            <span>{item.vote_average}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        setPopUp(true);
                        setSelectedItem(item);
                      }}
                      className={Styles.info}>
                      <CircleAlert />
                    </div>
                  </div>
                  <div className={Styles.overview}>
                    <p>{item.overview}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>{t("emptyList")}</p>
            )}
          </div>
          {WatchlistItems.length > 0 && (
            <div className={Styles.clearALl}>
              <p onClick={clearWatchlist}>{t("clearAll")}</p>
            </div>
          )}
        </div>
      </Container>
      {popUp && <PopUp closePopUp={closePopUp} items={selectedItem} />}
    </>
  );
}
