"use client";
import React from "react";
import Styles from "./sass/footer.module.scss";
import { Container } from "../container";
import { useRecentlyViewed } from "@/app/store/RecentlyViewed";
import Link from "next/link";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import { Check } from "lucide-react";
import { useWatchlist } from "@/app/store/watchlist";
import { MovieAndTvShow } from "@/interfaces";
import { useTranslation } from "react-i18next";

interface Props {
  bgColor?: string;
  color?: string;
}

export const Footer: React.FC<Props> = ({
  bgColor = "white",
  color = "black",
}) => {
  const { t } = useTranslation();
  const { Viewed, clearViewed } = useRecentlyViewed();
  const { isInWatchlist, removeFromWatchlist, addToWatchlist } = useWatchlist();
  const handleClick = (item: MovieAndTvShow) => {
    if (isInWatchlist(item.id || 0)) {
      removeFromWatchlist(item.id || 0);
    } else {
      addToWatchlist(item);
    }
  };
  return (
    <div style={{ backgroundColor: bgColor }} className={Styles.container}>
      <Container classname={Styles.container__content}>
        {Viewed.length > 0 && (
          <div className={Styles.container__content__title}>
            <h3 style={{ color: color }}>{t("recentlyViewed")}</h3>
            <p onClick={clearViewed}>{t("clearAll")}</p>
          </div>
        )}
        <div className={Styles.RecentlyViewed}>
          <div className={Styles.RecentlyViewed__container}>
            <div className={Styles.RecentlyViewed__container__content}>
              {" "}
              <div className={Styles.overflowContainer}>
                {Viewed.length > 0 &&
                  Viewed.map((item, i) => (
                    <div key={i} className={Styles.card}>
                      {" "}
                      <div className={Styles.poster_path}>
                        <Link href={`/${item.media_type}/${item.id}`}>
                          <Image
                            src={GetCreditJpg(
                              item.poster_path || "",
                              "original"
                            )}
                            alt=""
                            width={10000}
                            height={1000}
                          />
                        </Link>
                        {isInWatchlist(item.id || 0) ? (
                          <div
                            onClick={() => handleClick(item)}
                            className={Styles.bookmarkChecked}>
                            <Check />
                          </div>
                        ) : (
                          <div
                            onClick={() => handleClick(item)}
                            className={Styles.bookmark}>
                            +
                          </div>
                        )}
                      </div>
                      <div className={Styles.card__info}>
                        <Link href={`/${item.media_type}/${item.id}`}>
                          {" "}
                          <div className={Styles.queue}>
                            <p>{item.original_title || item.original_name}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className={Styles.footerInfo}>
              <div className={Styles.inline_list}>
                <ul>
                  <li>Help</li>
                  <li>Site Index</li>
                  <li>IMDxPro</li>
                  <li>Box office Mojo</li>
                  <li>License IMDx Data</li>
                </ul>
              </div>
              <div className={Styles.inline_list}>
                {" "}
                <ul>
                  <li>Press Room</li>
                  <li>Advertising</li>
                  <li>Jobs</li>
                  <li>Conditions of Use</li>
                  <li>Privacy Policy</li>
                  <li>Your Ads Privacy Choices</li>
                </ul>
              </div>
              <div className={Styles.by}>
                <p style={{ color: color }}>A Nikita Production</p>
              </div>
              <div className={Styles.profuction}>
                <h3 style={{ color: color }}>©1990-2025 by IMDx.com, Inc.</h3>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
