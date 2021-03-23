import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest
} from "@jest/globals";
import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CreateUserFormConsole from "../createUser/CreateUserFormConsole";
import FormConsole from "../../general/userForm/FormConsole";

Enzyme.configure({ adapter: new Adapter() });

describe("CreateUserFormConsole functional component", () => {
  let wrapper;
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    // need mount to test inner component is passed the right prop
    wrapper = Enzyme.mount(
      <CreateUserFormConsole handleSubmit={mockHandleSubmit} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("return()", () => {
    it("should return one <FormConsole/> component", () => {
      expect(wrapper.find(FormConsole)).toHaveLength(1);
    });

    describe("the <FormConsole/> handleSubmit", () => {
      it("to be equal to the <CreateUserFormConsole/>'s handleSubmit prop", () => {
        const userFormConsole = wrapper.find(FormConsole);

        expect(userFormConsole.props().handleSubmit).toEqual(
          wrapper.props().handleSubmit
        );
      });
    });
  });
});
