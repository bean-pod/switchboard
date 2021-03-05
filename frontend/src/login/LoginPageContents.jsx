import React from "react";

import LoginFailedDialog from "./LoginFailedDialog";
import LoginConsole from "./LoginConsole";
import * as AuthenticationApi from "../api/AuthenticationApi";

export default class LoginPageContents extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      dialogOpen: false,
      dialogMessage: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setDialogOpen = this.setDialogOpen.bind(this);
    this.setDialogMessage = this.setDialogMessage.bind(this);
  }

  handleSubmit(username, password)  {
    AuthenticationApi.logIn({ username, password }).catch((error) => {
      this.setState(
        {
          dialogOpen:true,
          dialogMessage:error.message
        }
      )
    });
  };

  setDialogOpen(open){
    this.setState({
      dialogOpen: open
    })
  }
  setDialogMessage(message){
    this.setState({
      dialogMessage:message
    })
  }

  render(){
    return (
      <React.Fragment>
        <LoginConsole handleSubmit={handleSubmit} />
        <LoginFailedDialog
          open={dialogOpen}
          setOpen={this.setDialogOpen}
          message={dialogMessage}
        />
      </React.Fragment>
    );
  }
}
