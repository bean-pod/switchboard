import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../login/LoginPage";
import HomePage from "../homepage/HomePage";
import PathNotFoundPage from "../general/PathNotFoundPage";
import UnprotectedRoute from "./UnprotectedRoute";

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { handleLogin, handleLogout, authenticated, admin } = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <UnprotectedRoute
            path="/Login"
            authenticated={authenticated}
            render={() => (
              <LoginPage
                authenticated={authenticated}
                handleLogin={handleLogin}
              />
            )}
          />
          <ProtectedRoute
            path="/Home"
            authenticated={authenticated}
            render={() => {
              return (
                <HomePage
                  authenticated={authenticated}
                  handleLogout={handleLogout}
                  admin={admin}
                />
              );
            }}
          />
          <Route path="/">
            <PathNotFoundPage
              authenticated={authenticated}
              handleLogout={handleLogout}
            />
            ;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

AppRouter.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  authenticated: PropTypes.func.isRequired,
  admin: PropTypes.func.isRequired
};
