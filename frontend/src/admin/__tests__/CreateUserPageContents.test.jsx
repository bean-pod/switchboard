import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import axios from "axios";
import CreateUserPageContents from "../createUser/CreateUserPageContents";
import CreateUserConsole from "../createUser/CreateUserConsole";
import CreateUserFailedDialog from "../createUser/CreateUserFailedDialog";
import * as AuthenticationUtil from "../../api/AuthenticationUtil";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");
jest.mock("../../api/AuthenticationUtil");
const getAuthorizationHeader = jest.fn();
jest
  .spyOn(AuthenticationUtil, "getAuthorizationHeader")
  .mockImplementationOnce(() => getAuthorizationHeader);

describe("<CreateUserPageContents/> class component", () => {
  let wrapper;
  const mockHistory = {
    push: jest.fn(),
    go: jest.fn()
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(<CreateUserPageContents history={mockHistory} />);
  });

  describe("render() returns a component that", () => {
    it("Contains one <CreateUserConsole/> component", () => {
      expect(wrapper.find(CreateUserConsole)).toHaveLength(1);
      const createUserConsoleProps = wrapper
        .find(CreateUserConsole)
        .first()
        .props();
      expect(createUserConsoleProps.handleSubmit).toEqual(
        wrapper.instance().handleSubmit
      );
    });
    it("Contains one <CreateUserFailedDialog/> component", () => {
      expect(wrapper.find(CreateUserFailedDialog)).toHaveLength(1);
      const createUserFailedDialogProps = wrapper
        .find(CreateUserFailedDialog)
        .first()
        .props();
      expect(createUserFailedDialogProps.open).toBeFalsy();
      expect(createUserFailedDialogProps.setOpen).toEqual(
        wrapper.instance().setDialogOpen
      );
      expect(createUserFailedDialogProps.message).toEqual("");
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
    const data = {
      data: "test"
    };
    describe("when it resolves", () => {
      it("axios post is successful and redirects to home", async () => {
        axios.post.mockImplementationOnce(() => Promise.resolve(data));
        axios.post.mockResolvedValueOnce(
          () => mockHistory.push("/Admin"),
          mockHistory.go(0)
        );

        wrapper.instance().handleSubmit(someUsername, somePassword);

        expect(axios.post).toHaveBeenCalledWith(
          "http://localhost:8080/user/sign-up",
          {
            username: someUsername,
            password: somePassword,
            userRole: "USER"
          },
          getAuthorizationHeader()
        );
        expect(axios.post).toHaveBeenCalledTimes(1);

        await Promise.resolve(setImmediate);

        expect(mockHistory.push).toHaveBeenCalledWith("/Admin");
        expect(mockHistory.go).toHaveBeenCalledWith(0);
      });
    });
    describe("when it rejects", () => {
      it("Changes state to dialog open", async () => {
        const someErrorMessage = "errorMessage";
        axios.post.mockImplementationOnce(() => Promise.reject(data));
        axios.post.mockRejectedValue(
          wrapper.instance().setDialogOpen(true),
          wrapper.instance().setDialogMessage(someErrorMessage)
        );

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
