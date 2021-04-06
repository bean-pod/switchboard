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
    it("contains 2 <Grid/> components", () => {
      const grids = wrapper.find(Grid);
      expect(grids).toHaveLength(2);
    });
    it("first <Grid/> has expected props", () => {
      const outerGrid = wrapper.find(Grid).first();

      const expected = {
        container: true,
        justify: "center",
        direction: "row",
        spacing: 3
      };

      const outerGridProps = outerGrid.props();
      expect(outerGridProps.container).toBe(expected.container);
      expect(outerGridProps.justify).toBe(expected.justify);
      expect(outerGridProps.direction).toBe(expected.direction);
      expect(outerGridProps.spacing).toBe(expected.spacing);
    });
    it("second <Grid/> has expected props", () => {
      const secondGrid = wrapper.find(Grid).at(1);

      const expected = {
        item: true,
        xs: 12,
        childTypeName: "StreamLogTableWrapper"
      };

      const secondGridProps = secondGrid.props();
      expect(secondGridProps.item).toBe(expected.item);
      expect(secondGridProps.xs).toBe(expected.xs);
      expect(secondGridProps.children.type.name).toBe(expected.childTypeName);
    });
    it("contains 1 <StreamLogTableWrapper/> component with expected props", () => {
      const logTableWrapper = wrapper.find(StreamLogTableWrapper);
      expect(logTableWrapper).toHaveLength(1);

      const props = logTableWrapper.props();
      expect(props.streamId).toStrictEqual(dummyId);
    });
  });
});
