import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../login/LoginPage";
import HomePage from "../homepage/HomePage";
import DeviceListPage from "../devicelist/DeviceListPage";
import LogListPage from "../loglist/LogListPage";
import PathNotFoundPage from "../general/PathNotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/Login" render={() => <LoginPage />} />
        <ProtectedRoute
          path="/Home"
          isUserPage
          render={() => {
            return <HomePage />;
          }}
        />
        <ProtectedRoute
          path="/Devices"
          isUserPage
          render={() => {
            return <DeviceListPage />;
          }}
        />
        <ProtectedRoute
          path="/Streaming"
          isUserPage
          render={() => {
            return <StreamListPage />;
          }}
        />
        <ProtectedRoute
          path="/Logs"
          isUserPage
          render={() => {
            return <LogListPage />;
          }}
        />
        <Route path="/">
          <PathNotFoundPage />;
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
