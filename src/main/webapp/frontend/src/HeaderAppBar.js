import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles
} from "@material-ui/core"
import {
  AccountCircle,
  Notifications,
  Menu
} from '@material-ui/icons/';



export default class HeaderBar extends React.Component{
  constructor(props){
    super(props);
    this.classes = makeStyles((theme) => ({
      menuButton: {
        marginRight: theme.spacing(2),
      },
    }));
  }
  render(){
    return (
    <React.Fragment>
      <div className="HeaderBar" >
        <AppBar position="static">
          <Toolbar className="darkGrey" >
            <IconButton edge="start" className={this.classes.menuButton} color="inherit" aria-label="menu">
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
    </React.Fragment>
  );
  }
  
}
