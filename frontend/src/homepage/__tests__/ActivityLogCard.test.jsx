import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import ActivityLogCard from "../ActivityLogCard";

import DashboardCard from "../../general/dashboard/DashboardCard";
import DashboardButton from "../../general/dashboard/DashboardButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<ActivityLogCard/> functional component", () => {
  const wrapper = Enzyme.shallow(<ActivityLogCard />);

  describe("returns a component that", () => {
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      const expectedTitle = "Activity Logs";

      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      const dashboardCard = wrapper.find(DashboardCard).first();
      expect(dashboardCard.props().title).toBe(expectedTitle);
    });
    it("Contains 1 <Grid/> component with expected props", () => {
      expect(wrapper.find(Grid)).toHaveLength(1);

      const props = wrapper.find(Grid).at(0).props();
      const expected = {
        item: true,
        xs: 4,
        childType: "DashboardButton"
      };
      expect(props.item).toBe(expected.item);
      expect(props.xs).toBe(expected.xs);
      expect(props.children.type.name).toBe(expected.childType);
    });
    it("Contains 1 <DashboardButton/> component that  has expected props", () => {
      expect(wrapper.find(DashboardButton)).toHaveLength(1);

      const props = wrapper.find(DashboardButton).first().props();
      expect(props.href).toBe("/Logs");
      expect(props.children).toBe("View All");
    });
  });
});
