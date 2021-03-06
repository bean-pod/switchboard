import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { NavLink } from "react-router-dom";
import DeviceInfo from "../../model/DeviceInfo";
import StreamInfo from "../../model/StreamInfo";

export default function DetailsButton(props) {
  const { navLinkInfo, tooltipTitle } = props;

  return (
    <>
      <NavLink to={navLinkInfo}>
        <Tooltip title={tooltipTitle}>
          <IconButton>
            <Description />
          </IconButton>
        </Tooltip>
      </NavLink>
    </>
  );
}

DetailsButton.propTypes = {
  navLinkInfo: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.oneOfType([
      PropTypes.shape({
        device: PropTypes.instanceOf(DeviceInfo)
      }),
      PropTypes.shape({
        stream: PropTypes.instanceOf(StreamInfo)
      })
    ])
  }).isRequired,
  tooltipTitle: PropTypes.string.isRequired
};
