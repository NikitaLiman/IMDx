import React from "react";
import Styles from "./sass/hamburger.module.scss";

export const HamBurger = () => {
  return (
    <div className={Styles.container}>
      <div className={Styles.container__content}>
        <div className={Styles.ham}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={Styles.subhead}>
          <p>Menu</p>
        </div>
      </div>
    </div>
  );
};
