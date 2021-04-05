import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import { Grid } from "@material-ui/core";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import SimpleTable from "../../../general/simpleTable/SimpleTable";
import StatisticsSendingCard from "../StatisticsSendingCard";

import { getSampleStreamStats } from "../../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<StatisticsSendingCard/> functional component", () => {
  let wrapper;
  const dummyStats = getSampleStreamStats();

  describe("returns a component that", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StatisticsSendingCard stats={dummyStats} />);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it("has 1 DashboardCard component with expected props", () => {
      const expectedTitle = "Sending Statistics";
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
        Packets: 51,
        "Packets Lost": 52,
        "Packets Dropped": 53,
        "Packets Retransmitted": 54,
        Bytes: 55,
        "Bytes Dropped": 56,
        "Bitrate (Mbps)": 57
      };
      const table = wrapper.find(SimpleTable);
      expect(table).toHaveLength(1);

      const tableProps = table.props();
      expect(tableProps.properties).toStrictEqual(expectedProperties);
    });
  });
});
