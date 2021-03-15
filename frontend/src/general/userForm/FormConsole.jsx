import React from "react";
import { Button, Container, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

export default class FormConsole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  onSubmit(event) {
    const { handleSubmit } = this.props;
    const { username, password } = this.state;
    event.preventDefault();
    handleSubmit(username, password);
  }

  setUsername(username) {
    this.setState({
      username
    });
  }

  setPassword(password) {
    this.setState({
      password
    });
  }

  render() {
    const { buttonName, isValidate, isCreate } = this.props;
    const { password } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div>
          <form noValidate={!isValidate} onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(event) => this.setUsername(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              error={
                isCreate
                  ? password.length < 5 && password.length > 0
                  : undefined
              }
              inputProps={
                isCreate ? { maxLength: 20, minLength: 5 } : undefined
              }
              helperText={
                isCreate
                  ? "Password must be between 5 to 20 characters"
                  : undefined
              }
              autoComplete="current-password"
              onChange={(event) => this.setPassword(event.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              {buttonName}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

FormConsole.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired,
  isValidate: PropTypes.bool,
  isCreate: PropTypes.bool
};

FormConsole.defaultProps = {
  isValidate: false,
  isCreate: false
};
