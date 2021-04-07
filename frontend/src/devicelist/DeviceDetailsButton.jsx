import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import DeviceInfo from "../model/DeviceInfo";

export default function DeviceDetailsButton(props) {
  const { deviceInfo } = props;

  return (
    <>
      <NavLink
        to={{
          pathname: `/Devices/Details/${deviceInfo.serialNumber}`,
          state: { device: deviceInfo }
        }}
      >
        <Tooltip title="View Device Details">
          <IconButton>
            <Description />
          </IconButton>
        </Tooltip>
      </NavLink>
    </>
  );
}

DeviceDetailsButton.propTypes = {
  deviceInfo: PropTypes.instanceOf(DeviceInfo).isRequired
};
