import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

import * as AuthenticationApi from "../../api/AuthenticationApi";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/AuthenticationApi");
jest.spyOn(AuthenticationApi, "isAuthenticated");

describe("<ProtectedRoute/> class component", () => {
  let wrapper;
  const dummyPath = "somePath";
  const dummyRender = jest.fn();
  const dummyLocation = "someLocation";

  describe("render() function should return a component that", () => {
    it("Contains one <Route/> component with expected props", () => {
      wrapper = Enzyme.shallow(
        <ProtectedRoute path={dummyPath} render={dummyRender} />
      );

      const routeComponent = wrapper.find(Route);
      expect(routeComponent).toHaveLength(1);
      const props = routeComponent.first().props();
      expect(props.exact).toBeTruthy();
      expect(props.path).toEqual(dummyPath);
      expect(props.render).toBeInstanceOf(Function);
    });
  });
  describe("component() function", () => {
    describe("when AuthApi.isAuthenticated() returns true", () => {
      beforeEach(() => {
        AuthenticationApi.isAuthenticated.mockReturnValue(true);
      });
      describe("if prop authenticationRequired is true", () => {
        it("should call the passed render function", () => {
          wrapper = Enzyme.shallow(
            <ProtectedRoute path={dummyPath} render={dummyRender} authenticationRequired />
          );

          wrapper.instance().component(dummyLocation);
          expect(dummyRender).toHaveBeenCalledWith(dummyLocation);
        });
      });
      describe("if prop authenticationRequired is false", () => {
        it("should return a <Redirect/> component", () => {
          wrapper = Enzyme.shallow(
            <ProtectedRoute path={dummyPath} render={dummyRender} />
          );

          const redirect = wrapper.instance().component(dummyLocation);
          expect(redirect.props.to).toStrictEqual({ pathname: "/Home" });
        });
      });
    });
    describe("when AuthApi.isAuthenticated() returns false", () => {
      beforeEach(() => {
        AuthenticationApi.isAuthenticated.mockReturnValue(false);
      });
      describe("if prop authenticationRequired is true", () => {
        it("should return a <Redirect/> component with expected props", () => {
          wrapper = Enzyme.shallow(
            <ProtectedRoute path={dummyPath} render={dummyRender} authenticationRequired />
          );

          const redirect = wrapper.instance().component(dummyLocation);
          expect(redirect.props.to).toStrictEqual({ pathname: "/Login" });
        });
      });
      describe("if prop authenticationRequired is false", () => {
        it("should call the passed render function", () => {
          wrapper = Enzyme.shallow(
            <ProtectedRoute path={dummyPath} render={dummyRender} />
          );

          wrapper.instance().component(dummyLocation);
          expect(dummyRender).toHaveBeenCalledWith(dummyLocation);
        });
      });
    });
  });
});
