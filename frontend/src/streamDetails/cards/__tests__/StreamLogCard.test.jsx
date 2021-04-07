import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import StreamLogCard from "../StreamLogCard";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import StreamLogsTableWrapper from "../../StreamLogsTableWrapper";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamLogCard/> functional component", () => {
  let wrapper;
  const dummyId = 1;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamLogCard streamId={dummyId} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("returns a component that", () => {
    it("contains 1 <DashboardCard/> component that has expected props", () => {
      const dashboardCard = wrapper.find(DashboardCard);
      expect(dashboardCard).toHaveLength(1);

      const dashboardCardProps = dashboardCard.props();
      expect(dashboardCardProps.title).toBe("Logs");
    });
    it("contains 1 <Grid/> component", () => {
      const grids = wrapper.find(Grid);
      expect(grids).toHaveLength(1);
    });
    it("<Grid/> has expected props", () => {
      const secondGrid = wrapper.find(Grid);

      const expected = {
        item: true,
        xs: 12,
        childTypeName: "StreamLogsTableWrapper"
      };

      const secondGridProps = secondGrid.props();
      expect(secondGridProps.item).toBe(expected.item);
      expect(secondGridProps.xs).toBe(expected.xs);
      expect(secondGridProps.children.type.name).toBe(expected.childTypeName);
    });
    it("contains 1 <StreamLogsTableWrapper/> component with expected props", () => {
      const logTableWrapper = wrapper.find(StreamLogsTableWrapper);
      expect(logTableWrapper).toHaveLength(1);

      const props = logTableWrapper.props();
      expect(props.streamId).toStrictEqual(dummyId);
    });
  });
});
