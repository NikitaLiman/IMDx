import React from "react";
import Styles from "./sass/title.module.scss";

interface Props {
  title: string;
  color?: string;
  curPointer?: string;
}

export const Title: React.FC<Props> = ({
  title,
  color = "white",
  curPointer = "pointer",
}) => {
  return (
    <div style={{ color: color, cursor: curPointer }} className={Styles.title}>
      {title}
    </div>
  );
};
