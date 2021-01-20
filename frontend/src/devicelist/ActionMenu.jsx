import React from "react";
import { NavLink } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@material-ui/core";

import { MoreVert } from "@material-ui/icons/";

export default class ActionMenu extends React.Component {
  constructor() {
    super();
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
                pathname: `/Devices/Details/${this.props.device.name}`,
                state: { device: this.props.device }
              }}
              className="invisibleLink"
            >
              View Details
            </NavLink>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            Start stream with this as receiver
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <span className="warningText">Delete</span>
          </MenuItem>
        </Menu>
      </>
    );
  }
}
