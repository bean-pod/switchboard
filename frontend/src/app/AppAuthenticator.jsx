import React from "react";
import AppRouter from "./AppRouter";

export default class Authenticator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      admin: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    // API call.then(response =>
    // const {isAdmin} = response;
    const isAdmin = true;
    this.setState({
      authenticated: true,
      admin: isAdmin
    });
  }

  handleLogout() {
    // API call.then(response =>
    this.setState({
      authenticated: false,
      admin: false
    });
  }

  render() {
    const { authenticated, admin } = this.state;
    alert(authenticated)
    return (
      <AppRouter
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
        authenticated={authenticated}
        admin={admin}
      />
    );
  }
}
