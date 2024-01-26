import React from "react";
import PdLogo from "../../../assets/images/pd_logo.png";

const Logo = (height = 210, width = 500) => {
  return (
    <div className="image_wrapper">
      <img
        className="mt-3"
        src={PdLogo}
        alt="Point Duty"
        height={height}
        width={width}
      />
    </div>
  );
};

export default Logo;
