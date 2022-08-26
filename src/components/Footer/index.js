import React from "react";
import "./index.css";

const Footer = ({ setGameFinished }) => {
  const year = new Date().getFullYear();
  return (
    <div className="Footer">
      Designed with React by Konstantin Modin © {year}
      <button onClick={() => setGameFinished(true)}>finish it </button>
    </div>
  );
};

export default Footer;
