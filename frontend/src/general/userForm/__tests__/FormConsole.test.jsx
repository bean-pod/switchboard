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
import { Button, Container, TextField } from "@material-ui/core";
import FormConsole from "../FormConsole";

Enzyme.configure({ adapter: new Adapter() });

describe("<FormConsole/> class component", () => {
  let wrapper;
  const mockHandleSubmit = jest.fn();
  const dummyValues = {
    handleSubmit: mockHandleSubmit,
    buttonName: "Create"
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <FormConsole
        handleSubmit={dummyValues.handleSubmit}
        buttonName={dummyValues.buttonName}
        isValidate
        isCreateUser
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("render()", () => {
    it("should have 1 <Container/>, 2 <TextFields/> and 1 <Button/>", () => {
      expect(wrapper.find(Container)).toHaveLength(1);
      expect(wrapper.find(TextField)).toHaveLength(2);
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("contains the props buttonName as a child of <Button/>", () => {
      expect(wrapper.find(Button).children().text()).toEqual(
        dummyValues.buttonName
      );
    });

    it("if isValidate prop is true, it should have the form's noValidate to true", () => {
      const wrapperIsValidate = Enzyme.shallow(
        <FormConsole
          handleSubmit={dummyValues.handleSubmit}
          buttonName={dummyValues.buttonName}
          isValidate
        />
      );

      expect(wrapperIsValidate.find("form").prop("noValidate")).toBe(false);

      wrapperIsValidate.unmount();
    });

    describe("if isCreateUser prop is true, password <TextField/> should have error, inputProps and helperText props", () => {
      let wrapperIsCreate;
      let textField;
      let passwordState;

      beforeEach(() => {
        wrapperIsCreate = Enzyme.shallow(
          <FormConsole
            handleSubmit={dummyValues.handleSubmit}
            buttonName={dummyValues.buttonName}
            isCreateUser
          />
        );
        textField = wrapperIsCreate.find(TextField).at(1);
        passwordState = wrapperIsCreate.state().password;
      });

      afterEach(() => {
        wrapperIsCreate.unmount();
      });

      it("error should be passed password.length < 5 && password.length > 0", () => {
        expect(textField.prop("error")).toBe(
          passwordState.length < 5 && passwordState.length > 0
        );
      });

      it("inputProps should be passed { maxLength: 20, minLength: 5 }", () => {
        expect(textField.prop("inputProps")).toEqual({
          maxLength: 20,
          minLength: 5
        });
      });

      it("helperText should be equal to Password must be between 5 to 20 characters", () => {
        expect(textField.prop("helperText")).toEqual(
          "Password must be between 5 to 20 characters"
        );
      });
    });
  });

  describe("form tag onSubmit", () => {
    it("should return FormConsole.onSubmit()", () => {
      expect(wrapper.find("form").prop("onSubmit")).toEqual(
        wrapper.instance().onSubmit
      );
    });
  });

  describe("setUsername() function", () => {
    it("should set the state username", () => {
      const initialUsername = "initialUser";
      wrapper.setState({ username: initialUsername });

      const expectedUsername = "test";
      wrapper.instance().setUsername(expectedUsername);

      expect(wrapper.state().username).toBe(expectedUsername);
    });
  });

  describe("setPassword() function", () => {
    it("should set the state password", () => {
      const initialPassword = "initialPassword";
      wrapper.setState({ password: initialPassword });

      const expectedPassword = "test";
      wrapper.instance().setPassword(expectedPassword);

      expect(wrapper.state().password).toBe(expectedPassword);
    });
  });

  describe("onSubmit() function", () => {
    const targetValue = "test";
    const event = {
      target: {
        value: targetValue
      },
      preventDefault: jest.fn()
    };

    it("should have the passed function handleSubmit be called with username and password state", () => {
      wrapper.instance().onSubmit(event);

      expect(mockHandleSubmit).toHaveBeenCalledWith(
        wrapper.state().username,
        wrapper.state().password
      );
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
});
