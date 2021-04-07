import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import StreamLogCard from "../StreamLogCard";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import StreamLogTableWrapper from "../../StreamLogTableWrapper";

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
      const grid = wrapper.find(Grid);
      expect(grid).toHaveLength(1);
    });
    it("<Grid/> has expected props", () => {
      const grid = wrapper.find(Grid);

      const expected = {
        item: true,
        xs: 12,
        childTypeName: "StreamLogTableWrapper"
      };

      const gridProps = grid.props();
      expect(gridProps.item).toBe(expected.item);
      expect(gridProps.xs).toBe(expected.xs);
      expect(gridProps.children.type.name).toBe(expected.childTypeName);
    });
    it("contains 1 <StreamLogsTableWrapper/> component with expected props", () => {
      const logTableWrapper = wrapper.find(StreamLogTableWrapper);
      expect(logTableWrapper).toHaveLength(1);

      const props = logTableWrapper.props();
      expect(props.streamId).toStrictEqual(dummyId);
    });
  });
});
