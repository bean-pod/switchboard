import React from "react";
import { IconButton } from "@material-ui/core";
import PropTypes from "prop-types";

import { AccountCircle } from "@material-ui/icons/";
import LogoutMenu from "../LogoutMenu";

export default class LogoutMenuOpener extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.anchorElement = React.createRef();
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      open: false
    });
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
        <LogoutMenu
          anchor={this.anchorElement.current}
          open={open}
          handleLogout={handleLogout}
          handleClose={this.handleClose}
        />
      </>
    );
  }
}
