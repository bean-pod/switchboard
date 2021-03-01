import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import GridColumn from "../GridColumn";

Enzyme.configure({ adapter: new Adapter() });

describe("<GridColumn/> Component", () => {
  let wrapper;
  const dummyWidth = 4;
  const dummySpacing = 5;
  const dummyBody = "Body";

  describe(`render() with props width:${dummyWidth} children:${dummyBody}`, () => {
    wrapper = Enzyme.shallow(
      <GridColumn width={dummyWidth} spacing={dummySpacing}>
        {dummyBody}
      </GridColumn>
    );

    it("Contains 2 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2);
    });
    it("First <Grid/> has expected props", () => {
      const outerGrid = wrapper.find(Grid).first();

      expect(outerGrid.props().item).toBe(true);
      expect(outerGrid.props().xs).toBe(dummyWidth);
    });
    it("Second <Grid/> has props", () => {
      const innerGrid = wrapper.find(Grid).last();

      expect(innerGrid.props().container).toBe(true);
      expect(innerGrid.props().spacing).toBe(dummySpacing);
    });
  });
});
