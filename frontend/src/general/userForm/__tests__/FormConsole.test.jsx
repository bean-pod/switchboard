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
import { Button, Grid, TextField } from "@material-ui/core";
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
    it("should have 2 <Grid/>, 1 <DashboardCard/>, 2 <TextFields/> and 1 <Button/>", () => {
      expect(wrapper.find(Grid)).toHaveLength(2);
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
      describe("are not defined, password <TextField/> component's", () => {
        let textField;

        beforeEach(() => {
          textField = wrapper.find(TextField).at(0);
        });

        it("error should be undefined", () => {
          expect(textField.prop("error")).toBeUndefined();
        });

        it("inputProps should be undefined", () => {
          expect(textField.prop("inputProps")).toBeUndefined();
        });

        it("helperText should be undefined", () => {
          expect(textField.prop("helperText")).toBeUndefined();
        });

        describe("when calling setPasswordError() function", () => {
          it("passwordErrorCondition should stay false if passwordError prop is undefined", () => {
            const passwordErrorStateInitial = wrapper.state()
              .passwordErrorCondition;

            const dummyPass = "test";
            wrapper.instance().setPasswordError(dummyPass);

            expect(wrapper.state().passwordErrorCondition).toEqual(
              passwordErrorStateInitial
            );
          });
        });

        describe("when calling passwordOnChange() function", () => {
          it("should update the state password (through setPassword function)", () => {
            const initialPassword = "initialPassword";
            wrapper.setState({ password: initialPassword });

            const dummyPassword = "test";
            wrapper.instance().passwordOnChange(dummyPassword);

            expect(wrapper.state().password).toEqual(dummyPassword);
          });

          describe("should call setPasswordError()", () => {
            it("passwordErrorCondition should stay unchanged/false if passwordError prop is undefined", () => {
              const passwordErrorStateInitial = wrapper.state()
                .passwordErrorCondition;

              const dummyPassword = "test";
              wrapper.instance().passwordOnChange(dummyPassword);

              expect(wrapper.state().passwordErrorCondition).toEqual(
                passwordErrorStateInitial
              );
            });
          });
        });
      });

      describe("are defined, password <TextField/> component's", () => {
        let wrapperIsCreate;
        let textField;

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
        });

        afterEach(() => {
          wrapperIsCreate.unmount();
        });

        it("error prop should be equal to passwordErrorCondition state", () => {
          expect(textField.prop("error")).toBe(
            wrapperIsCreate.state().passwordErrorCondition
          );
        });

        it("inputProps prop should be equal to passwordInputProps", () => {
          expect(textField.prop("inputProps")).toEqual(dummyInput);
        });

        it("helperText prop should be equal to passwordHelperText", () => {
          expect(textField.prop("helperText")).toEqual(dummyText);
        });

        describe("when calling setPasswordError() function", () => {
          it("passwordErrorCondition should be true if the passed argument/password respects the conditions of passwordError prop", () => {
            // initial condition check
            expect(wrapperIsCreate.state().passwordErrorCondition).toBe(false);

            // passed dummy boundaries are password.length < 2 && password.length > 0
            const passwordTest = "a";
            wrapperIsCreate.instance().setPasswordError(passwordTest);

            expect(wrapperIsCreate.state().passwordErrorCondition).toBe(true);
          });

          it("passwordErrorCondition should be false if the passed argument/password does not meet the conditions of passwordError prop", () => {
            // initial condition check
            expect(wrapperIsCreate.state().passwordErrorCondition).toBe(false);

            // passed dummy boundaries are password.length < 2 && password.length > 0
            const passwordTest = "asdas";
            wrapperIsCreate.instance().setPasswordError(passwordTest);

            expect(wrapperIsCreate.state().passwordErrorCondition).toBe(false);
          });
        });

        describe("when calling passwordOnChange() function", () => {
          it("should update the state password (through setPassword function)", () => {
            const initialPassword = "initialPassword";
            wrapper.setState({ password: initialPassword });

            const dummyPassword = "test";
            wrapper.instance().passwordOnChange(dummyPassword);

            expect(wrapper.state().password).toEqual(dummyPassword);
          });

          describe("should call setPasswordError()", () => {
            it("passwordErrorCondition should be true if the passed argument/password respects the conditions of passwordError prop", () => {
              // initial condition check
              expect(wrapperIsCreate.state().passwordErrorCondition).toBe(
                false
              );

              // passed dummy boundaries are password.length < 2 && password.length > 0
              const passwordTest = "a";
              wrapperIsCreate.instance().passwordOnChange(passwordTest);

              expect(wrapperIsCreate.state().passwordErrorCondition).toBe(true);
            });

            it("passwordErrorCondition should be false if the passed argument/password does not meet the conditions of passwordError prop", () => {
              // initial condition check
              expect(wrapperIsCreate.state().passwordErrorCondition).toBe(
                false
              );

              // passed dummy boundaries are password.length < 2 && password.length > 0
              const passwordTest = "asdas";
              wrapperIsCreate.instance().passwordOnChange(passwordTest);

              expect(wrapperIsCreate.state().passwordErrorCondition).toBe(
                false
              );
            });
          });
        });
      });
    });
  });

  describe("form tag onSubmit", () => {
    it("should return FormConsole.onSubmit()", () => {
      expect(wrapper.find("form").prop("onSubmit")).toBe(
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

      expect(wrapper.state().username).toEqual(expectedUsername);
    });
  });

  describe("setPassword() function", () => {
    it("should set the state password", () => {
      const initialPassword = "initialPassword";
      wrapper.setState({ password: initialPassword });

      const expectedPassword = "test";
      wrapper.instance().setPassword(expectedPassword);

      expect(wrapper.state().password).toEqual(expectedPassword);
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
