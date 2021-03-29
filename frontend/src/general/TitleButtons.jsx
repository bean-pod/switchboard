import React from "react";
import { NavLink } from "react-router-dom";
import StreamButton from "./Buttons/StreamButton";

export default function TitleButtons(props) {
  const { type } = props;

  function determineButton(type) {
    if (type === "createStream") {
      return(
        <NavLink
          to="/Streams/New"
          activeClassName="hideLinkStyle"
          className="hideLinkStyle"
          exact
        >
          <StreamButton type="submit" buttonName="Stream" />
        </NavLink>
      );
    } else if (type === "viewStreams") {
      return(
        <NavLink
          to="/Streams"
          activeClassName="hideLinkStyle"
          className="hideLinkStyle"
          exact
        >
          <StreamButton type="submit" buttonName="View Streams"/>
        </NavLink>
      );
    } else {
      return(<></>);
    }
  }
  return (
    <div className="alignRightFloat">
     {determineButton(type)}
    </div>
  );
}

