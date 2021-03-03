import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import DevicesCard from "../DevicesCard";

import DashboardCard from "../../general/dashboard/DashboardCard";
import DashboardButton from "../../general/dashboard/DashboardButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<DevicesCard/> functional component", () => {
  const wrapper = Enzyme.shallow(<DevicesCard />);

  describe("returns a component that", () => {
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      const dashboardCard = wrapper.find(DashboardCard).first();

      expect(dashboardCard.props().title).toBe("Devices");
    });
    it("Contains 3 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(3);
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
      const expectedXs = 4;

      expect(secondGrid.props().item).toBe(true);
      expect(secondGrid.props().xs).toBe(expectedXs);
      expect(secondGrid.props().children.type.name).toBe("DashboardButton");
    });
    it("Third <Grid/> has expected props", () => {
      const thirdGrid = wrapper.find(Grid).at(2);
      const expectedXs = 4;

      expect(thirdGrid.props().item).toBe(true);
      expect(thirdGrid.props().xs).toBe(expectedXs);

      expect(thirdGrid.props().children.type.name).toBe("DashboardButton");
    });
    describe("Contains 2 <DashboardButton/> components", () => {
      expect(wrapper.find(DashboardButton)).toHaveLength(2);
      it("First <DashboardButton/> has expected props", () => {
        const firstButton = wrapper.find(DashboardButton).first();
        expect(firstButton.props().href).toBe("/Devices");
        expect(firstButton.props().children).toBe("View Senders");
      });
      describe("Second <DashboardButton/> has expected props", () => {
        const secondButton = wrapper.find(DashboardButton).at(1);
        expect(secondButton.props().href).toBe("/Devices");
        expect(secondButton.props().children).toBe("View Receivers");
      });
    });
  });
});
