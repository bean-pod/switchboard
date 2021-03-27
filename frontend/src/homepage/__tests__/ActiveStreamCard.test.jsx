import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import ActiveStreamCard from "../ActiveStreamCard";

import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamsTableWrapper from "../../streamlist/StreamsTableWrapper";
import DashboardButton from "../../general/dashboard/DashboardButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<ActiveStreamCard/> functional Component", () => {
  const wrapper = Enzyme.shallow(<ActiveStreamCard />);
  describe("returns a component that", () => {
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);

      const dashboardCard = wrapper.find(DashboardCard).first();
      expect(dashboardCard.props().title).toBe("Active Streams");
      expect(typeof dashboardCard.props().style).toBe("object");

      const styleProperty = dashboardCard.props().style;
      expect(styleProperty.height).toBe("100%");
    });

    it("Contains 4 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(4);
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
    it("Second <Grid/> has expected props", () => {
      const secondGrid = wrapper.find(Grid).at(1);
      const expectedXs = 12;
      expect(secondGrid.props().item).toBe(true);
      expect(secondGrid.props().xs).toBe(expectedXs);
      expect(secondGrid.props().children.type.name).toBe("StreamsTableWrapper");
    });
    it("Third <Grid/> has expected props", () => {
      const thirdGrid = wrapper.find(Grid).at(2);
      const expectedXs = 4;
      expect(thirdGrid.props().item).toBe(true);
      expect(thirdGrid.props().xs).toBe(expectedXs);
      expect(thirdGrid.props().children.type.name).toBe("DashboardButton");
    });
    it("Fourth <Grid/> has expected props", () => {
      const fourthGrid = wrapper.find(Grid).at(3);
      const expectedXs = 4;
      expect(fourthGrid.props().item).toBe(true);
      expect(fourthGrid.props().xs).toBe(expectedXs);

      expect(fourthGrid.props().children.type.name).toBe("DashboardButton");
    });
    it("Contains 1 <StreamTableWrapper/> component", () => {
      expect(wrapper.find(StreamsTableWrapper)).toHaveLength(1);
    });
    it("Contains 2 <DashboardButton/> components", () => {
      expect(wrapper.find(DashboardButton)).toHaveLength(2);
    });
    it("First <DashboardButton/> has expected props", () => {
      const firstButton = wrapper.find(DashboardButton).first();

      expect(firstButton.props().href).toBe("/Streams");
      expect(firstButton.props().children).toBe("See More");
    });
    it("Second <DashboardButton/> has expected props", () => {
      const firstButton = wrapper.find(DashboardButton).at(1);

      expect(firstButton.props().href).toBe("/Streams/New");
      expect(firstButton.props().children).toBe("Start Stream");
    });
  });
});
