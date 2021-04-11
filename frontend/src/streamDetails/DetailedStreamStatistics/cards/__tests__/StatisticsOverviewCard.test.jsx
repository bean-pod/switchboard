import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../../../general/dashboard/DashboardCard";
import SimpleTable from "../../../../general/simpleTable/SimpleTable";
import StatisticsOverviewCard from "../StatisticsOverviewCard";

import { getSampleStreamStats } from "../../../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamStatisticsOverviewCard/> functional component", () => {
  let wrapper;
  const dummyStats = getSampleStreamStats();

  describe("returns a component that", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StatisticsOverviewCard stats={dummyStats} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it("has 1 DashboardCard component with expected props", () => {
      const expectedTitle = "Overview";
      const card = wrapper.find(DashboardCard);
      expect(card).toHaveLength(1);

      const cardProps = card.props();
      expect(cardProps.title).toBe(expectedTitle);
    });
    it("has 1 Grid component with expected props", () => {
      const grid = wrapper.find(Grid);
      expect(grid).toHaveLength(1);

      const gridProps = grid.props();
      expect(gridProps.item).toBe(true);
      expect(gridProps.xs).toBe(12);
    });
    it("has 1 SimpleTable component with expected props", () => {
      const expectedProperties = {
        "Stream ID": dummyStats.id,
        Time: dummyStats.time,
        Flow: dummyStats.window.flow,
        Congestion: dummyStats.window.congestion,
        Flight: dummyStats.window.flight,
        Latency: dummyStats.link.rtt,
        Bandwidth: dummyStats.link.bandwidth,
        "Maximum Bandwidth": dummyStats.link.maxBandwidth
      };
      const table = wrapper.find(SimpleTable);
      expect(table).toHaveLength(1);

      const tableProps = table.props();
      expect(tableProps.properties).toStrictEqual(expectedProperties);
    });
  });
});
