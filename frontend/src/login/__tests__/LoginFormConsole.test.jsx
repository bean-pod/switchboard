import { afterEach, beforeEach, describe, expect, jest } from "@jest/globals";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginFormConsole from "../LoginFormConsole";
import FormConsole from "../../general/userForm/FormConsole";

Enzyme.configure({ adapter: new Adapter() });

describe("LoginConsole", () => {
  let wrapper;
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    wrapper = Enzyme.mount(
      <LoginFormConsole handleSubmit={mockHandleSubmit} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("return()", () => {
    it("should return one <FormConsole/> component with the expected prop", () => {
      const loginFormConsole = wrapper.find(FormConsole);
      expect(loginFormConsole).toHaveLength(1);
      expect(loginFormConsole.props().handleSubmit).toBe(
        wrapper.props().handleSubmit
      );
    });
  });
});
