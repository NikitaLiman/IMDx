import React from "react";
import Styles from "../sass/top-title.module.scss";

interface Props {
  titleOBJ: {
    title?: string;
    popularity?: number;
    year?: string;
  };
  loading: boolean;
}

export const TitleBar: React.FC<Props> = ({ titleOBJ, loading }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.title}>
        {loading ? (
          <h1 className={Styles.titleSkeleton}></h1>
        ) : (
          <h1>{titleOBJ.title}</h1>
        )}
        {loading ? (
          <p className={Styles.YearSkeleton}></p>
        ) : (
          <p>{titleOBJ.year}</p>
        )}
      </div>
      <div className={Styles.popularity}>
        <p>POPULARITY</p>
        {loading ? (
          <div className={Styles.popularitySkeleton}></div>
        ) : (
          <span>{titleOBJ.popularity}</span>
        )}
      </div>
    </div>
  );
};
