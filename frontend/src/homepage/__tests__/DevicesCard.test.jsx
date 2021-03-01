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
    describe("Contains 1 <DashboardCard/> component", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);

      const dashboardCard = wrapper.find(DashboardCard).first();
      describe("that has props", () => {
        it(`"title" with value "Devices"`, () => {
          expect(dashboardCard.props().title).toBe("Devices");
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
        const expectedXs = 4;
        describe("has props", () => {
          it(`"item" with value true`, () => {
            expect(secondGrid.props().item).toBe(true);
          });
          it(`"xs" with value ${expectedXs}`, () => {
            expect(secondGrid.props().xs).toBe(expectedXs);
          });
        });
        it(`has "children" with type DashboardButton`, () => {
          expect(secondGrid.props().children.type.name).toBe("DashboardButton");
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
    describe("Contains 2 <DashboardButton/> components", () => {
      expect(wrapper.find(DashboardButton)).toHaveLength(2);
      describe("First <DashboardButton/>", () => {
        const firstButton = wrapper.find(DashboardButton).first();
        describe("has props", () => {
          it(`"href" with value "/Devices"`, () => {
            expect(firstButton.props().href).toBe("/Devices");
          });
          it(`"children" with value "View Senders"`, () => {
            expect(firstButton.props().children).toBe("View Senders");
          });
        });
      });
      describe("Second <DashboardButton/>", () => {
        const firstButton = wrapper.find(DashboardButton).at(1);
        describe("has props", () => {
          it(`"href" with value "/Devices"`, () => {
            expect(firstButton.props().href).toBe("/Devices");
          });
          it(`"children" with value "View Receivers"`, () => {
            expect(firstButton.props().children).toBe("View Receivers");
          });
        });
      });
    });
  });
});
