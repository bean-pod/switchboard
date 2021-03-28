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

import CreateUserPageContents from "../createUser/CreateUserPageContents";
import CreateUserFormConsole from "../createUser/CreateUserFormConsole";
import FormFailedDialog from "../../general/userForm/FormFailedDialog";
import * as UserManagementApi from "../../api/UserManagementApi";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/UserManagementApi");
jest.spyOn(UserManagementApi, "createUser");

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

describe("<CreateUserPageContents/> class component", () => {
  let wrapper;
  const mockOpenDialog = jest.fn();

  beforeEach(() => {
    const mockRefElement = {
      current: {
        openDialog: mockOpenDialog
      }
    };
    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });
    wrapper = Enzyme.shallow(<CreateUserPageContents />);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("render() returns a component that", () => {
    it("contains one <CreateUserFormConsole/> component with handleSubmit passed as prop", () => {
      expect(wrapper.find(CreateUserFormConsole)).toHaveLength(1);

      const formConsoleProps = wrapper.find(CreateUserFormConsole).props();

      expect(formConsoleProps.handleSubmit).toBe(
        wrapper.instance().handleSubmit
      );
    });

    it("contains one <FormFailedDialog/> component with the expected props", () => {
      expect(wrapper.find(FormFailedDialog)).toHaveLength(1);

      const FormFailedDialogProps = wrapper.find(FormFailedDialog).props();

      expect(FormFailedDialogProps.title).toEqual("Failed to create user");
      expect(FormFailedDialogProps.errorMessage).toBe(
        wrapper.state().dialogMessage
      );
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

  describe("handleSubmit() function", () => {
    const someUsername = "username";
    const somePassword = "password";

    describe("when createUser() resolves", () => {
      it("Calls createUser() and redirects to Home", async () => {
        UserManagementApi.createUser.mockResolvedValue();

        wrapper.instance().handleSubmit(someUsername, somePassword);

        await new Promise(setImmediate);

        expect(UserManagementApi.createUser).toHaveBeenCalledWith({
          username: someUsername,
          password: somePassword
        });

        // snackbar should be displayed
        expect(snackbarSpy).toHaveBeenCalledTimes(1);
        expect(snackbarSpy).toHaveBeenCalledWith(
          "success",
          `User ${someUsername} successfully created!`
        );
      });
    });

    describe("when createUser() rejects", () => {
      it("Calls openDialog() and changes the state dialogMessage to the error message", async () => {
        const someErrorMessage = "errorMessage";
        UserManagementApi.createUser.mockRejectedValue({
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
