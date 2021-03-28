import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { describe, expect } from "@jest/globals";
import DeviceInfo from "../../model/DeviceInfo";

import StreamDeviceInfoTable from "../StreamDeviceInfoTable";
import DeviceInfoTable from "../../deviceDetailsPage/DeviceInfoTable/DeviceInfoTable";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamDeviceInfoTable/> functional component", () => {
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

    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamDeviceInfoTable device={dummyDevice} channel={dummyChannel} />
      );
    });
    it("Contains one <DeviceInfoTable/> component with expected props", () => {
      const expectedProperties = ["name", "serialNumber", "channel"];
      expect(wrapper.find(DeviceInfoTable)).toHaveLength(1);

      const props = wrapper.find(DeviceInfoTable).first().props();
      expect(props.device).toStrictEqual(dummyDevice);
      expect(props.properties).toStrictEqual(expectedProperties);
      expect(props.activeChannel).toStrictEqual(dummyChannel);
    });
  });
});
