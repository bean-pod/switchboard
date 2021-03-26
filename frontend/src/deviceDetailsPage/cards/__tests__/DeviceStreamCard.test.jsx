import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import DeviceStreamCard from "../DeviceStreamCard";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import DeviceInfo from "../../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceStreamCard/> functional component", () => {
  const device = new DeviceInfo(
    "serial",
    "lastCommunication",
    "publicIpAddress",
    "privateIpAddress",
    "displayName",
    "status",
    []
  );
  const wrapper = Enzyme.shallow(<DeviceStreamCard device={device} />);

  describe("returns a component that", () => {
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      const dashboardCard = wrapper.find(DashboardCard).first();

      expect(dashboardCard.props().title).toBe("Streams");
    });
    it("Contains 2 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2);
    });
    it("First <Grid/> has expected props", () => {
      const outerGrid = wrapper.find(Grid).first();
      const expectedJustify = "center";
      const expectedDirection = "row";
      const expectedSpacing = 3;

      expect(outerGrid.props().container).toBe(true);
      expect(outerGrid.props().justify).toBe(expectedJustify);
      expect(outerGrid.props().direction).toBe(expectedDirection);
      expect(outerGrid.props().spacing).toBe(expectedSpacing);
    });
    it("Second <Grid/>  has expected props", () => {
      const secondGrid = wrapper.find(Grid).at(1);
      const expectedXs = 12;

      expect(secondGrid.props().item).toBe(true);
      expect(secondGrid.props().xs).toBe(expectedXs);
    });
  });
});
