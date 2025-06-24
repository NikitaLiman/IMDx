import React from "react";

interface Props {
  text: string;
}

export const FormError: React.FC<Props> = ({ text }) => {
  return (
    <p
      style={{
        color: "red",
        textAlign: "start",
        fontWeight: "500",
        fontSize: "14px",
        margin: "5px 0",
      }}
    >
      {text}
    </p>
  );
};
