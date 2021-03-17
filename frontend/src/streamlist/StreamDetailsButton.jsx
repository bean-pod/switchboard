import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import StreamInfo from "../model/StreamInfo";

export default function StreamDetailsButton(props) {
  const { streamInfo } = props;

  return (
    <>
      <NavLink
        to={{
          pathname: `/Streams/Details/${streamInfo.id}`,
          state: { stream: streamInfo }
        }}
      >
        <IconButton>
          <Description />
        </IconButton>
      </NavLink>
    </>
  );
}

StreamDetailsButton.propTypes = {
  streamInfo: PropTypes.instanceOf(StreamInfo).isRequired
};
