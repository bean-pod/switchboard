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
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      const dashboardCard = wrapper.find(DashboardCard);

      expect(dashboardCard.props().title).toBe("Logs");
    });
    it("Contains 2 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(2);
    });
    it("First <Grid/> has expected props", () => {
      const outerGrid = wrapper.find(Grid).first();
      const expectedJustify = "center";
      const expectedDirection = "row";
      const expectedSpacing = 3;

      expect(outerGrid.props().container).toBe(true);
      expect(outerGrid.props().justify).toBe(expectedJustify);
      expect(outerGrid.props().direction).toBe(expectedDirection);
      expect(outerGrid.props().spacing).toBe(expectedSpacing);
    });
    it("Second <Grid/>  has expected props", () => {
      const secondGrid = wrapper.find(Grid).at(1);
      const expectedXs = 12;

      expect(secondGrid.props().item).toBe(true);
      expect(secondGrid.props().xs).toBe(expectedXs);
      expect(secondGrid.props().children.type.name).toBe(
        "StreamLogTableWrapper"
      );
    });
    it("Contains 1 <StreamLogTableWrapper/> component with expected props", () => {
      expect(wrapper.find(StreamLogTableWrapper)).toHaveLength(1);
      const props = wrapper.find(StreamLogTableWrapper).props();
      expect(props.streamId).toStrictEqual(dummyId);
    });
  });
});
