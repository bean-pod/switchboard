import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import AdminPanelCard from "../AdminPanelCard";

import DashboardCard from "../../general/dashboard/DashboardCard";
import DashboardButton from "../../general/dashboard/DashboardButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<AdminPanelCard/> functional component", () => {
  const wrapper = Enzyme.shallow(<AdminPanelCard />);

  describe("returns a component that", () => {
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      const dashboardCard = wrapper.find(DashboardCard).first();

      expect(dashboardCard.props().title).toBe("Admin Panel");
    });
    it("Contains 2 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2);
    });
    it("<Grid/> 0 has expected props", () => {
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
    describe("Contains 2 <DashboardButton/> components", () => {
      expect(wrapper.find(DashboardButton)).toHaveLength(2);
      it("First <DashboardButton/> has expected props", () => {
        const firstButton = wrapper.find(DashboardButton).first();
        expect(firstButton.props().href).toBe("/Admin");
        expect(firstButton.props().children).toBe("View Users");
      });
      describe("Second <DashboardButton/> has expected props", () => {
        const secondButton = wrapper.find(DashboardButton).at(1);
        expect(secondButton.props().href).toBe("/Admin/New");
        expect(secondButton.props().children).toBe("Create a User");
      });
    });
  });
});
