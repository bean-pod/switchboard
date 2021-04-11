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

import LoginPageContents from "../LoginPageContents";
import LoginConsole from "../LoginFormConsole";
import FormFailedDialog from "../../general/userForm/FormFailedDialog";
import * as AuthenticationApi from "../../api/AuthenticationApi";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/AuthenticationApi");
jest.spyOn(AuthenticationApi, "logIn");

describe("<LoginPageContents/> Class Component", () => {
  let wrapper;
  const mockOpenDialog = jest.fn();
  const mockHistory = {
    push: jest.fn(),
    go: jest.fn()
  };

  beforeEach(() => {
    const mockRefElement = {
      current: {
        openDialog: mockOpenDialog
      }
    };
    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });
    wrapper = Enzyme.shallow(
      <LoginPageContents.WrappedComponent history={mockHistory} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("render() function", () => {
    describe("returns a component that", () => {
      it("Contains 1 <LoginConsole/> component with the expected props", () => {
        const loginConsole = wrapper.find(LoginConsole);
        expect(loginConsole).toHaveLength(1);

        const loginConsoleProps = loginConsole.props();
        expect(loginConsoleProps.handleSubmit).toEqual(
          wrapper.instance().handleSubmit
        );
      });
      it("Contains 1 <FormFailedDialog/> component with the expected props", () => {
        const formFailedDialog = wrapper.find(FormFailedDialog);
        expect(formFailedDialog).toHaveLength(1);

        const expected = {
          title: "Login failed",
          errorMessage: wrapper.state().dialogMessage
        };

        const formFailedDialogProps = formFailedDialog.props();
        expect(formFailedDialogProps.title).toEqual(expected.title);
        expect(formFailedDialogProps.errorMessage).toBe(expected.errorMessage);
      });
    });
  });
  describe("setDialogMessage() function", () => {
    it("sets the state of dialogMessage", () => {
      const startState = "initialMessage";
      wrapper.setState({ dialogMessage: startState });

      const changedState = "test";
      wrapper.instance().setDialogMessage(changedState);

      expect(wrapper.state().dialogMessage).toEqual(changedState);
    });
  });

  describe("openDialog() function", () => {
    it("calls dialogElement.current.openDialog()", () => {
      wrapper.instance().openDialog();
      expect(mockOpenDialog).toBeCalledTimes(1);
    });
  });

  describe("handleSubmit()", () => {
    const someUsername = "username";
    const somePassword = "password";
    describe("it calls logIn()", () => {
      describe("if it resolves", () => {
        it("it redirects to home", async () => {
          AuthenticationApi.logIn.mockResolvedValue();

          wrapper.instance().handleSubmit(someUsername, somePassword);

          await new Promise(setImmediate);

          expect(AuthenticationApi.logIn).toHaveBeenCalledWith({
            username: someUsername,
            password: somePassword
          });
          expect(mockHistory.push).toHaveBeenCalledWith("/Home");
        });
      });
      describe("if it rejects", () => {
        it("it opens an error dialog with the returned error message", async () => {
          const someErrorMessage = "errorMessage";
          AuthenticationApi.logIn.mockRejectedValue({
            message: someErrorMessage
          });

          wrapper.instance().handleSubmit(someUsername, somePassword);

          const flushPromises = () => new Promise(setImmediate);
          await flushPromises();

          expect(mockOpenDialog).toHaveBeenCalled();

          expect(wrapper.state()).toEqual({
            dialogMessage: someErrorMessage
          });
        });
      });
    });
  });
});
