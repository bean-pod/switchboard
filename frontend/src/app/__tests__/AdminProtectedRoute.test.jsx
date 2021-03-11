import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Route } from "react-router-dom";
import AdminProtectedRoute from "../AdminProtectedRoute";

import * as AuthenticationUtil from "../../api/AuthenticationUtil";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/AuthenticationUtil");
jest.spyOn(AuthenticationUtil, "isAdmin");

describe("<AdminProtectedRoute/> class component", () => {
  let wrapper;
  const dummyPath = "somePath";
  const dummyRender = jest.fn();

  describe("render() function should return a component that", () => {
    it("Contains one <Route/> component with expected props", () => {
      wrapper = Enzyme.shallow(
        <AdminProtectedRoute render={dummyRender} path={dummyPath} />
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
    describe("when AuthApi.isAdmin() returns true", () => {
      beforeEach(() => {
        AuthenticationUtil.isAdmin.mockReturnValue(true);
      });
      it("should return a <ProtectedRoute> with expected props", () => {
        wrapper = Enzyme.shallow(
          <AdminProtectedRoute path={dummyPath} render={dummyRender} />
        );

        const protectedRoute = wrapper.instance().component();
        expect(protectedRoute.props.path).toEqual(dummyPath);
        expect(protectedRoute.props.render).toEqual(dummyRender);
      });
    });
    describe("when AuthApi.isAdmin() returns false", () => {
      beforeEach(() => {
        AuthenticationUtil.isAdmin.mockReturnValue(false);
      });
      it("should return a <Redirect/> component with pathname /Invalid", () => {
        wrapper = Enzyme.shallow(
          <AdminProtectedRoute path={dummyPath} render={dummyRender} />
        );

        const redirect = wrapper.instance().component();
        expect(redirect.props.to).toStrictEqual({ pathname: "/InvalidPath" });
      });
    });
  });
});
