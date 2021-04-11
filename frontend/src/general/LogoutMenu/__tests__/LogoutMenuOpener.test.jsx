import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest
} from "@jest/globals";

import { IconButton } from "@material-ui/core";

import { AccountCircle } from "@material-ui/icons/";
import LogoutMenuOpener from "../LogoutMenuOpener";
import LogoutMenu from "../LogoutMenu";

Enzyme.configure({ adapter: new Adapter() });

describe("<LogoutMenuOpener/> class component", () => {
  let wrapper;
  const dummyDisabled = false;
  const mockHandleLogout = jest.fn();
  const mockRefElement = {
    current: { thing: "thing" }
  };

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  beforeEach(() => {
    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });
    wrapper = Enzyme.shallow(
      <LogoutMenuOpener
        disabled={dummyDisabled}
        handleLogout={mockHandleLogout}
      />
    );
  });
  describe("render() function returns a component that", () => {
    it("Contains 1 <IconButton/> component with expected props", () => {
      const components = wrapper.find(IconButton);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();

      const expected = {
        id: "acctBtn",
        color: "inherit",
        disabled: dummyDisabled,
        onClick: wrapper.instance().handleOpen,
        children: <AccountCircle />
      };

      expect(props).toMatchObject(expected);
    });
    it("Contains 1 <AccountCircle/> component with expected props", () => {
      const components = wrapper.find(AccountCircle);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();

      const expected = {};

      expect(props).toStrictEqual(expected);
    });
    it("Contains 1 <LogoutMenu/> component with expected props", () => {
      const components = wrapper.find(LogoutMenu);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();

      const expected = {
        anchor: mockRefElement.current,
        open: wrapper.state().open,
        handleLogout: mockHandleLogout,
        handleClose: wrapper.instance().handleClose
      };

      expect(props).toMatchObject(expected);
    });
  });
  it("handleClose() function should set the state to false", () => {
    wrapper.setState({ open: true });

    const expected = {
      open: false
    };
    wrapper.instance().handleClose();
    expect(wrapper.state()).toStrictEqual(expected);
  });
  it("handleOpen() function should set the state to true", () => {
    wrapper.setState({ open: false });

    const expected = {
      open: true
    };
    wrapper.instance().handleOpen();
    expect(wrapper.state()).toStrictEqual(expected);
  });
});
