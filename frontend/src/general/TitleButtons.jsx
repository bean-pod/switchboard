import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import StreamButton from "./Buttons/StreamButton";

export default function TitleButtons(props) {
  const { type } = props;

  function defineStreamButton(buttonName) {
    return (
      <NavLink
        to="/Streams/New"
        activeClassName="hideLinkStyle"
        className="hideLinkStyle"
        exact
      >
        <StreamButton type="submit" buttonName={buttonName} />
      </NavLink>
    );
  }

  function determineButton() {
    if (type === "stream") {
      defineStreamButton("Stream");
    }
    if (type === "create") {
      defineStreamButton("Create");
    }
    if (type === "activeStreams") {
      return (
        <NavLink
          to="/Streams"
          activeClassName="hideLinkStyle"
          className="hideLinkStyle"
          exact
        >
          <StreamButton type="submit" buttonName="Active Streams" />
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
