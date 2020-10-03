import React from 'react';
import {
  AppBar,
  Toolbar
} from "@material-ui/core"

function HeaderBar() {
  return (
    <div className="HeaderBar">
      <AppBar position="static">
        <Toolbar></Toolbar>
        </AppBar>
    </div>
  );
}

export default HeaderBar;
