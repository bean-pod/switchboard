import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import {
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import LogoutMenu from "../LogoutMenu";

Enzyme.configure({ adapter: new Adapter() });

describe("<LogoutMenu/> functional component", () => {
  let wrapper;
  const dummyAnchor = { thing: "thing" };
  const dummyOpen = true;
  let mockHandleClose;
  let mockHandleLogout;

  describe("returns a component that", () => {
    beforeEach(() => {
      mockHandleClose = jest.fn();
      mockHandleLogout = jest.fn();
      wrapper = Enzyme.shallow(
        <LogoutMenu
          anchor={dummyAnchor}
          open={dummyOpen}
          handleClose={mockHandleClose}
          handleLogout={mockHandleLogout}
        />
      );
    });
    it("Contains one <Popper/> component with expected props", () => {
      const components = wrapper.find(Popper);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();
      const expected = {
        open: dummyOpen,
        anchorEl: dummyAnchor,
        transition: true,
        disablePortal: true
      };
      expect(props).toMatchObject(expected);
    });
    it("Contains one <Grow/> component with expected props", () => {
      const components = wrapper.find(Grow);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();
      const expected = {
        in: dummyOpen,
        style: { transformOrigin: "center top" }
      };
      expect(props).toMatchObject(expected);
    });
    it("Contains one <Paper/> component with expected props", () => {
      const components = wrapper.find(Paper);
      expect(components).toHaveLength(1);
    });
    it("Contains one <ClickAwayListener/> component with expected props", () => {
      const components = wrapper.find(ClickAwayListener);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();
      const expected = {
        onClickAway: mockHandleClose
      };
      expect(props).toMatchObject(expected);
    });
    it("Contains one <MenuList/> component with expected props", () => {
      const components = wrapper.find(MenuList);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();
      const expected = {
        autoFocusItem: dummyOpen,
        id: "menu-list-grow"
      };
      expect(props).toMatchObject(expected);
    });
    it("Contains 4 <MenuItem/> components with expected props", () => {
      const components = wrapper.find(MenuItem);
      expect(components).toHaveLength(4);
    });
    it("<MenuItem/> 0 has expected props", () => {
      const components = wrapper.find(MenuItem);
      const props = components.at(0).props();

      const expected = {
        disabled: true,
        childrenType: "WithStyles(ForwardRef(Typography))"
      };
      expect(props.disabled).toBe(expected.disabled);
      expect(props.children.type.displayName).toBe(expected.childrenType);
    });
    it("<MenuItem/> 1 has expected props", () => {
      const components = wrapper.find(MenuItem);
      const props = components.at(1).props();

      const expected = "WithStyles(ForwardRef(Typography))";
      expect(props.children.type.displayName).toBe(expected);
    });
    it("<MenuItem/> 2 has expected props", () => {
      const components = wrapper.find(MenuItem);
      const props = components.at(2).props();

      const expected = "WithStyles(ForwardRef(Typography))";
      expect(props.children.type.displayName).toBe(expected);
    });
    it("<MenuItem/> 3 has expected props", () => {
      const components = wrapper.find(MenuItem);
      const props = components.at(3).props();

      const expected = {
        onClick: mockHandleLogout,
        children: <Typography color="error">Logout</Typography>
      };
      expect(props).toMatchObject(expected);
    });
    it("Contains 2 <NavLink/> components with expected props", () => {
      const components = wrapper.find(NavLink);
      expect(components).toHaveLength(2);
    });
    it("<NavLink/> 0 has expected props", () => {
      const components = wrapper.find(NavLink);
      const props = components.at(0).props();

      const expected = {
        to: "/Home",
        className: "hideLinkStyle"
      };
      expect(props).toMatchObject(expected);
    });
    it("<NavLink/> 1 has expected props", () => {
      const components = wrapper.find(NavLink);
      const props = components.at(1).props();

      const expected = {
        to: "/Devices",
        className: "hideLinkStyle"
      };
      expect(props).toMatchObject(expected);
    });
    it("Contains 2 <Typography/> components with expected props", () => {
      const components = wrapper.find(Typography);
      expect(components).toHaveLength(4);
    });
    it("<Typography/> 0 has expected props", () => {
      const components = wrapper.find(Typography);
      const props = components.at(0).props();

      const expected = {
        color: "textSecondary",
        children: "Quick Actions"
      };
      expect(props).toMatchObject(expected);
    });
    it("<Typography/> 1 has expected props", () => {
      const components = wrapper.find(Typography);
      const props = components.at(1).props();

      const expected = {
        color: "textPrimary",
        children: "Dashboard"
      };
      expect(props).toMatchObject(expected);
    });
    it("<Typography/> 2 has expected props", () => {
      const components = wrapper.find(Typography);
      const props = components.at(2).props();

      const expected = {
        color: "textPrimary",
        children: "My Devices"
      };
      expect(props).toMatchObject(expected);
    });
    it("<Typography/> 3 has expected props", () => {
      const components = wrapper.find(Typography);
      const props = components.at(3).props();

      const expected = {
        color: "error",
        children: "Logout"
      };
      expect(props).toMatchObject(expected);
    });
  });
});
