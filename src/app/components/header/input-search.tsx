"use client";
import React from "react";
import Styles from "./sass/Search.module.scss";
import dropUp from "@/app/img/arrow-drop-up-1.svg";
import dropDown from "@/app/img/arrow-drop-down.svg";
import SearchIcon from "@/app//img/search-931.svg";
import Image from "next/image";
import { Building2, Film, Search } from "lucide-react";
import { useClickAway } from "react-use";
import { useDebounce } from "use-debounce";
import { SearchMovies } from "@/services/SearchMovies";
import { SearchPage } from "./search-bar";
import { useTranslation } from "react-i18next";

export const SearchInput = () => {
  const [queryValue, setQueryValue] = React.useState<any[]>([]);
  const [isDropDownOpen, setIsDropDownOpen] = React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<number>(0);
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const [popUp, setPopUp] = React.useState<boolean>(false);
  const [drawerUp, setdrawerUp] = React.useState<boolean>(false);
  const [visibleWindow, setVisibleWindow] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const [debounceQuery] = useDebounce(query, 200);
  const ref = React.useRef(null);
  const { t } = useTranslation();
  const DropDownMenu = [
    { title: t("all"), icon: <Search /> },
    { title: t("titles"), icon: <Film /> },
    { title: t("companies"), icon: <Building2 /> },
  ];
  const toggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };
  const selectId = (i: number) => {
    setSelectedId(i);
    setIsDropDownOpen(false);
  };

  useClickAway(ref, () => {
    setIsDropDownOpen(false);
  });
  const currentType = DropDownMenu[selectedId].title;
  React.useEffect(() => {
    if (!debounceQuery) {
      setQuery("");
      return;
    }

    const fetch = async () => {
      try {
        const data = await SearchMovies(
          debounceQuery,
          currentType.toLowerCase()
        );
        console.log(data, "res search");
        setQueryValue(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [debounceQuery, selectedId]);
  React.useEffect(() => {
    const handleResize = () => {
      setVisibleWindow(window.innerWidth <= 780 ? true : false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  React.useEffect(() => {
    if (drawerUp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerUp]);
  return (
    <div ref={ref} className={Styles.container}>
      {visibleWindow ? (
        <div className={Styles.SearchWindow}>
          <Search onClick={() => setPopUp(!popUp)} />
          <div
            className={
              popUp ? Styles.search_absolut : Styles.search_absolutHidden
            }>
            <div
              onClick={() => setdrawerUp(!drawerUp)}
              className={Styles.titleOfDropdown}>
              <p>{currentType}</p>{" "}
              {drawerUp ? (
                <Image src={dropUp} alt="" />
              ) : (
                <Image src={dropDown} alt="" />
              )}
              <span></span>
            </div>
            <div className={Styles.input}>
              <input
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("search")}
              />
            </div>
            <div
              onClick={() => {
                setPopUp(false);
                setQuery("");
              }}
              className={Styles.cross}>
              <span>+</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`${Styles.container__content} ${
            isFocus ? Styles.focused : ""
          }`}>
          <div onClick={() => toggle()} className={Styles.dropdown_box}>
            <p>{currentType}</p>
            {isDropDownOpen ? (
              <Image src={dropUp} alt="" />
            ) : (
              <Image src={dropDown} alt="" />
            )}
          </div>
          {isDropDownOpen && (
            <div className={Styles.dropDown}>
              <ul>
                {DropDownMenu.map((item, i) => (
                  <li
                    className={`${selectedId === i ? Styles.selected : ""}`}
                    onClick={() => selectId(i)}
                    key={i}>
                    <span>{item.icon}</span>
                    {item.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className={Styles.input}>
            <input
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search")}
            />
            <div className={Styles.SearchIcon}>
              {query ? (
                <span onClick={() => setQuery("")}>+</span>
              ) : (
                <Image src={SearchIcon} alt="" />
              )}
            </div>
          </div>
        </div>
      )}
      <div className={drawerUp ? Styles.drawerUpActive : Styles.drawerUp}>
        <div className={Styles.drawerUpActive__content}>
          <div onClick={() => setdrawerUp(false)} className={Styles.cross}>
            +
          </div>
          <ul>
            {DropDownMenu.map((item, i) => (
              <li
                onClick={() => {
                  selectId(i);
                  setdrawerUp(false);
                }}
                key={i}
                className={selectedId === i ? Styles.active : ""}>
                <span>{item.icon}</span>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {query && (
        <SearchPage quary={query} setQuery={setQuery} queryValue={queryValue} />
      )}
    </div>
  );
};
