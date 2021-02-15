import { beforeEach, describe, expect } from "@jest/globals";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginPage from "../LoginPage";

Enzyme.configure({ adapter: new Adapter() });

describe("LoginPage", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<LoginPage />);
  });

  it("Renders one title", () => {
    expect(wrapper.find(".title")).toHaveLength(1);
  });

  it("Renders with a username input and a password input", () => {
    expect(wrapper.find("input")).toHaveLength(2);
    expect(wrapper.find("label")).toHaveLength(2);
    expect(wrapper.find("label").at(0).text()).toEqual("Username *");
    expect(wrapper.find("label").at(1).text()).toEqual("Password *");
  });

  it("Renders a log in button", () => {
    expect(wrapper.find("button")).toHaveLength(1);
    expect(wrapper.find("button span.MuiButton-label").text()).toEqual(
      "Log In"
    );
  });
});
