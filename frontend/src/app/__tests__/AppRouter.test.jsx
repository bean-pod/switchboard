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
import DeviceInfo from "../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

const dummyLocation = {
  state: {
    device: new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 1])
  }
};

describe("<AppRouter/> functional component", () => {
  let wrapper;
  it("returns a component with the correct elements", () => {
    wrapper = Enzyme.shallow(<AppRouter />);

    const protectedRoutes = wrapper.find(ProtectedRoute);
    expect(protectedRoutes).toHaveLength(7);

    const loginRoute = protectedRoutes.at(0);
    expect(loginRoute.props().path).toEqual("/Login");
    const loginPage = loginRoute.props().render();
    expect(loginPage.type).toEqual(LoginPage);

    const homeRoute = protectedRoutes.at(1);
    expect(homeRoute.props().path).toEqual("/Home");
    expect(homeRoute.props().isUserPage).toBeTruthy();
    const homePage = homeRoute.props().render();
    expect(homePage.type).toEqual(HomePage);

    const deviceDetailsRoute = protectedRoutes.at(2);
    expect(deviceDetailsRoute.props().path).toEqual(
      "/Devices/Details/:serialNumber"
    );
    expect(deviceDetailsRoute.props().isUserPage).toBeTruthy();
    const deviceDetailsPage = deviceDetailsRoute.props().render(dummyLocation);
    expect(deviceDetailsPage.type).toEqual(DeviceDetailsPage);

    const deviceListRoute = protectedRoutes.at(3);
    expect(deviceListRoute.props().path).toEqual("/Devices");
    expect(deviceListRoute.props().isUserPage).toBeTruthy();
    const deviceListPage = deviceListRoute.props().render();
    expect(deviceListPage.type).toEqual(DeviceListPage);

    const createStreamRoute = protectedRoutes.at(4);
    expect(createStreamRoute.props().path).toEqual("/Streams/New");
    expect(createStreamRoute.props().isUserPage).toBeTruthy();
    const createStreamPage = createStreamRoute.props().render();
    expect(createStreamPage.type).toEqual(CreateStreamPage);

    const streamListRoute = protectedRoutes.at(5);
    expect(streamListRoute.props().path).toEqual("/Streams");
    expect(streamListRoute.props().isUserPage).toBeTruthy();
    const streamListPage = streamListRoute.props().render();
    expect(streamListPage.type).toEqual(StreamListPage);

    const logListRoute = protectedRoutes.at(6);
    expect(logListRoute.props().path).toEqual("/Logs");
    expect(logListRoute.props().isUserPage).toBeTruthy();
    const logListPage = logListRoute.props().render();
    expect(logListPage.type).toEqual(LogListPage);

    const route = wrapper.find(Route);
    expect(route).toHaveLength(1);
    const pathNotFoundRoute = route.at(0);
    expect(pathNotFoundRoute.props().path).toEqual("/");
    const pathNotFoundPage = pathNotFoundRoute.find(PathNotFoundPage);
    expect(pathNotFoundPage).toHaveLength(1);
  });
});