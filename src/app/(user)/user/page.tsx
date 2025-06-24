"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Styles from "./sass/UserPage.module.scss";
import { Container } from "@/app/components";
import user from "@/app/img/User-avatar.svg.png";
import Image from "next/image";
import { CalendarDays, Check } from "lucide-react";
import { Title } from "@/app/shared/ui";
import { useWatchlist } from "@/app/store/watchlist";
import { GetCreditJpg } from "@/app/utils/getCreditJpg";
import star from "@/app/img/star-svgrepo-com.svg";
import Link from "next/link";
import { MovieAndTvShow } from "@/interfaces";
import { useRouter } from "next/navigation";
export default function UserPage() {
  const { data: session }: any = useSession();
  const WatchlistItems = useWatchlist((state) => state.watchlist);
  const { isInWatchlist, removeFromWatchlist, addToWatchlist } = useWatchlist();
  const date = new Date(session?.user.createdAT);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  const router = useRouter();
  const handleClick = (item: MovieAndTvShow) => {
    if (isInWatchlist(item.id || 0)) {
      removeFromWatchlist(item.id || 0);
    } else {
      addToWatchlist(item);
    }
  };
  React.useEffect(() => {
    if (!session?.user?.name) {
      router.push("https://imdx.vercel.app/");
    }
  }, [session, router]);
  return (
    <>
      {" "}
      <div className={Styles.container}>
        <Container classname={Styles.container__content}>
          <div className={Styles.logoBlock}>
            <div className={Styles.logo}>
              <Image src={user} alt="" />
            </div>
            <div className={Styles.userInfo}>
              <div className={Styles.calendar}>
                <h1>{session?.user?.name}</h1>
                <span>
                  <CalendarDays color="gray" />
                  <p>Joined {formattedDate}</p>
                </span>
              </div>
              <div className={Styles.editProfile}>
                <button>Edit profile</button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className={Styles.watchlistBlock}>
        <div className={Styles.watchlistBlock__container}>
          <div className={Styles.watchlistBlock__container__title}>
            {" "}
            <Title curPointer="auto" title="Watchlist" color="black" />
            {WatchlistItems.length > 0 && <p>{WatchlistItems.length}</p>}
          </div>
          {WatchlistItems.length > 0 ? (
            <div className={Styles.overflowContainer}>
              {WatchlistItems.map((item, i) => (
                <div key={i} className={Styles.card}>
                  <div className={Styles.poster_path}>
                    <Image
                      src={GetCreditJpg(item.poster_path || "", "original")}
                      alt=""
                      width={10000}
                      height={1000}
                    />
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
                    <div className={Styles.mark}>
                      <Image src={star} alt="" />
                      <span>{item.vote_average}</span>
                    </div>
                    <Link href={`/${item.media_type}/${item.id}`}>
                      {" "}
                      <div className={Styles.queue}>
                        <p>
                          {i + 1}.{item.original_title || item.original_name}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={Styles.noWatchlist}>
              <h1>No Watchlist yet</h1>
              <p>
                Create a watchlist to track movies and shows you want to watch.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
