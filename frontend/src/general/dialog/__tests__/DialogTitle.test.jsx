import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import DialogTitle from "../DialogTitle";

Enzyme.configure({ adapter: new Adapter() });

describe("<DialogTitle/> Component", () => {
  const testChild = "testString";
  const wrapper = Enzyme.shallow(<DialogTitle>{testChild}</DialogTitle>);
  describe("should contain", () => {
    it("one <MuiDialogTitle/> component", () => {
      expect(wrapper.find(MuiDialogTitle)).toHaveLength(1);
    });
    it("contain the text passed to it", () => {
      expect(wrapper.text()).toBe(testChild);
    });
  });
});
