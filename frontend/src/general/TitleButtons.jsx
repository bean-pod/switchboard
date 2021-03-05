import React from "react";
import { NavLink } from "react-router-dom";
import StreamButton from "./Buttons/StreamButton";

export default function TitleButtons() {
  return (
    <div className="alignRightFloat">
      <NavLink
        to="/Streaming"
        activeClassName="hideLinkStyle"
        className="hideLinkStyle"
        exact
      >
        <StreamButton id="DeviceListStreamBtn" type="submit" />
      </NavLink>
    </div>
  );
}
