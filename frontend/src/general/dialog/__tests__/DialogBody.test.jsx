import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";

import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogContentText from "@material-ui/core/DialogContentText";
import DialogBody from "../DialogBody";

Enzyme.configure({ adapter: new Adapter() });

describe("<DialogBody/> Component", () => {
  const testChild = "testString";
  const wrapper = Enzyme.shallow(<DialogBody>{testChild}</DialogBody>);
  describe("should contain", () => {
    it("one <MuiDialogContent/> component", () => {
      expect(wrapper.find(MuiDialogContent)).toHaveLength(1);
    });
    it("one <MuiDialogContentText/> component", () => {
      expect(wrapper.find(MuiDialogContentText)).toHaveLength(1);
    });
    it("contain the text passed to it", () => {
      expect(wrapper.text()).toBe(testChild);
    });
  });
});
