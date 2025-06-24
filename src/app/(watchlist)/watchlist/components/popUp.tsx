"use client";
import { MovieAndTvShow } from "@/interfaces";
import React from "react";
import Styles from "../sass/popUp.module.scss";
import Image from "next/image";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import vector from "@/app/img/right-arrow-svgrepo-com.svg";
import star from "@/app/img/star-svgrepo-com.svg";
import { useWatchlist } from "@/app/store/watchlist";
import { Check, Plus } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
interface Props {
  items: MovieAndTvShow | null;
  closePopUp: () => void;
}

export const PopUp: React.FC<Props> = ({ items, closePopUp }) => {
  const { t } = useTranslation();

  const { isInWatchlist, removeFromWatchlist } = useWatchlist();
  React.useEffect(() => {
    if (items) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [items]);
  if (!items) return null;
  const isOn = isInWatchlist(items?.id || 0);

  const handleClick = () => {
    if (isOn) {
      removeFromWatchlist(items?.id || 0);
      closePopUp();
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.container__content}>
        {" "}
        <div onClick={closePopUp} className={Styles.close}>
          <Plus color="white" />
        </div>
        <div className={Styles.card}>
          <div className={Styles.poster_path}>
            <Image
              src={GetCreditJpg(items?.poster_path || "", "original")}
              alt=""
              width={1000}
              height={1000}
            />
          </div>
          <div className={Styles.info}>
            <Link href={`/${items?.media_type}/${items?.id}`}>
              <div className={Styles.title}>
                <h1>{items?.original_name || items?.original_title}</h1>
                <Image src={vector} alt="" width={1000} height={1000} />
              </div>
            </Link>
            <div className={Styles.year}>
              <p>
                {items?.first_air_date?.slice(0, 4) ||
                  items?.release_date?.slice(0, 4)}
              </p>
            </div>
            <div className={Styles.rating}>
              <Image src={star} alt="" />
              <p>{items?.vote_average}/10</p>
            </div>
          </div>
        </div>
        <div className={Styles.overview}>
          <p>{items?.overview}</p>
        </div>
        <div className={Styles.watchlist}>
          {isOn ? (
            <button onClick={handleClick}>
              <span>
                <Check size={20} />
              </span>
              {t("watchList")}
            </button>
          ) : (
            <button onClick={handleClick}>
              <span>+</span>
              {t("watchList")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
