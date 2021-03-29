import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import StreamButton from "./Buttons/StreamButton";

export default function TitleButtons(props) {
  const { type } = props;

  function determineButton() {
    if (type === "createStream") {
      return (
        <NavLink
          to="/Streams/New"
          activeClassName="hideLinkStyle"
          className="hideLinkStyle"
          exact
        >
          <StreamButton type="submit" buttonName="Stream" />
        </NavLink>
      );
    }
    if (type === "viewStreams") {
      return (
        <NavLink
          to="/Streams"
          activeClassName="hideLinkStyle"
          className="hideLinkStyle"
          exact
        >
          <StreamButton type="submit" buttonName="View Streams" />
        </NavLink>
      );
    }
    return <></>;
  }
  return <div className="alignRightFloat">{determineButton()}</div>;
}

TitleButtons.propTypes = {
  type: PropTypes.string.isRequired
};
