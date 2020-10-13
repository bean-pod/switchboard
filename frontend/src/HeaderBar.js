import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge
} from "@material-ui/core"
import {
  AccountCircle,
  Notifications,
  Menu
 } from '@material-ui/icons/';

function HeaderBar() {
  return (
    <div className="HeaderBar">
      <AppBar position="static">
        <Toolbar class="darkGrey paddedText flexContents">
          <IconButton color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <span class="headerTitle">Switchboard</span>
          <div class="alignRightFloat">
            <IconButton color="inherit"><Notifications /></IconButton>
            <IconButton color="inherit"><AccountCircle /></IconButton>
          </div>     
        </Toolbar>
        </AppBar>
    </div>
  );
}

export default HeaderBar;
