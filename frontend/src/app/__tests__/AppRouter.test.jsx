import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import AppRouter from "../AppRouter";
import LoginPage from "../../login/LoginPage";
import HomePage from "../../homepage/HomePage";
import DeviceDetailsPage from "../../deviceDetailsPage/DeviceDetailsPage";
import DeviceListPage from "../../devicelist/DeviceListPage";
import CreateStreamPage from "../../createStream/CreateStreamPage";
import StreamListPage from "../../streamlist/StreamListPage";
import LogListPage from "../../loglist/LogListPage";
import PathNotFoundPage from "../../general/PathNotFoundPage";
import CreateUserPage from "../../admin/createUser/CreateUserPage";
import DeviceInfo from "../../model/DeviceInfo";
import StreamDetailsPage from "../../streamDetails/StreamDetailsPage";
import StreamInfo from "../../model/StreamInfo";
import StreamStatisticsPage from "../../streamDetails/DetailedStreamStatistics/StreamStatisticsPage";
import SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

const dummyLocation = {
  state: {
    device: new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 1])
  }
};

const dummySender = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 2]);
const dummyReceiver = new DeviceInfo(2, 2, 2, 2, 2, 2, [3, 4]);

const dummyStreamLocation = {
  state: {
    stream: new StreamInfo(1, dummySender, dummyReceiver, 2, 3)
  }
};

describe("<AppRouter/> functional component", () => {
  let wrapper;
  it("returns a component with the correct elements", () => {
    wrapper = Enzyme.shallow(<AppRouter />);

    const protectedRoutes = wrapper.find(ProtectedRoute);
    expect(protectedRoutes).toHaveLength(10);

    const loginRoute = protectedRoutes.at(0);
    expect(loginRoute.props().path).toEqual("/Login");
    const loginPage = loginRoute.props().render();
    expect(loginPage.type).toEqual(LoginPage);

    const homeRoute = protectedRoutes.at(1);
    expect(homeRoute.props().path).toEqual("/Home");
    expect(homeRoute.props().authenticationRequired).toBe(true);
    const homePage = homeRoute.props().render();
    expect(homePage.type).toEqual(HomePage);

    const deviceDetailsRoute = protectedRoutes.at(2);
    expect(deviceDetailsRoute.props().path).toEqual(
      "/Devices/Details/:serialNumber"
    );
    expect(deviceDetailsRoute.props().authenticationRequired).toBe(true);
    const deviceDetailsPage = deviceDetailsRoute.props().render(dummyLocation);
    expect(deviceDetailsPage.type).toEqual(DeviceDetailsPage);

    const deviceListRoute = protectedRoutes.at(3);
    expect(deviceListRoute.props().path).toEqual("/Devices");
    expect(deviceListRoute.props().authenticationRequired).toBe(true);
    const deviceListPage = deviceListRoute.props().render();
    expect(deviceListPage.type).toEqual(DeviceListPage);

    const createStreamRoute = protectedRoutes.at(4);
    expect(createStreamRoute.props().path).toEqual("/Streams/New");
    expect(createStreamRoute.props().authenticationRequired).toBe(true);
    const createStreamPage = createStreamRoute.props().render();
    expect(createStreamPage.type).toEqual(CreateStreamPage);

    const streamStatsRoute = protectedRoutes.at(5);
    expect(streamStatsRoute.props().path).toEqual(
      `/Streams/Details/:streamId/Statistics`
    );
    expect(streamStatsRoute.props().authenticationRequired).toBe(true);
    const streamStatsPage = streamStatsRoute.props().render();
    expect(streamStatsPage.type).toEqual(StreamStatisticsPage);

    const streamDetailsRoute = protectedRoutes.at(6);
    expect(streamDetailsRoute.props().path).toEqual(
      "/Streams/Details/:streamId"
    );
    expect(streamDetailsRoute.props().authenticationRequired).toBe(true);
    const streamDetailsPage = streamDetailsRoute
      .props()
      .render(dummyStreamLocation);
    expect(streamDetailsPage.type).toEqual(StreamDetailsPage);

    const streamListRoute = protectedRoutes.at(7);
    expect(streamListRoute.props().path).toEqual("/Streams");
    expect(streamListRoute.props().authenticationRequired).toBe(true);
    const streamListPage = streamListRoute.props().render();
    expect(streamListPage.type).toEqual(StreamListPage);

    const logListRoute = protectedRoutes.at(8);
    expect(logListRoute.props().path).toEqual("/Logs");
    expect(logListRoute.props().authenticationRequired).toBe(true);
    const logListPage = logListRoute.props().render();
    expect(logListPage.type).toEqual(LogListPage);

    const createUserRoute = protectedRoutes.at(9);
    expect(createUserRoute.props().path).toEqual("/Admin/New");
    expect(createUserRoute.props().authenticationRequired).toBe(true);
    const createUserPage = createUserRoute.props().render();
    expect(createUserPage.type).toEqual(CreateUserPage);

    const route = wrapper.find(Route);
    expect(route).toHaveLength(1);
    const pathNotFoundRoute = route.at(0);
    expect(pathNotFoundRoute.props().path).toEqual("/");
    const pathNotFoundPage = pathNotFoundRoute.find(PathNotFoundPage);
    expect(pathNotFoundPage).toHaveLength(1);

    const snackbar = wrapper.find(SnackbarMessage);
    expect(snackbar).toHaveLength(1);
  });
});
