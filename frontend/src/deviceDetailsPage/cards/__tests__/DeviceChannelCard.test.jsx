import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Grid } from "@material-ui/core";
import DeviceChannelCard from "../DeviceChannelCard";

import DashboardCard from "../../../general/dashboard/DashboardCard";
import DeviceInfo from "../../../model/DeviceInfo";
import InputChannelInfo from "../../../model/InputChannelInfo";
import ChannelDetailsTable from "../../../devicelist/ChannelDetailsTable";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceChannelCard/> functional component", () => {
  const dummyChannels = [new InputChannelInfo()];
  const device = new DeviceInfo(
    "serial",
    "lastCommunication",
    "publicIpAddress",
    "privateIpAddress",
    "displayName",
    "status",
    dummyChannels
  );
  const wrapper = Enzyme.shallow(<DeviceChannelCard device={device} />);

  describe("returns a component that", () => {
    it("Contains 1 <DashboardCard/> component that has expected props", () => {
      expect(wrapper.find(DashboardCard)).toHaveLength(1);
      const dashboardCard = wrapper.find(DashboardCard).first();

      expect(dashboardCard.props().title).toBe("Channels");
    });

    it("Contains 1 <Grid/> component with expected props", () => {
      expect(wrapper.find(Grid)).toHaveLength(1);
      const props = wrapper.find(Grid).at(0).props();
      const expected = {
        item: true,
        xs: 12,
        childType: "ChannelDetailsTable"
      };

      expect(props.item).toBe(expected.item);
      expect(props.xs).toBe(expected.xs);
      expect(props.children.type.name).toBe(expected.childType);
    });
    it("Contains 1 <ChannelDetailsTable/> component with expected props", () => {
      expect(wrapper.find(ChannelDetailsTable)).toHaveLength(1);

      const props = wrapper.find(ChannelDetailsTable).first().props();
      expect(props.channels).toStrictEqual(dummyChannels);
    });
  });
});
