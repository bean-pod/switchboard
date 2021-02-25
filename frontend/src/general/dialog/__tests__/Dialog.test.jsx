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
  const actionButton = { name: "name1", onClick };
  const wrapper = Enzyme.shallow(
    <Dialog title={dummyTitle} actionButton={actionButton}>
      {testBody}
    </Dialog>
  );

  describe("render() function should return a component that", () => {
    it("Contains one <MuiDialog/> component", () => {
      expect(wrapper.find(MuiDialog)).toHaveLength(1);
    });
    it("Contains one <DialogTitle/> component", () => {
      expect(wrapper.find(DialogTitle)).toHaveLength(1);
    });
    it("Contains one <DialogBody/> component", () => {
      expect(wrapper.find(DialogBody)).toHaveLength(1);
    });
    it("Contains one <DialogButtons/> component", () => {
      expect(wrapper.find(DialogButtons)).toHaveLength(1);
    });
  });

  describe("openDialog() function", ()=>{
    it("should set the state open to true", ()=>{
      const defaultState = {
        open: false
      }
      const openState = {
        open: true
      }
      expect(wrapper.state()).toEqual(defaultState);
      wrapper.instance().openDialog();

      expect(wrapper.state()).toEqual(openState);
    })
  })
  describe("closeDialog() function", ()=>{
    it("should set the state open to false", ()=>{
      const startingState = {
        open: true
      }
      const endState = {
        open: false
      }
      wrapper.setState(startingState)
      expect(wrapper.state()).toEqual(startingState);

      wrapper.instance().closeDialog();
      expect(wrapper.state()).toEqual(endState);
    })
  })
});
