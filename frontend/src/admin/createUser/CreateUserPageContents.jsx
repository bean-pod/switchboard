import React from "react";
import FormConsole from "../../general/userForm/FormConsole";
import { createUser } from "../../api/UserManagementApi";
import { snackbar } from "../../general/SnackbarMessage";

function handleSubmit(username, password) {
  createUser({ username, password })
    .then(() => {
      snackbar("success", `User ${username} successfully created!`);
    })
    .catch((error) => {
      snackbar("error", `Failed to create user: ${error.message}`);
    });
}

export default class CreateUserPageContents extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = handleSubmit;
  }

  render() {
    return (
      <>
        <FormConsole
          handleSubmit={this.handleSubmit}
          buttonName="Create"
          isValidate
          passwordError={{ upperbound: 5, lowerbound: 0 }}
          passwordInputProps={{ maxLength: 20, minLength: 5 }}
          passwordHelperText="Password must be between 5 to 20 characters"
        />
      </>
    );
  }
}
