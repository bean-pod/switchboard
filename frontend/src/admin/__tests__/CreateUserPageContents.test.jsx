import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import CreateUserPageContents from "../createUser/CreateUserPageContents";
import FormConsole from "../../general/userForm/FormConsole";
import FormFailedDialog from "../../general/userForm/FormFailedDialog";
import * as UserManagementApi from "../../api/UserManagementApi";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/UserManagementApi");
jest.spyOn(UserManagementApi, "createUser");

describe("<CreateUserPageContents/> class component", () => {
  let wrapper;
  const mockHistory = {
    push: jest.fn(),
    go: jest.fn()
  };
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
    wrapper = Enzyme.shallow(<CreateUserPageContents history={mockHistory} />);
  });

  describe("render() returns a component that", () => {
    it("Contains one <FormConsole/> component with the expected props", () => {
      expect(wrapper.find(FormConsole)).toHaveLength(1);
      const formConsoleProps = wrapper.find(FormConsole).props();
      expect(formConsoleProps.handleSubmit).toEqual(
        wrapper.instance().handleSubmit
      );
      expect(formConsoleProps.buttonName).toEqual("Create");
      expect(formConsoleProps.isValidate).toBe(true);
      expect(formConsoleProps.isCreateUser).toBe(true);
    });
    it("Contains one <FormFailedDialog/> component with the expected props", () => {
      expect(wrapper.find(FormFailedDialog)).toHaveLength(1);
      const FormFailedDialogProps = wrapper.find(FormFailedDialog).props();
      expect(FormFailedDialogProps.title).toEqual("Failed to create user");
      expect(FormFailedDialogProps.errorMessage).toEqual("");
    });
  });
  it("setDialogMessage() function that sets the state of dialogMessage", () => {
    const startState = "startTest";
    wrapper.setState({ dialogMessage: startState });
    const changedState = "testValue";
    wrapper.instance().setDialogMessage(changedState);
    expect(wrapper.state().dialogMessage).toBe(changedState);
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
    describe("when CreateUser resolves", () => {
      it("Calls createUser and redirects to Admin", async () => {
        UserManagementApi.createUser.mockResolvedValue();

        wrapper.instance().handleSubmit(someUsername, somePassword);

        await new Promise(setImmediate);

        expect(UserManagementApi.createUser).toHaveBeenCalledWith({
          username: someUsername,
          password: somePassword
        });
        expect(mockHistory.push).toHaveBeenCalledWith("/Admin");
        expect(mockHistory.go).toHaveBeenCalledWith(0);
      });
    });
    describe("when createUser rejects", () => {
      it("Calls openDialog", async () => {
        const someErrorMessage = "errorMessage";
        UserManagementApi.createUser.mockRejectedValue({
          message: someErrorMessage
        });

        wrapper.instance().handleSubmit(someUsername, somePassword);

        const flushPromises = () => new Promise(setImmediate);
        await flushPromises();

        expect(wrapper.state()).toEqual({
          dialogMessage: someErrorMessage
        });
      });
    });
  });
});
