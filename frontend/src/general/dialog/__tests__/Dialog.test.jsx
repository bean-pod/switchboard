import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";

import MuiDialog from "@material-ui/core/Dialog/Dialog";
import Dialog from "../Dialog";
import DialogTitle from "../DialogTitle";
import DialogBody from "../DialogBody";
import DialogButtons from "../DialogButtons";

Enzyme.configure({ adapter: new Adapter() });

describe("<Dialog/> Component", () => {
  const testBody = "testString";
  const dummyTitle = "testString";
  const onClick = () => {};
  const dummyButton1 = { name: "name1", onClick };
  const dummyButton2 = { name: "name2", onClick };
  const wrapper = Enzyme.shallow(
    <Dialog title={dummyTitle} button1={dummyButton1} button2={dummyButton2}>
      {testBody}
    </Dialog>
  );

  describe("should contain", () => {
    it("one <MuiDialog/> component", () => {
      expect(wrapper.find(MuiDialog)).toHaveLength(1);
    });
    it("one <DialogTitle/> component", () => {
      expect(wrapper.find(DialogTitle)).toHaveLength(1);
    });
    it("one <DialogBody/> component", () => {
      expect(wrapper.find(DialogBody)).toHaveLength(1);
    });
    it("one <DialogButtons/> component", () => {
      expect(wrapper.find(DialogButtons)).toHaveLength(1);
    });
  });
});
