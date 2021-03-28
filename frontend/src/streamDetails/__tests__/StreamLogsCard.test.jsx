import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import { Grid } from "@material-ui/core";
import DashboardCard from "../../general/dashboard/DashboardCard";
import StreamLogsCard from "../StreamLogsCard";
import LogsTableWrapper from "../../loglist/LogsTableWrapper";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamLogsCard /> functional component", () => {
  let wrapper;

  const dummyLogSource = {
    getStreamLogs() {
      return jest.fn();
    }
  };

  describe("it returns a component that", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StreamLogsCard logsSource={dummyLogSource} />);
    });
    it("has 1 DashboardCard component with expected props", () => {
      const dashCard = wrapper.find(DashboardCard);
      expect(dashCard).toHaveLength(1);
      expect(dashCard.props().title).toBe("Logs");
    });
    it("has 2 Grid components with expected props", () => {
      const grids = wrapper.find(Grid);
      expect(grids).toHaveLength(2);

      const firstGridProps = grids.at(0).props();
      expect(firstGridProps.container).toBe(true);
      
      const secondGridProps = grids.at(1).props();
      expect(secondGridProps.item).toBe(true);
      expect(secondGridProps.xs).toBe(12);
    });
    it("has 1 LogsTableWrapper component", () => {
      expect(wrapper.find(LogsTableWrapper)).toHaveLength(1);
    });
  });
});
