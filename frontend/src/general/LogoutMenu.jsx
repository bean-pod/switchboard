import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Link, Menu, MenuItem, Popper, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

import { AccountCircle, MoreVert } from "@material-ui/icons/";
import DeviceInfo from "../model/DeviceInfo";
import DeleteDeviceButton from "./Buttons/DeleteDeviceButton";

export default class LogoutMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.anchorElement = React.createRef();
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(event) {
    this.setState({
      open: true
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  render() {
    const { open } = this.state;
    const { disabled, handleLogout } = this.props;
    return (
      <>
        <IconButton
          ref={this.anchorElement}
          id="acctBtn"
          color="inherit"
          disabled={disabled}
          onClick={this.handleOpen}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.anchorElement.current}
          keepMounted
          open={open}
          onClose={this.handleClose}          
        >
          <MenuItem >
            <Typography color="textSecondary">Action Menu</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography color="error">Logout</Typography>
          </MenuItem>
        </Menu>
      </>
    );
  }
}


