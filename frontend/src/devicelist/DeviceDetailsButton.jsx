import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import DeviceInfo from "../model/DeviceInfo";

export default function DeviceDetailsButton(props) {
  const { device } = props;

  return (
    <>
      <NavLink
        to={{
          pathname: `/Devices/Details/${device.serialNumber}`
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
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
