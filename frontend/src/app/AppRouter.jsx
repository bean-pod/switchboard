import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../login/LoginPage";
import HomePage from "../homepage/HomePage";
import PathNotFoundPage from "../general/PathNotFoundPage";
import UnprotectedRoute from "./UnprotectedRoute";
import * as AuthenticationApi from "../api/AuthenticationApi";

export default class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated } = AuthenticationApi;
    return (
      <BrowserRouter>
        <Switch>
          <UnprotectedRoute
            path="/Login"
            isAuthenticated={isAuthenticated}
            render={() => <LoginPage />}
          />
          <ProtectedRoute
            path="/Home"
            isAuthenticated={isAuthenticated}
            render={() => {
              return <HomePage />;
            }}
          />
          <Route path="/">
            <PathNotFoundPage />;
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
