import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import UnprotectedRoute from "./UnprotectedRoute";

import LoginPage from "../login/LoginPage";
import HomePage from "../homepage/HomePage";
import PathNotFoundPage from "../general/PathNotFoundPage";


export default function AppRouter() {
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
