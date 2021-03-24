import React from "react";
import PropTypes from "prop-types";
import { Button, TextField, Grid } from "@material-ui/core";
import DashboardCard from "../dashboard/DashboardCard";

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
    this.setPasswordError = this.setPasswordError.bind(this);
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

  setPasswordError() {
    const { passwordError } = this.props;
    const { password } = this.state;
    if (passwordError) {
      return (
        password.length < passwordError.upperbound &&
        password.length > passwordError.lowerbound
      );
    }
    return undefined;
  }

  render() {
    const {
      buttonName,
      isValidate,
      passwordInputProps,
      passwordHelperText
    } = this.props;
    return (
      <Grid
        container
        justify="center"
        alignItems="stretch"
        direction="row"
        spacing={3}
      >
        <Grid item xs={6}>
          <DashboardCard title="">
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
                  error={this.setPasswordError}
                  inputProps={passwordInputProps}
                  helperText={passwordHelperText}
                  autoComplete="current-password"
                  onChange={(event) => this.setPassword(event.target.value)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  {buttonName}
                </Button>
              </form>
            </div>
          </DashboardCard>
        </Grid>
      </Grid>
    );
  }
}

FormConsole.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  buttonName: PropTypes.string.isRequired,
  isValidate: PropTypes.bool,
  passwordError: PropTypes.shape({
    upperbound: PropTypes.number.isRequired,
    lowerbound: PropTypes.number.isRequired
  }),
  passwordInputProps: PropTypes.shape({
    maxLength: PropTypes.number.isRequired,
    minLength: PropTypes.number.isRequired
  }),
  passwordHelperText: PropTypes.string
};

FormConsole.defaultProps = {
  isValidate: false,
  passwordError: undefined,
  passwordInputProps: undefined,
  passwordHelperText: undefined
};
