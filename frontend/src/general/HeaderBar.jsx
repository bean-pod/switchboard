import React from "react";
import { AppBar, IconButton, makeStyles, Toolbar } from "@material-ui/core";
import { AccountCircle, Home } from "@material-ui/icons/";
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
    const { authenticated } = this.props;
    return (
      <div className="headerBar">
        <AppBar position="static">
          <Toolbar className="darkGrey">
            <div className="headerTitle">
              <NavLink to="/" className="headerTitle">
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
            {authenticated() ? (
              <IconButton id="acctBtn" color="inherit">
                <AccountCircle />
              </IconButton>
            ) : (
              <></>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
