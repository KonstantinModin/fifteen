import React from "react";
import "./index.css";

const Overlay = ({ text, onClick }) => {
  return (
    <div className="Overlay" onClick={onClick}>
      <div className="Overlay-Text">{text}</div>
    </div>
  );
};

export default Overlay;
