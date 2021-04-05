import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe } from "@jest/globals";

import SelectChannelTable from "../SelectChannelTable";

import SelectTable from "../SelectTable";
import DeviceInfo from "../../../model/DeviceInfo";
import InputChannelInfo from "../../../model/InputChannelInfo";
import OutputChannelInfo from "../../../model/OutputChannelInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<SelectChannelTable/> functional component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummyChannels = [
      new InputChannelInfo("", "hey"),
      new OutputChannelInfo("", "you"),
      new InputChannelInfo("", "there")
    ];
    const dummyDevice0 = new DeviceInfo(
      "serial",
      "sometime",
      "public",
      "private",
      "someName",
      "Online",
      dummyChannels,
      "encoder",
      "yabadoo"
    );
    const dummyDevice1 = new DeviceInfo("", "", "", "", "someName2");
    const dummyDevices = [dummyDevice0, dummyDevice1];
    const dummySelectedIndex = 10;

    const mockSetIndex = jest.fn();
    const dummyDeviceIndex = 0;

    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <SelectChannelTable
          selectedIndex={dummySelectedIndex}
          setIndex={mockSetIndex}
          deviceList={dummyDevices}
          deviceIndex={dummyDeviceIndex}
        />
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it("contains 1 <SelectTable/> component with expected props", () => {
      const component = wrapper.find(SelectTable);
      expect(component).toHaveLength(1);

      const channelNames = [
        dummyChannels[0].name,
        dummyChannels[1].name,
        dummyChannels[2].name
      ];

      const expected = {
        selectedIndex: dummySelectedIndex,
        setIndex: mockSetIndex,
        items: channelNames
      };

      const props = component.props();
      expect(props.selectedIndex).toBe(expected.selectedIndex);
      expect(props.setIndex).toStrictEqual(expected.setIndex);
      expect(props.items).toStrictEqual(expected.items);
    });
  });
});
