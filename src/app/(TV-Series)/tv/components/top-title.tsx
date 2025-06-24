import React from "react";
import Styles from "@/app/(movie-page)/movie/sass/top-title.module.scss";

interface Props {
  titleOBJ: {
    title?: string;
    popularity?: number;
    year?: string;
  };
}

export const TitleBar: React.FC<Props> = ({ titleOBJ }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        <h1>{titleOBJ.title}</h1>
        <p>{titleOBJ.year}</p>
      </div>
      <div className={Styles.popularity}>
        <p>POPULARITY</p>
        <span>{titleOBJ.popularity}</span>
      </div>
    </div>
  );
};
