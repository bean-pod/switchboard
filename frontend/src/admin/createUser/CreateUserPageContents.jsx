import React from "react";
import PropTypes from "prop-types";

import FormFailedDialog from "../../general/userForm/FormFailedDialog";
import { createUser } from "../../api/UserManagementApi";
import CreateUserFormConsole from "./CreateUserFormConsole";

export default class CreateUserPageContents extends React.Component {
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
    createUser({ username, password })
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
        <CreateUserFormConsole handleSubmit={this.handleSubmit} />
        <FormFailedDialog
          ref={this.dialogElement}
          title="Failed to create user"
          errorMessage={dialogMessage}
        />
      </>
    );
  }
}

CreateUserPageContents.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
