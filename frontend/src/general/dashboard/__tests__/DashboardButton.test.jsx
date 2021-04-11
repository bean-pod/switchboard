import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { NavLink } from "react-router-dom";

import DashboardButton from "../DashboardButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<DashboardButton/> Component", () => {
  let wrapper;
  const dummyHref = "Title";
  const dummyBody = "Body";

  describe(`render() with props href:${dummyHref} children:${dummyBody}`, () => {
    wrapper = Enzyme.shallow(
      <DashboardButton href={dummyHref}>{dummyBody}</DashboardButton>
    );

    it("Contains 1 <NavLink/> component with expected props", () => {
      const expected = {
        activeClassName: "hideLinkStyle",
        className: "hideLinkStyle",
        color: "inherit",
        to: {
          pathname: dummyHref,
          state: { selected: 0 }
        }
      };
      const link = wrapper.find(NavLink);
      expect(link).toHaveLength(1);
      const linkProps = link.props();
      expect(linkProps.activeClassName).toBe(expected.activeClassName);
      expect(linkProps.className).toBe(expected.className);
      expect(linkProps.color).toBe(expected.color);
      expect(linkProps.to).toStrictEqual(expected.to);
    });
    it("Contains 1 WithStyles() wrapped Button component", () => {
      const linkChild = wrapper.find(NavLink).first().children().first();

      expect(linkChild.type().Naked.displayName).toBe(
        "WithStyles(ForwardRef(Button))"
      );
      expect(linkChild.type().Naked.options.name).toBe("MuiButton");
      expect(linkChild.text()).toBe(dummyBody);
    });
  });
});
