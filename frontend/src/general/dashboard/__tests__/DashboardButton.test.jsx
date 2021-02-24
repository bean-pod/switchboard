import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Link, Button } from "@material-ui/core";

import DashboardButton from "../DashboardButton";

Enzyme.configure({ adapter: new Adapter() });

describe.only("<DashboardCard/> Component", () => {
  let wrapper;
  const dummyHref = "Title";
  const dummyBody = "Body";

  describe(`render() with props href:${dummyHref} children:${dummyBody}`, () => {
    wrapper = Enzyme.shallow(
      <DashboardButton href={dummyHref}>{dummyBody}</DashboardButton>
    );

    describe("Contains 1 <Link/> component", () => {
      expect(wrapper.find(Link)).toHaveLength(1);
      const link = wrapper.find(Link).first();
      it(`That has text "${dummyBody}"`, () => {
        expect(link.props().href).toBe(dummyHref);
      });
    });
    // describe("Contains 1 <StyledButton/> component", () => {
    //   expect(wrapper.find()).toHaveLength(1);
    //   it(`That has title "${dummyHref}"`, () => {
    //     const bodyBox = wrapper.find(Button);
    //     expect(bodyBox.text()).toBe(dummyBody);
    //   });
    // });
  });
});
