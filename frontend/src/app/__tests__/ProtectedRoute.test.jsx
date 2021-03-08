import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import ProtectedRoute from "../ProtectedRoute";

Enzyme.configure({ adapter: new Adapter() });

describe("<ProtectedRoute/> class component", () => {
  let wrapper;
  const dummyPath = "somePath";
  const dummyRender = () => {
    return <div id="someChild" />;
  };
  describe("render() function should return a component that", () => {
    it("Contains one <Route/> component with expected props", () => {});
  });
  describe("component() function", () => {
    describe("when AuthApi.isAuthenticated() returns true", () => {
      describe("if prop isUserPage is true", () => {
        it("should call the passed render function", () => {
          wrapper = Enzyme.shallow(
            <ProtectedRoute path={dummyPath} render={dummyRender} isUserPage />
          );
        });
      });
      describe("if prop isUserPage is false", () => {
        it("should return a <Redirect/> component", () => {
          wrapper = Enzyme.shallow(
            <ProtectedRoute path={dummyPath} render={dummyRender} />
          );
          // expect redirect.props().to toStrictEqual {pathname:"Home"}
        });
      });
    });
    describe("when AuthApi.isAuthenticated() returns false", () => {
      describe("if prop isUserPage is true", () => {
        it("should return a <Redirect/> component with expected props", () => {
          wrapper = Enzyme.shallow(
            <ProtectedRoute path={dummyPath} render={dummyRender} isUserPage />
          );
        });
      });
      describe("if prop isUserPage is false", () => {
        it("should call the passed render function", () => {
          wrapper = Enzyme.shallow(
            <ProtectedRoute path={dummyPath} render={dummyRender} />
          );
        });
      });
    });
  });
});
