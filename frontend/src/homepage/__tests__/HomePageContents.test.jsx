import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Box, Container, Grid } from "@material-ui/core";
import HomePage from "../HomePage";

import DynamicBreadcrumb from "../../general/DynamicBreadcrumb";
import GridColumn from "../../general/dashboard/GridColumn";
import DashboardCard from "../../general/dashboard/DashboardCard";
import ActiveStreamCard from "../ActiveStreamsCard";
import ActivityLogCard from "../ActivityLogsCard";
import DevicesCard from "../DevicesCard";

Enzyme.configure({ adapter: new Adapter() });
describe("<HomePage/> functional component", () => {
  const wrapper = Enzyme.shallow(<HomePage />);
  describe("Contains 6 <Grid/> components", () => {
    expect(wrapper.find(Grid)).toHaveLength(6);
    describe("First <Grid/> has props", () => {
      const outerGrid = wrapper.find(Grid).first();
      const expectedJustify = "center";
      const expectedAlign = "stretch";
      const expectedDirection = "row";
      const expectedSpacing = 3;

      it(`"container" with value true`, () => {
        expect(outerGrid.props().container).toBe(true);
      });
      it(`"justify" with value ${expectedJustify}`, () => {
        expect(outerGrid.props().justify).toBe(expectedJustify);
      });
      it(`"alignItems" with value ${expectedAlign}`, () => {
        expect(outerGrid.props().alignItems).toBe(expectedAlign);
      });
      it(`"direction" with value ${expectedDirection}`, () => {
        expect(outerGrid.props().direction).toBe(expectedDirection);
      });
      it(`"spacing" with value ${expectedSpacing}`, () => {
        expect(outerGrid.props().spacing).toBe(expectedSpacing);
      });
    });
    describe("Second <Grid/>", () => {
      const secondGrid = wrapper.find(Grid).at(1);
      const expectedXs = 6;
      it("has props", () => {
          expect(secondGrid.props().item).toBe(true);
          expect(secondGrid.props().xs).toBe(expectedXs);

      });
    });
    describe("Third <Grid/>", () => {
      const thirdGrid = wrapper.find(Grid).at(2);
      it("has props", () => {
        expect(typeof thirdGrid.props().style).toBe("object");
        const styleProperty = thirdGrid.props().style;
        expect(styleProperty.height).not.toBe(undefined);
        expect(styleProperty.height).toBe("100%");
        expect(thirdGrid.props().children.type.name).toBe("ActiveStreamsCard");
      });
    });
    describe("Fourth <Grid/>", () => {
      const fourthGrid = wrapper.find(Grid).at(3);
      const expectedXs = 12;
      describe("has props", () => {
          expect(fourthGrid.props().item).toBe(true);
          expect(fourthGrid.props().xs).toBe(expectedXs);
          expect(fourthGrid.props().children.type.name).toBe("DevicesCard");
      });
    });
    describe("Fifth <Grid/>", () => {
      const fifthGrid = wrapper.find(Grid).at(4);
      const expectedXs = 12;
      it("has props", () => {
        expect(fifthGrid.props().item).toBe(true);
        expect(fifthGrid.props().xs).toBe(expectedXs);
        expect(fifthGrid.props().children.type.name).toBe("ActivityLogsCard");
      });
    });
    describe("Sixth <Grid/>", () => {
      const sixthGrid = wrapper.find(Grid).at(5);
      const expectedXs = 12;
      it("has props", () => {
        expect(sixthGrid.props().item).toBe(true);
        expect(sixthGrid.props().xs).toBe(expectedXs);
        expect(sixthGrid.props().children.type.name).toBe("DashboardCard");
      });
    });
  });
  describe("Contains 1 <GridColumn/> Component", () => {
    expect(wrapper.find(GridColumn)).toHaveLength(1);
    it("with props", () => {
      const gridColumn = wrapper.find(GridColumn).first();
      const expectedWidth = 6;

      expect(gridColumn.props().width).toBe(expectedWidth);
    });
  });
  describe("Contains 1 <DynamicBreadcrumb/> Component", () => {
    expect(wrapper.find(DynamicBreadcrumb)).toHaveLength(1);
    it("with props", () => {
      const breadcrumbs = wrapper.find(DynamicBreadcrumb).first();
      const expectedCrumb = [["Home", ""]];

      expect(breadcrumbs.props().breadcrumbs).toHaveLength(1);

      const innerCrumb = breadcrumbs.props().breadcrumbs[0];

      expect(innerCrumb).toHaveLength(2);

      expect(innerCrumb[0]).toBe(expectedCrumb[0][0]);
      expect(innerCrumb[1]).toBe(expectedCrumb[0][1]);
    });
  });
  it("Contains 1 <Container/>", () => {
    expect(wrapper.find(Container)).toHaveLength(1);
  });
  it("Contains 1 <Box/>", () => {
    expect(wrapper.find(Box)).toHaveLength(1);
  });

  it("Contains 1 <ActiveStreamCard/>", () => {
    expect(wrapper.find(ActiveStreamCard)).toHaveLength(1);
  });
  it("Contains 1 <ActivityLogCard/>", () => {
    expect(wrapper.find(ActivityLogCard)).toHaveLength(1);
  });
  it("Contains 1 <DevicesCard/>", () => {
    expect(wrapper.find(DevicesCard)).toHaveLength(1);
  });
  it("Contains 1 <DashboardCard/>", () => {
    expect(wrapper.find(DashboardCard)).toHaveLength(1);
  });
});
