import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { AccountCircle, Home } from "@material-ui/icons/";
import { NavLink } from "react-router-dom";
import HeaderBar from "../HeaderBar";

import * as AuthApi from "../../api/AuthenticationApi"

Enzyme.configure({ adapter: new Adapter() });
describe("<HeaderBar/> functional Component", () => {
  let wrapper;

  const mockPush = jest.fn();
  const mockGo = jest.fn();
  const mockHistory = {
    push: mockPush,
    go: mockGo
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(<HeaderBar.WrappedComponent history={mockHistory}/>);
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
    it("Contains two <IconButton/> components", () => {
      expect(wrapper.find(IconButton)).toHaveLength(2);
    });
    it("<IconButton/> 1 has expected props", () => {
      const buttonProps = wrapper.find(IconButton).at(0).props();
      expect(buttonProps.edge).toBe("start");
      expect(buttonProps.color).toBe("inherit");
      expect(buttonProps["aria-label"]).toBe("menu");
    });
    it("<IconButton/> 2 has expected props", () => {
      const buttonProps = wrapper.find(IconButton).at(1).props();
      expect(buttonProps.id).toBe("acctBtn");
      expect(buttonProps.color).toBe("inherit");
    });
    it("Contains <Home/> icon component", () => {
      expect(wrapper.find(Home)).toHaveLength(1);
    });
    it("Contains <AccountCircle/> icon component", () => {
      expect(wrapper.find(AccountCircle)).toHaveLength(1);
    });
  });
  describe("handleLogout() function", () => {
    beforeEach(()=>{
      jest.spyOn(AuthApi, "handleLogout")
      wrapper.instance().handleLogout();
    })
    it("calls AuthApi.handleLogout() function", ()=>{
      expect(AuthApi.handleLogout).toBeCalled();
    });
    it("calls history.push() with expected value", ()=>{
      expect(mockPush).toBeCalledWith("/Login");
    });
    it("calls history.go() with expected value", ()=>{
      expect(mockGo).toBeCalledWith(0);
    });
  });
});
