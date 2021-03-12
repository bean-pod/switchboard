import React from "react";
import PropTypes from "prop-types";

import axios from "axios";
import CreateUserFailedDialog from "./CreateUserFailedDialog";
import CreateUserConsole from "./CreateUserConsole";
import { getAuthorizationHeader } from "../../api/AuthenticationUtil";

export default class CreateUserPageContents extends React.Component {
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
    axios
      .post(
        process.env.REACT_APP_SIGNUP,
        {
          username,
          password,
          userRole: "USER"
        },
        getAuthorizationHeader()
      )
      .then(() => {
        history.push("/Admin");
        history.go(0);
      })
      .catch((error) => {
        this.setState({
          dialogOpen: true,
          dialogMessage: error.message
        });
      });
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
        <CreateUserConsole handleSubmit={this.handleSubmit} />
        <CreateUserFailedDialog
          open={dialogOpen}
          setOpen={this.setDialogOpen}
          message={dialogMessage}
        />
      </>
    );
  }
}

CreateUserPageContents.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  }).isRequired
};
