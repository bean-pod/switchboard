import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import DeviceLogCard from "../DeviceLogCard";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import DeviceInfo from "../../../model/DeviceInfo";
import DeviceLogTableWrapper from "../../DeviceLogTableWrapper";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceLogCard/> functional component", () => {
  const device = new DeviceInfo(
    "serial",
    "lastCommunication",
    "publicIpAddress",
    "privateIpAddress",
    "displayName",
    "status",
    []
  );
  const wrapper = Enzyme.shallow(<DeviceLogCard device={device} />);

  describe("returns a component that", () => {
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      const dashboardCard = wrapper.find(DashboardCard).first();

      expect(dashboardCard.props().title).toBe("Logs");
    });
    it("Contains 1 <Grid/> component with expected props", () => {
      expect(wrapper.find(Grid)).toHaveLength(1);
      const props = wrapper.find(Grid).at(0).props();
      const expected = {
        item: true,
        xs: 12,
        childType: "DeviceLogTableWrapper"
      };

      expect(props.item).toBe(expected.item);
      expect(props.xs).toBe(expected.xs);
      expect(props.children.type.name).toBe(expected.childType);
    });
    it("Contains 1 <DeviceLogTableWrapper/> component with expected props", () => {
      expect(wrapper.find(DeviceLogTableWrapper)).toHaveLength(1);
      const props = wrapper.find(DeviceLogTableWrapper).first().props();
      expect(props.device).toStrictEqual(device);
    });
  });
});
