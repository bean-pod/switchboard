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

    it("Contains 3 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(3);
    });
    it("<Grid/> 0 has expected props", () => {
      const props = wrapper.find(Grid).at(0).props();
      const expected = {
        item: true,
        xs: 12,
        childType: "StreamsTableWrapper"
      };
      expect(props.item).toBe(expected.item);
      expect(props.xs).toBe(expected.xs);
      expect(props.children.type.name).toBe(expected.childType);
    });
    it("<Grid/> 1 has expected props", () => {
      const props = wrapper.find(Grid).at(1).props();
      const expected = {
        item: true,
        xs: 4,
        childType: "DashboardButton"
      };
      expect(props.item).toBe(expected.item);
      expect(props.xs).toBe(expected.xs);
      expect(props.children.type.name).toBe(expected.childType);
    });
    it("<Grid/> 2 has expected props", () => {
      const props = wrapper.find(Grid).at(2).props();
      const expected = {
        item: true,
        xs: 4,
        childType: "DashboardButton"
      };
      expect(props.item).toBe(expected.item);
      expect(props.xs).toBe(expected.xs);
      expect(props.children.type.name).toBe(expected.childType);
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
      expect(firstButton.props().children).toBe("See more");
    });
    it("Second <DashboardButton/> has expected props", () => {
      const firstButton = wrapper.find(DashboardButton).at(1);

      expect(firstButton.props().href).toBe("/Streams/New");
      expect(firstButton.props().children).toBe("Start Stream");
    });
  });
});
