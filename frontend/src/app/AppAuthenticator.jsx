import React from "react";
import Cookies from "js-cookie";
import AppRouter from "./AppRouter";

export default class Authenticator extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   authenticated: false,
    //   admin: false
    // };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.authenticate = this.authenticate.bind(this);

    this.getBeans = this.getBeans.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getAdminToken = this.getAdminToken.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);
  }

  getAccessToken() {
    return Cookies.get("access_token");
  }

  getAdminToken() {
    return Cookies.get("admin_token");
  }

  getRefreshToken() {
    return Cookies.get("refresh_token");
  }

  getBeans() {
    return Cookies.get("beans");
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }

  isAdmin() {
    return !!this.getAdminToken();
  }

  async authenticate() {
    //   if (getRefreshToken()) {
    try {
      // const tokens = await refreshTokens() // call an API, returns tokens

      const tokens = {
        access_token: true,
        admin_token: true,
        refresh_token: true
      };
      const expires = (tokens.expires_in || 60 * 60) * 1000;
      const inOneHour = new Date(new Date().getTime() + expires);

      // you will have the exact same setters in your Login page/app too
      Cookies.set("access_token", tokens.access_token);
      Cookies.set("admin_token", tokens.admin_token, { expires: inOneHour });
      Cookies.set("refresh_token", tokens.refresh_token);

      return true;
    } catch (error) {
      // redirectToLogin()
      return false;
    }
    // }
    // // redirectToLogin()
    // return false;
  }

  handleLogin() {
    // API call.then(response =>
    this.authenticate();
    // const {isAdmin} = response;
    // const isAdmin = true;
    // this.setState({
    //   authenticated: true,
    //   admin: isAdmin
    // });
  }

  handleLogout() {
    // API call.then(response =>
    Cookies.remove("access_token");
    Cookies.remove("admin_token");
    Cookies.remove("refresh_token");

    // this.setState({
    //   authenticated: false,
    //   admin: false
    // });
  }

  render() {
    // const { authenticated, admin } = this.state;
    return (
      <AppRouter
        handleLogin={this.handleLogin}
        handleLogout={this.handleLogout}
        authenticated={this.isAuthenticated}
        admin={this.isAdmin}
        getBeans={this.getBeans}
      />
    );
  }
}
