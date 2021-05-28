import React from "react";
import { Link } from "react-router-dom";

import "./css/infoBar.css";
import onlineIcon from "../assets/onlineIcon.png";
import closeIcon from "../assets/closeIcon.png";

const InfoBar = ({ room }) => {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="icon" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <Link to="/">
          <img src={closeIcon} alt="close" />
        </Link>
      </div>
    </div>
  );
};

export default InfoBar;
