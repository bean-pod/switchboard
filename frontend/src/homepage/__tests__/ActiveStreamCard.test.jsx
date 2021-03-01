import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import ActiveStreamsCard from "../ActiveStreamsCard";

import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamsTableWrapper from "../../streamlist/StreamsTableWrapper";
import DashboardButton from "../../general/dashboard/DashboardButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<ActiveStreamCard/> functional Component", () => {
  const wrapper = Enzyme.shallow(<ActiveStreamsCard />);
  describe("returns a component that", () => {
    describe("Contains 1 <DashboardCard/> component", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);

      const dashboardCard = wrapper.find(DashboardCard).first();
      describe("that has props", () => {
        it(`"title" with value "Active Streams"`, () => {
          expect(dashboardCard.props().title).toBe("Active Streams");
        });
        describe(`"style" with value object`, () => {
          expect(typeof dashboardCard.props().style).toBe("object");
          describe(`that has property "height"`, () => {
            const styleProperty = dashboardCard.props().style;
            expect(styleProperty.height).not.toBe(undefined);
            it(` with value "100%"`, () => {
              expect(styleProperty.height).toBe("100%");
            });
          });
        });
      });
    });
    describe("Contains 4 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(4);
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
        it(`has "children" with type StreamsTableWrapper`, () => {
          expect(secondGrid.props().children.type.name).toBe(
            "StreamsTableWrapper"
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
      describe("Fourth <Grid/>", () => {
        const fourthGrid = wrapper.find(Grid).at(3);
        const expectedXs = 4;
        describe("has props", () => {
          it(`"item" with value true`, () => {
            expect(fourthGrid.props().item).toBe(true);
          });
          it(`"xs" with value ${expectedXs}`, () => {
            expect(fourthGrid.props().xs).toBe(expectedXs);
          });
        });
        it(`has "children" with type DashboardButton`, () => {
          expect(fourthGrid.props().children.type.name).toBe("DashboardButton");
        });
      });
    });
    it("Contains 1 <StreamTableWrapper/> component", () => {
      expect(wrapper.find(StreamsTableWrapper)).toHaveLength(1);
    });
    describe("Contains 2 <DashboardButton/> components", () => {
      expect(wrapper.find(DashboardButton)).toHaveLength(2);
      describe("First <DashboardButton/>", () => {
        const firstButton = wrapper.find(DashboardButton).first();
        describe("has props", () => {
          it(`"href" with value "/Streaming"`, () => {
            expect(firstButton.props().href).toBe("/Streaming");
          });
          it(`"children" with value "See more"`, () => {
            expect(firstButton.props().children).toBe("See more");
          });
        });
      });
      describe("Second <DashboardButton/>", () => {
        const firstButton = wrapper.find(DashboardButton).at(1);
        describe("has props", () => {
          it(`"href" with value "/Streaming"`, () => {
            expect(firstButton.props().href).toBe("/Streaming");
          });
          it(`"children" with value "Start Stream"`, () => {
            expect(firstButton.props().children).toBe("Start Stream");
          });
        });
      });
    });
  });
});
