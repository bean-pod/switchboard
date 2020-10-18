import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Badge,
  Typography,
  makeStyles
} from "@material-ui/core"
import {
  AccountCircle,
  Notifications,
  Menu
} from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function HeaderBar() {
  const classes = useStyles();
  return (
    <div className="HeaderBar" >
      <AppBar position="static">
        <Toolbar className="darkGrey" >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <div className="headerTitle">
            Switchboard
          </div>
          <IconButton color="inherit"><Notifications /></IconButton>
          <IconButton color="inherit"><AccountCircle /></IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default HeaderBar;
