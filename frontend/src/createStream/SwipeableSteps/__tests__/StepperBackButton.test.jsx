import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect } from "@jest/globals";
import { Button } from "@material-ui/core";
import { Close, KeyboardArrowLeft } from "@material-ui/icons";

import StepperBackButton from "../StepperBackButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<StepperBackButton/> functional component", () => {
  let wrapper;
  const mockBack = jest.fn();
  const mockClose = jest.fn();

  afterEach(() => {
    wrapper.unmount();
  });

  describe("when prop isFirst is true", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StepperBackButton
          isFirst
          handleBack={mockBack}
          handleClose={mockClose}
        />
      );
    });
    it("returns a <Button/> component with expected props & children", () => {
      const buttons = wrapper.find(Button);
      expect(buttons).toHaveLength(1);

      const props = buttons.at(0).props();
      const icon = <Close />;
      const expected = {
        size: "small",
        onClick: mockClose,
        children: [icon, "Cancel"]
      };
      expect(props.size).toBe(expected.size);
      expect(props.onClick).toStrictEqual(expected.onClick);
      expect(props.children).toStrictEqual(expected.children);
    });
  });
  describe("when prop isFirst is false", () => {
    beforeEach(() => {
      const isNotFirst = false;

      wrapper = Enzyme.shallow(
        <StepperBackButton
          isFirst={isNotFirst}
          handleBack={mockBack}
          handleClose={mockClose}
        />
      );
    });
    it("returns a <Button/> component with expected props & children", () => {
      const buttons = wrapper.find(Button);
      expect(buttons).toHaveLength(1);

      const props = buttons.at(0).props();
      const icon = <KeyboardArrowLeft />;
      const expected = {
        size: "small",
        onClick: mockBack,
        children: [icon, "Back"]
      };
      expect(props.size).toBe(expected.size);
      expect(props.onClick).toStrictEqual(expected.onClick);
      expect(props.children).toStrictEqual(expected.children);
    });
  });
});
