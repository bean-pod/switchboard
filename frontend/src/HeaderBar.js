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
        <Toolbar class="darkGrey paddedText headerTitle flexContents">
            <IconButton edge="start" color="inherit" aria-label="menu"><Menu/></IconButton>
            Switchboard
          <span class="alignRight">
            <IconButton color="inherit"><Notifications /></IconButton>
            <IconButton color="inherit"><AccountCircle /></IconButton>
          </span>     
        </Toolbar>
        </AppBar>
    </div>
  );
}

export default HeaderBar;
