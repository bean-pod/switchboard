import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import PropTypes from "prop-types";

import { MoreVert } from "@material-ui/icons/";
import DeviceInfo from "../model/DeviceInfo";
import DeleteDeviceButton from "../deviceDetailsPage/DeleteDeviceButton";

export default class ActionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElement: null
    };

    this.setAnchorElement = this.setAnchorElement.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setAnchorElement(event.currentTarget);
  }

  handleClose() {
    this.setAnchorElement(null);
  }

  setAnchorElement(element) {
    this.setState({
      anchorElement: element
    });
  }

  render() {
    const { anchorElement } = this.state;
    const { device } = this.props;
    return (
      <>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          size="small"
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorElement}
          keepMounted
          open={Boolean(anchorElement)}
          onClose={this.handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <MenuItem onClick={this.handleClose}>
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
          <MenuItem onClick={this.handleClose}>
            Start stream with this as receiver
          </MenuItem>
          <DeleteDeviceButton button={false} deleteId={device.serialNumber} />
        </Menu>
      </>
    );
  }
}

ActionMenu.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
