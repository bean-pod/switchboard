import React from "react";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import FormFailedDialog from "../general/userForm/FormFailedDialog";
import LoginFormConsole from "./LoginFormConsole";
import { logIn } from "../api/AuthenticationApi";

class LoginPageContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogMessage: ""
    };
    this.dialogElement = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.setDialogMessage = this.setDialogMessage.bind(this);
  }

  handleSubmit(username, password) {
    const { history } = this.props;
    logIn({ username, password })
      .then(() => {
        history.push("/Home");
      })
      .catch((error) => {
        this.openDialog();
        this.setDialogMessage(error.message);
      });
  }

  setDialogMessage(message) {
    this.setState({
      dialogMessage: message
    });
  }

  openDialog() {
    this.dialogElement.current.openDialog();
  }

  render() {
    const { dialogMessage } = this.state;
    return (
      <>
        <LoginFormConsole handleSubmit={this.handleSubmit} />
        <FormFailedDialog
          ref={this.dialogElement}
          title="Login failed"
          errorMessage={dialogMessage}
        />
      </>
    );
  }
}

export default withRouter(LoginPageContents);

LoginPageContents.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  }).isRequired
};
