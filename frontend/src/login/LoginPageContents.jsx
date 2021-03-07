import React from "react";
import PropTypes from "prop-types";

import LoginFailedDialog from "./LoginFailedDialog";
import LoginConsole from "./LoginConsole";
import { handleLogin, logIn } from "../api/AuthenticationApi";

export default class LoginPageContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      dialogMessage: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setDialogOpen = this.setDialogOpen.bind(this);
    this.setDialogMessage = this.setDialogMessage.bind(this);
  }

  handleSubmit(username, password) {
    const { history } = this.props;
    handleLogin();
    logIn({ username, password }).catch((error) => {
      this.setState({
        dialogOpen: true,
        dialogMessage: error.message
      });
    });
    history.push("/Home");
    history.go(0);
  }

  setDialogOpen(open) {
    this.setState({
      dialogOpen: open
    });
  }

  setDialogMessage(message) {
    this.setState({
      dialogMessage: message
    });
  }

  render() {
    const { dialogOpen, dialogMessage } = this.state;
    return (
      <>
        <LoginConsole handleSubmit={this.handleSubmit} />
        <LoginFailedDialog
          open={dialogOpen}
          setOpen={this.setDialogOpen}
          message={dialogMessage}
        />
      </>
    );
  }
}

LoginPageContents.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  }).isRequired
};
