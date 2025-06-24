"use client";
import React from "react";
import Styles from "./sass/Profile.module.scss";
import Image from "next/image";
import { UserCog } from "lucide-react";
import dropUp from "@/app/img/arrow-drop-up-1.svg";
import dropDown from "@/app/img/arrow-drop-down.svg";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Props {
  user: any;
}

type MenuItem =
  | { title: string; link: string; onClick?: never }
  | { title: string; link?: never; onClick: () => void };

export const ProfileButton: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const [isDropDownOpen, setIsDropDownOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const DropDownMenu: MenuItem[] = [
    { title: t("yourProfile"), link: "/user" },
    { title: t("yourWatchList"), link: "/watchlist" },
    { title: t("signOut"), onClick: () => signOut() },
  ];

  const toggle = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  React.useEffect(() => {
    if (!isDropDownOpen) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const buffer = 225;
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom + buffer;
      if (!inside) setIsDropDownOpen(false);
    };
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isDropDownOpen]);

  return (
    <div ref={containerRef} className={Styles.container} onClick={toggle}>
      <div className={Styles.container__content}>
        <UserCog color="black" className={Styles.logo} />
        <p>{user.user.name}</p>
        <div className={Styles.toggleArrows}>
          <Image src={isDropDownOpen ? dropUp : dropDown} alt="" />
        </div>
      </div>

      {isDropDownOpen && (
        <div className={Styles.dropDown}>
          <ul>
            {DropDownMenu.map((item, i) => {
              if (item.link) {
                return (
                  <Link key={i} href={item.link} className={Styles.link}>
                    <li
                      className={Styles.li}
                      onClick={() => setIsDropDownOpen(false)}>
                      {item.title}
                    </li>{" "}
                  </Link>
                );
              } else {
                return (
                  <li
                    key={i}
                    className={Styles.li}
                    onClick={() => {
                      item.onClick?.();
                      setIsDropDownOpen(false);
                    }}>
                    {item.title}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
