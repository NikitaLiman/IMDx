import { Actor } from "@/interfaces";
import React from "react";
import Styles from "@/app/(movie-page)/movie/sass/Actor-row.module.scss";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import Image from "next/image";
import { Title } from "@/app/shared/ui";
import Link from "next/link";
import user from "@/app/img/User-avatar.svg.png";
import { useTranslation } from "react-i18next";
interface Props {
  Actors?: Actor[];
  tvId: number;
  loading: boolean;
}

export const ActorRow: React.FC<Props> = ({ Actors, tvId, loading }) => {
  const { t } = useTranslation();
  return (
    <div className={Styles.container}>
      <Link href={`/tvcast/${tvId}`}>
        <Title title={t("topCast")} />
      </Link>
      <div className={Styles.container__content}>
        {loading
          ? [...Array(20)].map((_, i) => (
              <div key={i} className={Styles.cardSkeleton}>
                <div className={Styles.poster_path}></div>
                <div className={Styles.Fullname}>
                  <p></p>
                  <h2></h2>
                </div>
              </div>
            ))
          : Actors?.slice(0, 20).map((item, i) => (
              <Link href={`/person/${item.id}`} key={item.id}>
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
                    <h2>{item.character}</h2>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};
