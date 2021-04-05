import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import SimpleTable from "../../../general/simpleTable/SimpleTable";
import StatisticsReceivingCard from "../StatisticsReceivingCard";

import { getSampleStreamStats } from "../../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<StatisticsReceivingCard/> functional component", () => {
  let wrapper;
  const dummyStats = getSampleStreamStats();

  describe("returns a component that", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StatisticsReceivingCard stats={dummyStats} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it("has 1 DashboardCard component with expected props", () => {
      const expectedTitle = "Receiving Statistics";
      const card = wrapper.find(DashboardCard);
      expect(card).toHaveLength(1);

      const cardProps = card.props();
      expect(cardProps.title).toBe(expectedTitle);
    });
    it("has 2 Grid components with expected props", () => {
      const grid = wrapper.find(Grid);
      expect(grid).toHaveLength(1);

      const gridProps = grid.props();
      expect(gridProps.item).toBe(true);
      expect(gridProps.xs).toBe(12);
    });
    it("has 1 SimpleTable component with expected props", () => {
      const expectedProperties = {
        Packets: 61,
        "Packets Lost": 62,
        "Packets Dropped": 63,
        "Packets Retransmitted": 64,
        "Packets Belated": 65,
        Bytes: 66,
        "Bytes Lost": 67,
        "Bytes Dropped": 68,
        "Bitrate (Mbps)": 69
      };
      const table = wrapper.find(SimpleTable);
      expect(table).toHaveLength(1);

      const tableProps = table.props();
      expect(tableProps.properties).toStrictEqual(expectedProperties);
    });
  });
});
