import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import ActivityLogCard from "../ActivityLogCard";

import DashboardCard from "../../general/dashboard/DashboardCard";
import LogsTableWrapper from "../../loglist/LogsTableWrapper";
import DashboardButton from "../../general/dashboard/DashboardButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<DevicesCard/> functional component", () => {
  const wrapper = Enzyme.shallow(<ActivityLogCard />);

  describe("returns a component that", () => {
    describe("Contains 1 <DashboardCard/> component", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);

      const dashboardCard = wrapper.find(DashboardCard).first();
      describe("that has props", () => {
        const expectedTitle = "Activity Logs";
        it(`"title" with value "${expectedTitle}"`, () => {
          expect(dashboardCard.props().title).toBe(expectedTitle);
        });
      });
    });
    describe("Contains 3 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(3);
      describe("First <Grid/> has props", () => {
        const outerGrid = wrapper.find(Grid).first();
        const expectedJustify = "center";
        const expectedDirection = "row";
        const expectedSpacing = 3;

        it(`"container" with value true`, () => {
          expect(outerGrid.props().container).toBe(true);
        });
        it(`"justify" with value ${expectedJustify}`, () => {
          expect(outerGrid.props().justify).toBe(expectedJustify);
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
        const expectedXs = 12;
        describe("has props", () => {
          it(`"item" with value true`, () => {
            expect(secondGrid.props().item).toBe(true);
          });
          it(`"xs" with value ${expectedXs}`, () => {
            expect(secondGrid.props().xs).toBe(expectedXs);
          });
        });
        it(`has "children" with type LogsTableWrapper`, () => {
          expect(secondGrid.props().children.type.name).toBe(
            "LogsTableWrapper"
          );
        });
      });
      describe("Third <Grid/>", () => {
        const thirdGrid = wrapper.find(Grid).at(2);
        const expectedXs = 4;
        describe("has props", () => {
          it(`"item" with value true`, () => {
            expect(thirdGrid.props().item).toBe(true);
          });
          it(`"xs" with value ${expectedXs}`, () => {
            expect(thirdGrid.props().xs).toBe(expectedXs);
          });
        });
        it(`has "children" with type DashboardButton`, () => {
          expect(thirdGrid.props().children.type.name).toBe("DashboardButton");
        });
      });
    });
    it("Contains 1 <LogsTableWrapper/> component", () => {
      expect(wrapper.find(LogsTableWrapper)).toHaveLength(1);
    });
    describe("Contains 1 <DashboardButton/> component", () => {
      expect(wrapper.find(DashboardButton)).toHaveLength(1);
      describe("First <DashboardButton/>", () => {
        const firstButton = wrapper.find(DashboardButton).first();
        describe("has props", () => {
          it(`"href" with value "/Logs"`, () => {
            expect(firstButton.props().href).toBe("/Logs");
          });
          it(`"children" with value "View All"`, () => {
            expect(firstButton.props().children).toBe("View All");
          });
        });
      });
    });
  });
});
