import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import SimpleTable from "../../../general/simpleTable/SimpleTable";
import StatisticsOverviewCard from "../StatisticsOverviewCard";

import { getSampleStreamStats } from "../../../api/SampleData";

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
    it("has 2 Grid components with expected props", () => {
      const grids = wrapper.find(Grid);
      expect(grids).toHaveLength(2);

      const gridOneProps = grids.at(0).props();
      expect(gridOneProps.container).toBe(true);

      const gridTwoProps = grids.at(1).props();
      expect(gridTwoProps.item).toBe(true);
      expect(gridTwoProps.xs).toBe(12);
    });
    it("has 1 SimpleTable component with expected props", () => {
      const expectedProperties = {
        "Stream ID": 1,
        Time: 2,
        Flow: 31,
        Congestion: 32,
        Flight: 33,
        Latency: 41,
        Bandwidth: 42,
        "Maximum Bandwidth": 43
      };
      const table = wrapper.find(SimpleTable);
      expect(table).toHaveLength(1);

      const tableProps = table.props();
      expect(tableProps.properties).toStrictEqual(expectedProperties);
    });
  });
});
