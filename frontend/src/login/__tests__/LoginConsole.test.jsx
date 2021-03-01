import { afterEach, beforeEach, expect, jest } from "@jest/globals";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginConsole from "../LoginConsole";

Enzyme.configure({ adapter: new Adapter() });

const testFixture = {
  username: "someUsername",
  password: "somePassword"
};

describe("LoginConsole", () => {
  let wrapper;
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    wrapper = Enzyme.mount(<LoginConsole handleSubmit={mockHandleSubmit} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("When credentials are incorrect it should create a popup", async () => {
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
