import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Link } from "@material-ui/core";

import DashboardButton from "../DashboardButton";

Enzyme.configure({ adapter: new Adapter() });

describe.only("<DashboardButton/> Component", () => {
  let wrapper;
  const dummyHref = "Title";
  const dummyBody = "Body";

  describe(`render() with props href:${dummyHref} children:${dummyBody}`, () => {
    wrapper = Enzyme.shallow(
      <DashboardButton href={dummyHref}>{dummyBody}</DashboardButton>
    );

    it("Contains 1 <Link/> component", () => {
      expect(wrapper.find(Link)).toHaveLength(1);
      const link = wrapper.find(Link).first();
      expect(link.props().href).toBe(dummyHref);
    });
    it("Contains 1 WithStyles() wrapped Button component", () => {
      const linkChild = wrapper.find(Link).first().children().first();

      expect(linkChild.type().Naked.displayName).toBe(
        "WithStyles(ForwardRef(Button))"
      );
      expect(linkChild.type().Naked.options.name).toBe("MuiButton");
      expect(linkChild.text()).toBe(dummyBody);
    });
  });
});
