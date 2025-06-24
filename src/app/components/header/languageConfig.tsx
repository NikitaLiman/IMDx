"use client";
import React from "react";
import Image from "next/image";
import dropUp from "@/app/img/arrow-drop-up-1.svg";
import dropDown from "@/app/img/arrow-drop-down.svg";
import Styles from "./sass/LangConfig.module.scss";
import { useClickAway } from "react-use";
import { changeLanguage } from "i18next";

interface Props {}

export const LanguageConfig: React.FC<Props> = () => {
  const [isDropDownOpen, setIsDropDownOpen] = React.useState<boolean>(false);
  const [selectedLang, setSelectedLang] = React.useState<string>("en");
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const ref = React.useRef(null);

  const list = [
    { name: "English", title: "English", code: "en" },
    { name: "Українська", code: "ua" },
  ];

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language-select") || "en";
      setSelectedLang(savedLanguage);
      const index = list.findIndex((item) => item.code === savedLanguage);
      setActiveIndex(index === -1 ? 0 : index);
      changeLanguage(savedLanguage);
    }
  }, []);

  const toggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleSelect = (index: number, code: string) => {
    setSelectedLang(code);
    changeLanguage(code);
    setActiveIndex(index);
    if (typeof window !== "undefined") {
      localStorage.setItem("language-select", code);
    }
    setIsDropDownOpen(false);
  };

  useClickAway(ref, () => {
    setIsDropDownOpen(false);
  });

  return (
    <div ref={ref} className={Styles.container}>
      <div onClick={toggle} className={Styles.container__content}>
        <p>{selectedLang.toUpperCase()}</p>
        <div className={Styles.toggleArrows}>
          <Image src={isDropDownOpen ? dropUp : dropDown} alt="toggle" />
        </div>
      </div>

      {isDropDownOpen && (
        <div
          onMouseLeave={() => setIsDropDownOpen(false)}
          className={Styles.dropDown}>
          <h1>FULLY SUPPORTED</h1>
          <ul>
            {list.map((item, i) => (
              <li
                key={i}
                className={Styles.radioOption}
                onClick={() => handleSelect(i, item.code)}>
                <input
                  type="radio"
                  name="language"
                  className={Styles.radioInput}
                  checked={activeIndex === i}
                  readOnly
                />
                <span className={Styles.customRadio}></span>
                <section>
                  <span>{item.name}</span>
                  <p>{item.title && item.title}</p>
                </section>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
