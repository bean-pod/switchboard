import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HeaderBar from "./general/HeaderBar";
import HomePage from "./homepage/HomePage";
import DeviceListPage from "./devicelist/DeviceListPage";
import StreamListPage from "./streamlist/StreamListPage";
import DeviceDetailsPage from "./deviceDetailsPage/DeviceDetailsPage";
import LogListPage from "./loglist/LogListPage";
import LoginPage from "./login/LoginPage";
import CreateStreamPage from "./createStream/CreateStreamPage";

import * as DeviceApi from "./api/DeviceApi";
import * as StreamApi from "./api/StreamApi";
import * as LogApi from "./api/LogApi";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderBar />
      <Switch>
        <Route exact path={["/", "/Home"]} component={HomePage} />
        <Route
          exact
          path="/Devices"
          render={() => <DeviceListPage dataSource={DeviceApi} />}
        />
        <Route
          exact
          path="/Streaming"
          render={() => <StreamListPage streamDataSource={StreamApi} />}
        />
        <Route
          exact
          path="/Streaming/New"
          render={() => <CreateStreamPage dataSource={DeviceApi} />}
        />
        <Route
          exact
          path="/Devices/Details/:deviceId"
          component={DeviceDetailsPage}
        />
        <Route
          exact
          path="/Logs"
          render={() => <LogListPage logsDataSource={LogApi} />}
        />
        <Route exact path="/Login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
