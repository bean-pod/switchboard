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

    describe("Contains 2 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2);
      describe("First <Grid/> has props", () => {
        const outerGrid = wrapper.find(Grid).first();
        it(`"item" with value true`, () => {
          expect(outerGrid.props().item).toBe(true);
        });
        it(`"xs" with value ${dummyWidth}`, () => {
          expect(outerGrid.props().xs).toBe(dummyWidth);
        });
      });
      describe("Second <Grid/> has props", () => {
        const innerGrid = wrapper.find(Grid).last();
        it(`"container" with value true`, () => {
          expect(innerGrid.props().container).toBe(true);
        });
        it(`"spacing" with value ${dummySpacing}`, () => {
          expect(innerGrid.props().spacing).toBe(dummySpacing);
        });
      });
    });
  });
});
