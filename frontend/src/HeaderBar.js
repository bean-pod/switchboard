import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge
} from "@material-ui/core"
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

function HeaderBar() {
  return (
    <div className="HeaderBar">
      <AppBar position="static">
        <Toolbar class="darkGrey paddedText headerTitle flexContents">
          Switchboard
          <span class="alignRight">
            <IconButton color="inherit"><NotificationsIcon /></IconButton>
            <IconButton color="inherit"><AccountCircle /></IconButton>
          </span>     
        </Toolbar>
        </AppBar>
    </div>
  );
}

export default HeaderBar;
