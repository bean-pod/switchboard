import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../login/LoginPage";
import HomePage from "../homepage/HomePage";
import DeviceListPage from "../devicelist/DeviceListPage";
import DeviceDetailsPage from "../deviceDetails/DeviceDetailsPage";
import StreamListPage from "../streamlist/StreamListPage";
import CreateStreamPage from "../createStream/CreateStreamPage";
import LogListPage from "../loglist/LogListPage";
import CreateUserPage from "../admin/createUser/CreateUserPage";
import StreamDetailsPage from "../streamDetails/StreamDetailsPage";
import PathNotFoundPage from "../general/PathNotFoundPage";
import StreamStatisticsPage from "../streamDetails/DetailedStreamStatistics/StreamStatisticsPage";
import SnackbarMessage from "../general/SnackbarMessage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/Login" render={() => <LoginPage />} />
        <ProtectedRoute
          path="/Home"
          authenticationRequired
          render={() => {
            return <HomePage />;
          }}
        />
        <ProtectedRoute
          path="/Devices/Details/:serialNumber"
          authenticationRequired
          render={(location) => {
            return <DeviceDetailsPage location={location} />;
          }}
        />
        <ProtectedRoute
          path="/Devices"
          authenticationRequired
          render={(location) => {
            return <DeviceListPage location={location} />;
          }}
        />
        <ProtectedRoute
          path="/Streams/New"
          authenticationRequired
          render={() => {
            return <CreateStreamPage />;
          }}
        />
        <ProtectedRoute
          path="/Streams/Details/:streamId/Statistics"
          authenticationRequired
          render={(location) => {
            return <StreamStatisticsPage location={location} />;
          }}
        />
        <ProtectedRoute
          path="/Streams/Details/:streamId"
          authenticationRequired
          render={(location) => {
            return <StreamDetailsPage location={location} />;
          }}
        />
        <ProtectedRoute
          path="/Streams"
          authenticationRequired
          render={() => {
            return <StreamListPage />;
          }}
        />
        <ProtectedRoute
          path="/Logs"
          authenticationRequired
          render={() => {
            return <LogListPage />;
          }}
        />
        <ProtectedRoute
          path="/Admin/New"
          authenticationRequired
          render={() => {
            return <CreateUserPage />;
          }}
        />
        <Route path="/">
          <PathNotFoundPage />
        </Route>
      </Switch>
      <SnackbarMessage />
    </BrowserRouter>
  );
}
