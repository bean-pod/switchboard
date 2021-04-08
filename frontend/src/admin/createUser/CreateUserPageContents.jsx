import React from "react";

import { createUser } from "../../api/UserManagementApi";
import CreateUserFormConsole from "./CreateUserFormConsole";
import { snackbar } from "../../general/SnackbarMessage";

export default class CreateUserPageContents extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(username, password) {
    createUser({ username, password })
      .then(() => {
        snackbar("success", `User ${username} successfully created!`);
      })
      .catch((error) => {
        snackbar("error", `Failed to create user: ${error.message}`);
      });
  }

  render() {
    return <CreateUserFormConsole handleSubmit={this.handleSubmit} />;
  }
}
