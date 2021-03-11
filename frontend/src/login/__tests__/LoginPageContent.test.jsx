import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import LoginPageContents from "../LoginPageContents";
import LoginConsole from "../LoginConsole";
import LoginFailedDialog from "../LoginFailedDialog";
import * as AuthenticationApi from "../../api/AuthenticationApi";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/AuthenticationApi");
jest.spyOn(AuthenticationApi, "logIn");
jest.spyOn(AuthenticationApi, "handleLogin");

describe("<LoginPageContents/> class component", () => {
  let wrapper;
  const mockHistory = {
    push: jest.fn(),
    go: jest.fn()
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(<LoginPageContents history={mockHistory} />);
  });

  describe("render() returns a component that", () => {
    it("Contains one <LoginConsole/> component", () => {
      expect(wrapper.find(LoginConsole)).toHaveLength(1);
      const loginConsoleProps = wrapper.find(LoginConsole).first().props();
      expect(loginConsoleProps.handleSubmit).toEqual(
        wrapper.instance().handleSubmit
      );
    });
    it("Contains one <LoginFailedDialog/> component", () => {
      expect(wrapper.find(LoginFailedDialog)).toHaveLength(1);
      const loginFailedDialogProps = wrapper
        .find(LoginFailedDialog)
        .first()
        .props();
      expect(loginFailedDialogProps.open).toBeFalsy();
      expect(loginFailedDialogProps.setOpen).toEqual(
        wrapper.instance().setDialogOpen
      );
      expect(loginFailedDialogProps.message).toEqual("");
    });
  });
  it("setDialogOpen() function that sets the state of dialogOpen", () => {
    const expectedValue = false;
    wrapper.instance().setDialogOpen(expectedValue);
    expect(wrapper.state().dialogOpen).toBe(expectedValue);
  });
  it("setDialogMessage() function that sets the state of dialogMessage", () => {
    const expectedValue = "testValue";
    wrapper.instance().setDialogMessage(expectedValue);
    expect(wrapper.state().dialogMessage).toBe(expectedValue);
  });
  describe("handleSubmit()", () => {
    const someUsername = "username";
    const somePassword = "password";
    describe("when logIn resolves", () => {
      it("Calls login and redirects to home", () => {
        AuthenticationApi.handleLogin.mockReturnValue();
        AuthenticationApi.logIn.mockResolvedValue();

        wrapper.instance().handleSubmit(someUsername, somePassword);

        expect(AuthenticationApi.handleLogin).toHaveBeenCalled();
        expect(AuthenticationApi.logIn).toHaveBeenCalledWith({
          username: someUsername,
          password: somePassword
        });
        expect(mockHistory.push).toHaveBeenCalledWith("/Home");
      });
    });
    describe("when logIn rejects", () => {
      it("Changes state to dialog open", async () => {
        const someErrorMessage = "errorMessage";
        AuthenticationApi.handleLogin.mockReturnValue();
        AuthenticationApi.logIn.mockRejectedValue({
          message: someErrorMessage
        });

        wrapper.instance().handleSubmit(someUsername, somePassword);

        await Promise.resolve(setImmediate);

        expect(wrapper.state()).toEqual({
          dialogOpen: true,
          dialogMessage: someErrorMessage
        });
      });
    });
  });
});
