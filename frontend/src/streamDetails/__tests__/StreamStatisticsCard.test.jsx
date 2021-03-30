import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import { Box, Grid } from "@material-ui/core";
import StreamStatisticsCard from "../StreamStatisticsCard";
import DashboardCard from "../../general/dashboard/DashboardCard";
import SimpleTable from "../../general/simpleTable/SimpleTable";
import StreamStatisticsButton from "../DetailedStreamStatistics/StreamStatisticsButton";
import { getSampleStreamStats } from "../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamStatisticsCard/> class component", () => {
  let wrapper;
  const dummyStreamId = 1;
  const dummyStats = getSampleStreamStats();

  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamStatisticsCard streamId={dummyStreamId} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe("handleStatsChange() function", () => {
    it("should set the stats state", () => {
      const startingState = {
        stats: []
      };
      const expectedState = {
        stats: dummyStats
      };

      expect(wrapper.state()).toStrictEqual(startingState);
      wrapper.instance().handleStatsChange(dummyStats);
      expect(wrapper.state()).toStrictEqual(expectedState);
    });
  });
  describe("getPropertyNames() function", () => {
    it("should return a specific array of property names", () => {
      const expectedNames = [
        "Time",
        "Round-Trip-Time",
        "Packets Retransmitted",
        "Packets Dropped"
      ];

      const actualNames = wrapper.instance().getPropertyNames();
      expect(actualNames).toStrictEqual(expectedNames);
    });
  });
  describe("getProperties() function", () => {
    it("should return a specific array of properties", () => {
      const expectedProperties = [2, 41, 54, 53];

      wrapper.instance().handleStatsChange(dummyStats);
      const actualProperties = wrapper.instance().getProperties();
      expect(actualProperties).toStrictEqual(expectedProperties);
    });
  });
  describe("render() function", () => {
    it("should render 1 DashboardCard with expected props", () => {
      const expectedProps = { title: "Statistics" };

      const dashCard = wrapper.find(DashboardCard);
      expect(dashCard).toHaveLength(1);

      expect(dashCard.props().title).toBe(expectedProps.title);
    });
    it("should render 3 Grid components", () => {
      expect(wrapper.find(Grid)).toHaveLength(3);
    });
    it("First Grid component should have expected props", () => {
      const expectedProps = { container: true };
      const gridProps = wrapper.find(Grid).at(0).props();
      expect(gridProps.container).toBe(expectedProps.container);
    });
    it("Second Grid component should have expected props", () => {
      const expectedProps = { item: true, xs: 12 };
      const gridProps = wrapper.find(Grid).at(1).props();
      expect(gridProps.item).toBe(expectedProps.item);
      expect(gridProps.xs).toBe(expectedProps.xs);
    });
    it("Third Grid component should have expected props", () => {
      const expectedProps = { item: true, xs: 12 };
      const gridProps = wrapper.find(Grid).at(2).props();
      expect(gridProps.item).toBe(expectedProps.item);
      expect(gridProps.xs).toBe(expectedProps.xs);
    });
    it("should render 1 SimpleTable component with expected props", () => {
      const expectedProps = {
        propertyPairs: [
          ["Time", 2],
          ["Round-Trip-Time", 41],
          ["Packets Retransmitted", 54],
          ["Packets Dropped", 53]
        ]
      };

      wrapper.instance().handleStatsChange(dummyStats);

      const table = wrapper.find(SimpleTable);
      expect(table).toHaveLength(1);

      const tableProps = table.props();
      expect(tableProps.propertyPairs).toStrictEqual(
        expectedProps.propertyPairs
      );
    });
    it("should render 1 Box component with expected props", () => {
      const expectedProps = { className: "alignRightFloatPadded" };

      const box = wrapper.find(Box);
      expect(box).toHaveLength(1);

      const boxProps = box.props();
      expect(boxProps.className).toBe(expectedProps.className);
    });
    it("should render 1 StreamStatisticsButton component with expected props", () => {
      const expectedProps = { statistics: dummyStats };

      wrapper.instance().handleStatsChange(dummyStats);

      const button = wrapper.find(StreamStatisticsButton);
      expect(button).toHaveLength(1);

      const buttonProps = button.props();
      expect(buttonProps.statistics).toStrictEqual(expectedProps.statistics);
    });
  });
});
