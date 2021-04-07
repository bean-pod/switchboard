import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons/";
import { NavLink } from "react-router-dom";
import HeaderBar from "../HeaderBar";

import * as AuthApi from "../../api/AuthenticationApi";
import * as AuthUtil from "../../api/AuthenticationUtil"
import LogoutMenuOpener from "../logoutMenu/LogoutMenuOpener";

Enzyme.configure({ adapter: new Adapter() });
describe("<HeaderBar/> functional Component", () => {
  let wrapper;

  const mockPush = jest.fn();
  const mockHistory = {
    push: mockPush
  };

  beforeEach(() => {
    jest.spyOn(AuthUtil, "isAuthenticated").mockImplementation(()=> true);
    wrapper = Enzyme.shallow(
      <HeaderBar.WrappedComponent history={mockHistory} />
    );
  });

  describe("render() function returns a component that", () => {
    it("Contains one <div/> component with expected props", () => {
      expect(wrapper.find(".headerBar")).toHaveLength(1);
    });
    it("Contains one <AppBar/> component with expected props", () => {
      expect(wrapper.find(AppBar)).toHaveLength(1);
    });
    it("Contains one <Toolbar/> component with expected props", () => {
      expect(wrapper.find(Toolbar)).toHaveLength(1);
    });
    it("Contains one <NavLink/> component with expected props", () => {
      expect(wrapper.find(NavLink)).toHaveLength(1);
      const navLinkProps = wrapper.find(NavLink).at(0).props();
      expect(navLinkProps.to).toBe("/Home");
    });
    it("Contains one <div/> component with expected props", () => {
      expect(wrapper.find(".headerTitle")).toHaveLength(2);
      expect(wrapper.find(".headerTitle").first().text()).toBe("Switchboard");
    });
    it("Contains 1 <IconButton/> component with expected props", () => {
      expect(wrapper.find(IconButton)).toHaveLength(1);

      const buttonProps = wrapper.find(IconButton).at(0).props();
      expect(buttonProps.edge).toBe("start");
      expect(buttonProps.color).toBe("inherit");
      expect(buttonProps["aria-label"]).toBe("home");
    });
    it("Contains <Home/> icon component", () => {
      expect(wrapper.find(Home)).toHaveLength(1);
    });
    it("Contains 1 <LogoutMenuOpener/> component with expected props", () => {
      const components= wrapper.find(LogoutMenuOpener);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();
      const expected = {
        disabled: !AuthUtil.isAuthenticated(),
        handleLogout: wrapper.instance().handleLogout
      }
      expect(props).toStrictEqual(expected);
    });
  });
  describe("handleLogout() function", () => {
    beforeEach(() => {
      jest.spyOn(AuthApi, "logOut");
      wrapper.instance().handleLogout();
    });
    it("calls AuthApi.logOut() function", () => {
      expect(AuthApi.logOut).toBeCalled();
    });
    it("calls history.push() with expected value", () => {
      expect(mockPush).toBeCalledWith("/Login");
    });
  });
});
