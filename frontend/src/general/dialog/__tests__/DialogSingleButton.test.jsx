import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";

import { Button } from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";

import DialogSingleButton from "../DialogSingleButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<DialogSingleButton/> Class Component", () => {
  const name = "test button";
  const onClick = () => {};

  const dummyButton = {
    name,
    onClick
  };

  const wrapper = Enzyme.shallow(<DialogSingleButton button={dummyButton} />);
  describe("render() function", () => {
    it("returns a component that contains the right elements", () => {
      expect(wrapper.find(MuiDialogActions)).toHaveLength(1);

      const button = wrapper.find(Button);
      expect(button).toHaveLength(1);
      expect(button.text()).toBe(name);
    });
  });
});
