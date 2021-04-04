import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect } from "@jest/globals";
import { Button } from "@material-ui/core";
import {
  Close,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@material-ui/icons";

import StepperNextButton from "../StepperNextButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<StepperNextButton/> functional component", () => {
  let wrapper;
  const mockNext = jest.fn();
  const mockClose = jest.fn();

  afterEach(() => {
    wrapper.unmount();
  });

  describe("when prop disabled is true", () => {
    const isDisabled = true;
    describe("when prop isLast is true", () => {
      const isLast = true;
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <StepperNextButton
            isLast={isLast}
            disabled={isDisabled}
            handleNext={mockNext}
            handleClose={mockClose}
          />
        );
      });
      it("returns a <Button/> component with expected props & children", () => {
        const buttons = wrapper.find(Button);
        expect(buttons).toHaveLength(1);

        const props = buttons.at(0).props();
        const expected = {
          size: "small",
          onClick: mockClose,
          disabled: isDisabled,
          children: ["Confirm", <KeyboardArrowRight />]
        };
        expect(props.size).toBe(expected.size);
        expect(props.onClick).toStrictEqual(expected.onClick);
        expect(props.disabled).toBe(expected.disabled);
        expect(props.children).toStrictEqual(expected.children);
      });
    });
    describe("when prop isLast is false", () => {
      const isLast = false;
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <StepperNextButton
            isLast={isLast}
            disabled={isDisabled}
            handleNext={mockNext}
            handleClose={mockClose}
          />
        );
      });
      it("returns a <Button/> component with expected props & children", () => {
        const buttons = wrapper.find(Button);
        expect(buttons).toHaveLength(1);

        const props = buttons.at(0).props();
        const expected = {
          size: "small",
          disabled: isDisabled,
          onClick: mockNext,
          children: ["Next", <KeyboardArrowRight />]
        };
        expect(props.size).toBe(expected.size);
        expect(props.disabled).toBe(expected.disabled);
        expect(props.onClick).toStrictEqual(expected.onClick);
        expect(props.children).toStrictEqual(expected.children);
      });
    });
  });
  describe("when prop disabled is true", () => {
    const isDisabled = false;
    describe("when prop isLast is true", () => {
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <StepperNextButton
            isLast
            disabled={isDisabled}
            handleNext={mockNext}
            handleClose={mockClose}
          />
        );
      });
      it("returns a <Button/> component with expected props & children", () => {
        const buttons = wrapper.find(Button);
        expect(buttons).toHaveLength(1);

        const props = buttons.at(0).props();
        const expected = {
          size: "small",
          onClick: mockClose,
          disabled: isDisabled,
          children: ["Confirm", <KeyboardArrowRight />]
        };
        expect(props.size).toBe(expected.size);
        expect(props.onClick).toStrictEqual(expected.onClick);
        expect(props.disabled).toBe(expected.disabled);
        expect(props.children).toStrictEqual(expected.children);
      });
    });
    describe("when prop isLast is false", () => {
      beforeEach(() => {
        const isNotLast = false;

        wrapper = Enzyme.shallow(
          <StepperNextButton
            isLast={isNotLast}
            disabled={isDisabled}
            handleNext={mockNext}
            handleClose={mockClose}
          />
        );
      });
      it("returns a <Button/> component with expected props & children", () => {
        const buttons = wrapper.find(Button);
        expect(buttons).toHaveLength(1);

        const props = buttons.at(0).props();
        const expected = {
          size: "small",
          disabled: isDisabled,
          onClick: mockNext,
          children: ["Next", <KeyboardArrowRight />]
        };
        expect(props.size).toBe(expected.size);
        expect(props.disabled).toBe(expected.disabled);
        expect(props.onClick).toStrictEqual(expected.onClick);
        expect(props.children).toStrictEqual(expected.children);
      });
    });
  });
});
