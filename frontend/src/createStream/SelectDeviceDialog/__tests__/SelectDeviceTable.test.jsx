import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe } from "@jest/globals";

import SelectDeviceTable from "../SelectDeviceTable";

import SelectTable from "../SelectTable";
import DeviceInfo from "../../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<SelectDeviceTable/> functional component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummyDevice1 = new DeviceInfo(
      "serial",
      "sometime",
      "public",
      "private",
      "someName",
      "Online",
      "encoder",
      "yabadoo"
    );
    const dummyDevice2 = new DeviceInfo("", "", "", "", "someName2");
    const dummyDevices = [dummyDevice1, dummyDevice2];
    const dummySelectedIndex = 10;
    const mockSetIndex = jest.fn();

    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <SelectDeviceTable
          selectedIndex={dummySelectedIndex}
          setIndex={mockSetIndex}
          deviceList={dummyDevices}
        />
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it("contains 1 <SelectTable/> component with expected props", () => {
      const component = wrapper.find(SelectTable);
      expect(component).toHaveLength(1);

      const expected = {
        selectedIndex: dummySelectedIndex,
        setIndex: mockSetIndex,
        items: [dummyDevice1.name, dummyDevice2.name]
      };

      const props = component.props();
      expect(props.selectedIndex).toBe(expected.selectedIndex);
      expect(props.setIndex).toStrictEqual(expected.setIndex);
      expect(props.items).toStrictEqual(expected.items);
    });
  });
});
