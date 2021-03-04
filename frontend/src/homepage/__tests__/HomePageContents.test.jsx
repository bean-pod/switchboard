import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Box, Container, Grid } from "@material-ui/core";
import HomePageContents from "../HomePageContents";

import DynamicBreadcrumb from "../../general/DynamicBreadcrumb";
import GridColumn from "../../general/dashboard/GridColumn";
import AdminPanelCard from "../AdminPanelCard";
import ActiveStreamCard from "../ActiveStreamCard";
import ActivityLogCard from "../ActivityLogCard";
import DevicesCard from "../DevicesCard";

Enzyme.configure({ adapter: new Adapter() });
describe("<HomePage/> functional component", () => {
  const wrapper = Enzyme.shallow(<HomePageContents />);
  it("Contains 6 <Grid/> components", () => {
    expect(wrapper.find(Grid)).toHaveLength(6);
  });
  it("First <Grid/> has expected props", () => {
    const outerGrid = wrapper.find(Grid).first();
    const expectedJustify = "center";
    const expectedAlign = "stretch";
    const expectedDirection = "row";
    const expectedSpacing = 3;

    expect(outerGrid.props().container).toBe(true);
    expect(outerGrid.props().justify).toBe(expectedJustify);
    expect(outerGrid.props().alignItems).toBe(expectedAlign);
    expect(outerGrid.props().direction).toBe(expectedDirection);
    expect(outerGrid.props().spacing).toBe(expectedSpacing);
  });
  it("Second <Grid/> has expected props", () => {
    const secondGrid = wrapper.find(Grid).at(1);
    const expectedXs = 6;
    expect(secondGrid.props().item).toBe(true);
    expect(secondGrid.props().xs).toBe(expectedXs);
  });
  it("Third <Grid/> has expected props", () => {
    const thirdGrid = wrapper.find(Grid).at(2);

    expect(typeof thirdGrid.props().style).toBe("object");
    const styleProperty = thirdGrid.props().style;
    expect(styleProperty.height).not.toBe(undefined);
    expect(styleProperty.height).toBe("100%");
    expect(thirdGrid.props().children.type.name).toBe("ActiveStreamCard");
  });
  it("Fourth <Grid/> has expected props", () => {
    const fourthGrid = wrapper.find(Grid).at(3);
    const expectedXs = 12;

    expect(fourthGrid.props().item).toBe(true);
    expect(fourthGrid.props().xs).toBe(expectedXs);
    expect(fourthGrid.props().children.type.name).toBe("DevicesCard");
  });
  it("Fifth <Grid/> has expected props", () => {
    const fifthGrid = wrapper.find(Grid).at(4);
    const expectedXs = 12;

    expect(fifthGrid.props().item).toBe(true);
    expect(fifthGrid.props().xs).toBe(expectedXs);
    expect(fifthGrid.props().children.type.name).toBe("ActivityLogCard");
  });
  it("Sixth <Grid/> has expected props", () => {
    const sixthGrid = wrapper.find(Grid).at(5);
    const expectedXs = 12;

    expect(sixthGrid.props().item).toBe(true);
    expect(sixthGrid.props().xs).toBe(expectedXs);
    expect(sixthGrid.props().children.type.name).toBe("AdminPanelCard");
  });
  it("Contains 1 <GridColumn/> Component that has expected props", () => {
    expect(wrapper.find(GridColumn)).toHaveLength(1);
    const gridColumn = wrapper.find(GridColumn).first();
    const expectedWidth = 6;

    expect(gridColumn.props().width).toBe(expectedWidth);
  });
  it("Contains 1 <DynamicBreadcrumb/> Component that has expected props", () => {
    expect(wrapper.find(DynamicBreadcrumb)).toHaveLength(1);
    const breadcrumbs = wrapper.find(DynamicBreadcrumb).first();
    const expectedCrumb = [["Home", ""]];
    expect(breadcrumbs.props().breadcrumbs).toHaveLength(1);
    const innerCrumb = breadcrumbs.props().breadcrumbs[0];
    expect(innerCrumb).toHaveLength(2);
    expect(innerCrumb[0]).toBe(expectedCrumb[0][0]);
    expect(innerCrumb[1]).toBe(expectedCrumb[0][1]);
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
  it("Contains 1 <AdminPanelCard/>", () => {
    expect(wrapper.find(AdminPanelCard)).toHaveLength(1);
  });
});
