import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Typography, Paper } from "@material-ui/core";
import DashboardCard from "../DashboardCard";

Enzyme.configure({ adapter: new Adapter() });

describe("<DashboardCard/> functional Component", () => {
  let wrapper;
  const dummyTitle = "Title";
  const dummyBody = "Body";

  describe(`render() with props title:${dummyTitle} children:${dummyBody}`, () => {
    wrapper = Enzyme.shallow(
      <DashboardCard title={dummyTitle}>{dummyBody}</DashboardCard>
    );
    it("Contains 1 <Paper/> component", () => {
      expect(wrapper.find(Paper)).toHaveLength(1);
      const paper = wrapper.find(Paper).first();
      expect(paper.childAt(1).text()).toBe(dummyBody)
    });
    it("Contains 1 <Typography/> component", () => {
      expect(wrapper.find(Typography)).toHaveLength(1);
        const bodyBox = wrapper.find(Typography);
        expect(bodyBox.text()).toBe(dummyTitle);
    });
  });
});
