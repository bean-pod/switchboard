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
import { Button, TextField } from "@material-ui/core";
import FormConsole from "../FormConsole";
import DashboardCard from "../../dashboard/DashboardCard";

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
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("render() function", () => {
    it("should have 1 <DashboardCard/>, 2 <TextFields/> and 1 <Button/>", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      expect(wrapper.find(TextField)).toHaveLength(2);
      expect(wrapper.find(Button)).toHaveLength(1);
    });

    it("contains the props buttonName as a child of <Button/>", () => {
      expect(wrapper.find(Button).children().text()).toEqual(
        dummyValues.buttonName
      );
    });

    describe("isValidate prop", () => {
      it("if true, it should have the form's noValidate to false", () => {
        wrapper = Enzyme.shallow(
          <FormConsole
            handleSubmit={dummyValues.handleSubmit}
            buttonName={dummyValues.buttonName}
            isValidate
          />
        );

        expect(wrapper.find("form").prop("noValidate")).toBe(false);
      });

      it("if default to false, it should have the form's noValidate to true", () => {
        expect(wrapper.find("form").prop("noValidate")).toBe(true);
      });
    });

    describe("if passwordError, passwordInputProps, passwordHelperText", () => {
      describe("are not defined, password <TexField/> component's", () => {
        let textField;

        beforeEach(() => {
          textField = wrapper.find(TextField).at(0);
        });

        it("error should be undefined", () => {
          expect(textField.prop("error")).toEqual(undefined);
        });

        it("inputProps should be undefined", () => {
          expect(textField.prop("inputProps")).toEqual(undefined);
        });

        it("helperText should be undefined", () => {
          expect(textField.prop("helperText")).toEqual(undefined);
        });

        describe("the setPasswordError() function", () => {
          it("should return undefined", () => {
            const result = wrapper.instance().setPasswordError();
            expect(result).toEqual(undefined);
          });
        });
      });

      describe("are defined, password <TextField/> component's", () => {
        let wrapperIsCreate;
        let textField;
        let passwordState;

        const dummyError = { upperbound: 2, lowerbound: 0 };
        const dummyInput = { maxLength: 8, minLength: 2 };
        const dummyText = "test";

        beforeEach(() => {
          wrapperIsCreate = Enzyme.shallow(
            <FormConsole
              handleSubmit={dummyValues.handleSubmit}
              buttonName="Create"
              passwordError={dummyError}
              passwordInputProps={dummyInput}
              passwordHelperText={dummyText}
            />
          );
          textField = wrapperIsCreate.find(TextField).at(1);
          passwordState = wrapperIsCreate.state().password;
        });

        afterEach(() => {
          wrapperIsCreate.unmount();
        });

        it("error prop should be equal to setPasswordError function", () => {
          expect(textField.prop("error")).toEqual(
            wrapperIsCreate.instance().setPasswordError
          );
        });

        it("inputProps prop should be equal to passwordInputProps", () => {
          expect(textField.prop("inputProps")).toEqual(dummyInput);
        });

        it("helperText prop should be equal to passwordHelperText", () => {
          expect(textField.prop("helperText")).toEqual(dummyText);
        });

        describe("the setPasswordError() function", () => {
          it("should return a statement respecting the passed passwordError prop conditions", () => {
            const result = wrapperIsCreate.instance().setPasswordError();
            expect(result).toEqual(
              passwordState.length < dummyError.upperbound &&
                passwordState.length > dummyError.lowerbound
            );
          });
        });
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
