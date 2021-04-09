import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe } from "@jest/globals";

import StreamDetailsDeviceCard from "../StreamDetailsDeviceCard";
import StreamDeviceCard from "../../general/StreamDeviceCard";

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
    afterEach(() => {
      wrapper.unmount();
    });
    it("contains 1 <StreamDeviceCard/> component with expected props", () => {
      const component = wrapper.find(StreamDeviceCard);
      expect(component).toHaveLength(1);

      const expected = {
        title: dummyTitle,
        button: dummyButton,
        device: dummyDevice,
        channel: dummyChannel
      };

      const props = component.props();
      expect(props.title).toBe(expected.title);
      expect(props.button).toStrictEqual(expected.button);
      expect(props.device).toStrictEqual(expected.device);
      expect(props.channel).toBe(expected.channel);
    });
  });
});
