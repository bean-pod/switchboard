import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../login/LoginPage";
import HomePage from "../homepage/HomePage";
import PathNotFoundPage from "../general/PathNotFoundPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          path="/Login"
          render={() => <LoginPage />}
        />
        <Route
          path="/Home"
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
