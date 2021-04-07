import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, it } from "@jest/globals";

import { Grid } from "@material-ui/core";
import StreamDeviceCard from "../StreamDeviceCard";

import DashboardCard from "../dashboard/DashboardCard";
import SimpleTable from "../simpleTable/SimpleTable";

import ButtonInfo from "../dashboard/ButtonInfo";
import DeviceInfo from "../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamDeviceCard/> functional component", () => {
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

    const dummyButton = new ButtonInfo(
      `somePathname`,
      dummyDevice,
      "View Device"
    );

    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamDeviceCard
          title={dummyTitle}
          button={dummyButton}
          device={dummyDevice}
          channel={dummyChannel}
        />
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });
    it("contains 1 DashboardCard component with expected props", () => {
      const dashCard = wrapper.find(DashboardCard);
      expect(dashCard).toHaveLength(1);

      const dashCardProps = dashCard.props();
      const expectedProps = {
        title: dummyTitle,
        button: dummyButton
      };
      expect(dashCardProps.title).toBe(expectedProps.title);
      expect(dashCardProps.button).toStrictEqual(expectedProps.button);
    });
    it("contains 1 <Grid/> component with expected props", () => {
      const grids = wrapper.find(Grid);
      expect(grids).toHaveLength(1);

      const props = grids.at(0).props();
      expect(props.item).toBe(true);
      expect(props.xs).toBe(12);
    });
    it("contains 1 SimpleTable component with expected props", () => {
      const simpleTable = wrapper.find(SimpleTable);
      expect(simpleTable).toHaveLength(1);

      const expected = {
        Name: dummyDevice.name,
        "Serial Number": dummyDevice.serialNumber,
        Channel: dummyChannel
      };

      const props = simpleTable.props();
      expect(props.properties).toStrictEqual(expected);
    });
  });
});
