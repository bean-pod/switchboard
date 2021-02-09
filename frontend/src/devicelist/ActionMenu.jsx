import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

import { MoreVert } from "@material-ui/icons/";
import DeviceInfo from "../model/DeviceInfo";
import DeleteDeviceButton from "../general/DeleteDeviceButton";
import SnackbarMessage from "../general/SnackbarMessage";

export default function ActionMenu(props) {
  const { device } = props;
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [date, setDate] = React.useState("");

  function handleSnackbarChange(stat, msg) {
    setStatus(stat);
    setMessage(msg);
    setDate(new Date());
  }

  function handleClick(event) {
    setAnchorElement(event.currentTarget);
  }

  function handleClose() {
    setAnchorElement(null);
  }

  return (
    <>
      {status ? (
        <SnackbarMessage key={date} status={status} msg={message} />
      ) : null}
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink
            to={{
              pathname: `/Devices/Details/${device.name}`,
              state: { device }
            }}
            className="invisibleLink"
          >
            View Details
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          Start stream with this as receiver
        </MenuItem>
        <DeleteDeviceButton
          button={false}
          deleteId={device.serialNumber}
          snackbarHandler={handleSnackbarChange}
        />
      </Menu>
    </>
  );
}

ActionMenu.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
};
