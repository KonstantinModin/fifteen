import React from "react";
import "./index.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="Footer">
      Designed with React by Konstantin Modin © {year}
    </div>
  );
};

export default Footer;
