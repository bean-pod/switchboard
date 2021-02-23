import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";

import { Button } from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";

import DialogButtons from "../DialogButtons";

Enzyme.configure({ adapter: new Adapter() });

describe("<DialogButtons/> Component", () => {
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

  const wrapper = Enzyme.shallow(
    <DialogButtons button1={dummyButton1} button2={dummyButton2} />
  );
  describe("should contain", () => {
    it("one <MuiDialogActions/> component", () => {
      expect(wrapper.find(MuiDialogActions)).toHaveLength(1);
    });
    describe("two <Button/> components", () => {
      const buttons = wrapper.find(Button);
      expect(buttons).toHaveLength(2);

      it(`First button should contain text : ${name1}`, () => {
        expect(buttons.first().text()).toBe(name1);
      });
      it(`Second button should contain text : ${name2}`, () => {
        expect(buttons.last().text()).toBe(name2);
      });
    });
  });
});
