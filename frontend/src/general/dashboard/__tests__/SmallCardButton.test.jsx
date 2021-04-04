import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, it } from "@jest/globals";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";

import SmallCardButton from "../SmallCardButton";
import ButtonInfo from "../ButtonInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<SmallCardButton/> functional Component", () => {
  let wrapper;
  const dummyPath = "dumbPath";
  const dummyObj = { thing: "thing" };
  const dummyButtonText = "buttonText";
  const dummyOnClick = jest.fn();

  afterEach(() => {
    wrapper.unmount();
  });

  describe("when onClick is not defined", () => {
    beforeEach(() => {
      const button = new ButtonInfo(dummyPath, dummyObj, dummyButtonText);
      wrapper = Enzyme.shallow(<SmallCardButton button={button} />);
    });
    describe(`returns a component that`, () => {
      it("Contains 1 <NavLink/> components with expected props", () => {
        expect(wrapper.find(NavLink)).toHaveLength(1);
        const props = wrapper.find(NavLink).at(0).props();
        const expected = {
          activeClassName: "hideLinkStyle",
          className: "hideLinkStyle",
          to: {
            pathname: dummyPath,
            state: {device: dummyObj}
          }
        };

        expect(props.activeClassName).toBe(expected.activeClassName);
        expect(props.className).toBe(expected.className);
        expect(props.to).toStrictEqual(expected.to);
      });
      it("Contains 1 <Button/> components with expected props", () => {
        expect(wrapper.find(Button)).toHaveLength(1);
        const props = wrapper.find(Button).at(0).props();
        const expected = {
          variant: "contained",
          size: "small",
          children: dummyButtonText
        };

        expect(props.variant).toBe(expected.variant);
        expect(props.size).toBe(expected.size);
        expect(props.children).toStrictEqual(expected.children);
      });
    });
  });

  describe("when onClick is defined", () => {
    beforeEach(() => {
      const button = new ButtonInfo(
        dummyPath,
        dummyObj,
        dummyButtonText,
        dummyOnClick
      );

      wrapper = Enzyme.shallow(<SmallCardButton button={button} />);
    });
    describe(`returns a component that`, () => {
      it("Contains 1 <Button/> component with expected props", () => {
        expect(wrapper.find(Button)).toHaveLength(1);
        const props = wrapper.find(Button).at(0).props();
        const expected = {
          variant: "contained",
          size: "small",
          onClick: dummyOnClick,
          children: dummyButtonText
        };

        expect(props.variant).toBe(expected.variant);
        expect(props.size).toBe(expected.size);
        expect(props.onClick).toStrictEqual(expected.onClick);
        expect(props.children).toStrictEqual(expected.children);
      });
    });
  });
});
