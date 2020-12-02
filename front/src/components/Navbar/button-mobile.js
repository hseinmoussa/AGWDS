import React from "react";
import "./button.css";

const STYLE = ["btn-mobile--primary", "btn-mobile--outline"];
const SIZE = ["btn-mobile--medium", "btn-mobile--large"];
export const BM = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const ButtonStyle = STYLE.includes(buttonStyle) ? buttonStyle : STYLE[0];

  const ButtonSize = SIZE.includes(buttonSize) ? buttonSize : SIZE[0];

  return (
    <button
      className={`btn-mobile ${ButtonStyle} ${ButtonSize}`}
      onClick={onClick}
      type="submit"
    >
      {children}
    </button>
  );
};
