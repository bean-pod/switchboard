import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe } from "@jest/globals";

import { Grid } from "@material-ui/core";
import StreamDetailsDeviceCard from "../StreamDetailsDeviceCard";
import DashboardCard from "../../general/dashboard/DashboardCard";
import SimpleTable from "../../general/simpleTable/SimpleTable";

import DeviceInfo from "../../model/DeviceInfo";
import ButtonInfo from "../../general/dashboard/ButtonInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamDetailsDeviceCard/> functional component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummyDevice = new DeviceInfo(
      "serial",
      "sometime",
      "public",
      "private",
      "someName",
      "Online",
      "encoder",
      "yabadoo"
    );
    const dummyChannel = 10;
    const dummyTitle = "Device Card";
    const expectedProperties = {
      Name: dummyDevice.name,
      "Serial Number": dummyDevice.serialNumber,
      Channel: dummyChannel
    };
    const dummyButton = new ButtonInfo(
      `/Devices/Details/${dummyDevice.serialNumber}`,
      { device: dummyDevice },
      "View Device"
    );

    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamDetailsDeviceCard
          cardTitle={dummyTitle}
          device={dummyDevice}
          channel={dummyChannel}
        />
      );
    });
    it("contains 1 DashboardCard component with expected props", () => {
      const dashCard = wrapper.find(DashboardCard);
      expect(dashCard).toHaveLength(1);

      const dashCardProps = dashCard.props();
      const expectedProps = {
        title: "Device Card",
        button: dummyButton
      };
      expect(dashCardProps.title).toBe(expectedProps.title);
      expect(dashCardProps.button).toStrictEqual(expectedProps.button);
    });
    it("contains 2 Grid components with expected props", () => {
      const grids = wrapper.find(Grid);
      expect(grids).toHaveLength(2);

      const firstGridProps = grids.at(0).props();
      expect(firstGridProps.container).toBe(true);

      const secondGridProps = grids.at(1).props();
      expect(secondGridProps.item).toBe(true);
      expect(secondGridProps.xs).toBe(12);
    });
    it("contains 1 SimpleTable component with expected props", () => {
      const simpleTable = wrapper.find(SimpleTable);
      expect(simpleTable).toHaveLength(1);

      const simpleTableProps = simpleTable.props();
      expect(simpleTableProps.properties).toStrictEqual(expectedProperties);
    });
  });
});
