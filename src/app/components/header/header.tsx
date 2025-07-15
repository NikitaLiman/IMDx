"use client";

import React from "react";
import Styles from "./sass/header.module.scss";
import { Container } from "@/app/components/index";
import { ProfileButton } from "@/app/components/header/index";
import { SearchInput } from "./index";
import { LanguageConfig } from "@/app/components/header/index";
import { BookmarkPlus } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useWatchlist } from "@/app/store/watchlist";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  const WatchListCount = useWatchlist((state) => state.watchlist);
  const { data: session } = useSession();

  const user = session;
  console.log(session);
  return (
    <div className={Styles.container}>
      <Container classname={Styles.container__content}>
        <Link href={"https://imdx.vercel.app/"}>
          <div className={Styles.logo}>IMDX</div>
        </Link>
        <SearchInput />

        <span className={Styles.row}></span>
        <Link href={session ? `/watchlist` : ""}>
          <div className={Styles.bookmark}>
            <span>
              <BookmarkPlus
                className={`${Styles.BookmarkPlus} ${
                  WatchListCount.length > 0 && Styles.BookmarkPlusActive
                }`}
              />
            </span>
            <p>
              {t("watchList")}{" "}
              {WatchListCount.length > 0 && (
                <span className={Styles.watchlistCount}>
                  {WatchListCount.length}
                </span>
              )}
            </p>
          </div>
        </Link>
        {user ? (
          <ProfileButton user={user} />
        ) : (
          <div className={Styles.signIn}>
            <Link href={`/registration`}>
              <p>Sign in</p>
            </Link>
          </div>
        )}
        <LanguageConfig />
      </Container>
    </div>
  );
};
