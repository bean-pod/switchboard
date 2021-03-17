import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";

import { Button } from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";

import DialogButtons from "../DialogButtons";

Enzyme.configure({ adapter: new Adapter() });

describe("<DialogButtons/> Class Component", () => {
  const name1 = "Button1";
  const name2 = "Button2";
  const onClick = () => {};

  const dummyButton1 = {
    name: name1,
    onClick
  };
  const dummyButton2 = {
    name: name2,
    onClick
  };

  describe("render() function", () => {
    describe("if button2 prop defaults to undefined aka there is no actionButton", () => {
      const wrapperOneButton = Enzyme.shallow(
        <DialogButtons button1={dummyButton1} />
      );
      it("only renders one <Button/> component", () => {
        expect(wrapperOneButton.find(MuiDialogActions)).toHaveLength(1);
        const button = wrapperOneButton.find(Button);

        expect(button).toHaveLength(1);

        expect(button.text()).toBe(name1);
        expect(button.props().onClick).toBe(dummyButton1.onClick);
      });
    });
    describe("if button2 prop is defined aka there is an actionButton", () => {
      const wrapperTwoButtons = Enzyme.shallow(
        <DialogButtons button1={dummyButton1} button2={dummyButton2} />
      );
      it("returns 2 <Button/> components", () => {
        expect(wrapperTwoButtons.find(MuiDialogActions)).toHaveLength(1);
        const buttons = wrapperTwoButtons.find(Button);

        expect(buttons).toHaveLength(2);

        expect(buttons.first().text()).toBe(name1);
        expect(buttons.first().props().onClick).toBe(dummyButton1.onClick);

        expect(buttons.last().text()).toBe(name2);
        expect(buttons.last().props().onClick).toBe(dummyButton2.onClick);
      });
    });
  });
});
