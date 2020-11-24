import React from "react";
import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import { AccountCircle, Menu, Notifications } from "@material-ui/icons/";
import { NavLink } from "react-router-dom";

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.classes = makeStyles((theme) => ({
      menuButton: {
        marginRight: theme.spacing(2)
      }
    }));
  }

  render() {
    return (
      <>
        <div className="headerBar">
          <AppBar position="static">
            <Toolbar className="darkGrey">
              <IconButton
                edge="start"
                className={this.classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <Menu />
              </IconButton>
              <div className="headerTitle">
                <NavLink
                  to="/"
                  activeClassName="headerTitle"
                  className="headerTitle"
                  exact
                >
                  Switchboard
                </NavLink>
              </div>
              <IconButton id="notifBtn" color="inherit">
                <Notifications />
              </IconButton>
              <IconButton id="acctBtn" color="inherit">
                <AccountCircle />
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      </>
    );
  }
}
