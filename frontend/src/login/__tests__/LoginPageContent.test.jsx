import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import LoginPageContents from "../LoginPageContents";
import LoginConsole from "../LoginConsole";
import LoginFailedDialog from "../LoginFailedDialog";

Enzyme.configure({ adapter: new Adapter() });

describe("<LoginPageContents/> class component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<LoginPageContents />);
  });

  describe("render() returns a component that", () => {
    it("Contains one <LoginConsole/> component", () => {
      expect(wrapper.find(LoginConsole)).toHaveLength(1);
    });
    it("Contains one <LoginFailedDialog/> component", () => {
      expect(wrapper.find(LoginFailedDialog)).toHaveLength(1);
    });
  });
  describe("setDialogOpen() function that sets the state of dialogOpen", () => {
    const expectedValue = "testValue";
    wrapper.instance().setDialogOpen(expectedValue);
    expect(wrapper.state().dialogOpen).toBe(expectedValue);
  });
  describe("setDialogMessage() function that sets the state of dialogMessage", () => {
    const expectedValue = "testValue";
    wrapper.instance().setDialogMessage(expectedValue);
    expect(wrapper.state().dialogMessage).toBe(expectedValue);
  });
});
