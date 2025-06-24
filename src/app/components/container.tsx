import React from "react";
import "./sass/container.scss";

interface Props {
  classname?: string;
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ classname, children }) => {
  return <div className={`container ${classname}`}>{children}</div>;
};
