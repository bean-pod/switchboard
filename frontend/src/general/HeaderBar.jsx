import React from "react";
import PropTypes from "prop-types";
import { withRouter, NavLink } from "react-router-dom";
import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import { AccountCircle, Home } from "@material-ui/icons/";

import { logOut } from "../api/AuthenticationApi";
import { isAuthenticated } from "../api/AuthenticationUtil";
import LogoutMenu from "./LogoutMenu";

class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.classes = makeStyles((theme) => ({
      menuButton: {
        marginRight: theme.spacing(2)
      }
    }));
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const { history } = this.props;
    logOut();
    history.push("/Login");
  }

  render() {
    return (
      <div className="headerBar">
        <AppBar position="static">
          <Toolbar className="darkGrey">
            <div className="headerTitle">
              <NavLink to="/Home" className="headerTitle">
                <IconButton
                  edge="start"
                  className={this.classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <Home />
                </IconButton>
              </NavLink>
              Switchboard
            </div>
            <LogoutMenu
              disabled={!isAuthenticated()}
              handleLogout={this.handleLogout}
            />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withRouter(HeaderBar);

HeaderBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  }).isRequired
};
