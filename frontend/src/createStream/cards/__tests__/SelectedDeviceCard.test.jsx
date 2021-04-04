import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe } from "@jest/globals";

import SelectedDeviceCard from "../SelectedDeviceCard";

import StreamDeviceCard from "../../../general/StreamDeviceCard";
import DeviceInfo from "../../../model/DeviceInfo";
import ButtonInfo from "../../../general/dashboard/ButtonInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<SelectedDeviceCard/> functional component", () => {
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
    const dummyTitle = "Device Card";
    const dummyChannel = 10;
    const mockOpenDialog = jest.fn();

    const dummyButton = new ButtonInfo(
     "",
     dummyDevice,
     "Edit",
     mockOpenDialog
    );

    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <SelectedDeviceCard
          title={dummyTitle}
          openDialog={mockOpenDialog}
          device={dummyDevice}
          channelId={dummyChannel}
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
