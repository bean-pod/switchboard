import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

import MuiDialog from "@material-ui/core/Dialog/Dialog";
import { DialogTitle } from "@material-ui/core";
import Dialog from "../Dialog";
import DialogBody from "../DialogBody";
import DialogButtons from "../DialogButtons";

Enzyme.configure({ adapter: new Adapter() });

describe("<Dialog/> Class Component", () => {
  let wrapper;
  const testBody = "testString";
  const dummyTitle = "testString";

  const onClick = () => {};
  const actionButton = { name: "name1", onClick };

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <Dialog title={dummyTitle} actionButton={actionButton}>
        {testBody}
      </Dialog>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("render() function", () => {
    it("returns a component that contains the right elements", () => {
      expect(wrapper.find(MuiDialog)).toHaveLength(1);
      expect(wrapper.find(DialogTitle)).toHaveLength(1);
      expect(wrapper.find(DialogBody)).toHaveLength(1);
      expect(wrapper.find(DialogButtons)).toHaveLength(1);
    });

    describe("if an actionButton is passed as a prop", () => {
      it("button2 prop should be passed with the actionButton", () => {
        const dialogButtonsComponent = wrapper.find(DialogButtons);
        expect(dialogButtonsComponent.props().button2).toBe(actionButton);
      });
    });

    describe("if no actionButton is passed as a prop", () => {
      it("button2 prop should be undefined", () => {
        const wrapperNoActionButton = Enzyme.shallow(
          <Dialog title={dummyTitle}>{testBody}</Dialog>
        );
        
        const dialogButtonsComponent = wrapperNoActionButton.find(
          DialogButtons
        );

        expect(dialogButtonsComponent.props().button2).toBeUndefined();

        wrapperNoActionButton.unmount();
      });
    });

    it("if isError prop is true, returns a DialogTitle with red title", () => {
      const wrapperisError = Enzyme.shallow(
        <Dialog title={dummyTitle} isError>
          {testBody}
        </Dialog>
      );

      expect(wrapperisError.find(DialogTitle).hasClass("warningText")).toBe(
        true
      );

      wrapperisError.unmount();
    });
  });

  describe("openDialog() function", () => {
    it("should set the state open to true", () => {
      const defaultState = {
        open: false
      };
      const openState = {
        open: true
      };

      expect(wrapper.state()).toEqual(defaultState);

      wrapper.instance().openDialog();

      expect(wrapper.state()).toEqual(openState);
    });
  });

  describe("closeDialog() function", () => {
    it("should set the state open to false", () => {
      const startingState = {
        open: true
      };
      const endState = {
        open: false
      };

      wrapper.setState(startingState);
      expect(wrapper.state()).toEqual(startingState);

      wrapper.instance().closeDialog();

      expect(wrapper.state()).toEqual(endState);
    });
  });

  describe("inner <MuiDialog/> component onClose", () => {
    it("should return Dialog.closeDialog()", () => {
      expect(wrapper.find(MuiDialog).props().onClose()).toEqual(
        wrapper.instance().closeDialog
      );
    });
  });
});
