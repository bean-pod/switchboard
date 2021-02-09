import { describe, expect, jest } from "@jest/globals";
import React from "react";
import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoginPage from "../LoginPage";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

let wrapper;

const testFixture = {
  username: "someUsername",
  password: "somePassword"
}

beforeEach(() => {
  wrapper = Enzyme.mount(<LoginPage/>);
});
  
afterEach(() => {
  jest.clearAllMocks();
});

describe("LoginPage", () => {
  it("When credentials are incorrect it should create a popup", () => {
    const usernameInput = wrapper.find("input").at(0);
    const passwordInput = wrapper.find("input").at(1);

    usernameInput.simulate("focus");
    usernameInput.simulate("change", {target: {value: testFixture.username}});
    passwordInput.simulate("focus");
    passwordInput.simulate("change", {target: {value: testFixture.password}});

    const submitButton = wrapper.find("button");
    submitButton.simulate("click");
    
    wrapper.update();
    console.log(wrapper.html());
    
    expect(wrapper.find("#login-failed-dialog-title").text()).toEqual("Login Failed");
  })
});