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
import * as UserManagementApi from "../../api/UserManagementApi";
import * as SnackbarMessage from "../../general/SnackbarMessage";
import FormConsole from "../../general/userForm/FormConsole";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/UserManagementApi");
jest.spyOn(UserManagementApi, "createUser");

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

describe("<CreateUserPageContents/> class component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<CreateUserPageContents />);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("render() returns a component that", () => {
    it("contains one <FormConsole/> component with handleSubmit passed as prop", () => {
      const form = wrapper.find(FormConsole);
      expect(form).toHaveLength(1);

      const expected = {
        handleSubmit: wrapper.instance().handleSubmit,
        buttonName: "Create",
        isValidate: true,
        passwordError: { upperbound: 5, lowerbound: 0 },
        passwordInputProps: { maxLength: 20, minLength: 5 },
        passwordHelperText: "Password must be between 5 to 20 characters"
      };

      const formConsoleProps = form.props();
      expect(formConsoleProps).toEqual(expected);
    });
  });

  describe("handleSubmit() function", () => {
    const someUsername = "username";
    const somePassword = "password";

    describe("when createUser() resolves", () => {
      it("Calls createUser() and displays a success snackbar", async () => {
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
      it("Displays an error snackbar with the error message", async () => {
        const someErrorMessage = "errorMessage";
        UserManagementApi.createUser.mockRejectedValue({
          message: someErrorMessage
        });

        wrapper.instance().handleSubmit(someUsername, somePassword);

        const flushPromises = () => new Promise(setImmediate);
        await flushPromises();

        expect(snackbarSpy).toHaveBeenCalledTimes(1);
        expect(snackbarSpy).toHaveBeenCalledWith(
          "error",
          `Failed to create user: ${someErrorMessage}`
        );
      });
    });
  });
});
