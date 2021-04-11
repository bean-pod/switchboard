import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import { describe, beforeEach, expect, it } from "@jest/globals";
import DeviceDetailsInfoTable from "../DeviceDetailsInfoTable";
import DeviceInfo from "../../model/DeviceInfo";
import DeviceInfoTable from "../DeviceInfoTable/DeviceInfoTable";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceDetailsInfoTable/> functional component", () => {
  describe("returns a component that", () => {
    let wrapper;
    const dummyDevice = new DeviceInfo();
    beforeEach(() => {
      wrapper = Enzyme.shallow(<DeviceDetailsInfoTable device={dummyDevice} />);
    });
    it("Contains 1 <DeviceInfoTable/> with expected props", () => {
      const expectedProperties = [
        "name",
        "serialNumber",
        "status",
        "publicIp",
        "privateIp"
      ];
      expect(wrapper.find(DeviceInfoTable)).toHaveLength(1);
      const props = wrapper.find(DeviceInfoTable).first().props();

      expect(props.device).toBe(dummyDevice);
      expect(props.properties).toStrictEqual(expectedProperties);
    });
  });
});
