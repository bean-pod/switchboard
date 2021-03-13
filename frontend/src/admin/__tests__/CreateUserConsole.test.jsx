import { afterEach, beforeEach, expect, jest } from "@jest/globals";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateUserConsole from "../createUser/CreateUserConsole";

Enzyme.configure({ adapter: new Adapter() });

const testFixture = {
  username: "someUsername",
  password: "somePassword"
};

describe("CreateUserConsole", () => {
  let wrapper;
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    wrapper = Enzyme.mount(<CreateUserConsole handleSubmit={mockHandleSubmit} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("When user is not able to be create, a popup should appear", async () => {
    const usernameInput = wrapper.find("input").at(0);
    const passwordInput = wrapper.find("input").at(1);
    usernameInput.simulate("focus");
    usernameInput.simulate("change", {
      target: { value: testFixture.username }
    });
    usernameInput.simulate("focus");
    passwordInput.simulate("change", {
      target: { value: testFixture.password }
    });

    const submitButton = wrapper.find("button");
    submitButton.simulate("submit");

    expect(mockHandleSubmit).toHaveBeenCalledWith(
      testFixture.username,
      testFixture.password
    );
  });
});
