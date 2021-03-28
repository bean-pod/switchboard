import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  it
} from "@jest/globals";

import { Table, TableBody } from "@material-ui/core";
import DeviceInfoTable from "../DeviceInfoTable";

import DeviceInfo from "../../../model/DeviceInfo";
import DeviceInfoRow from "../DeviceInfoRow";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");
jest.mock("../../../model/DeviceInfo");
jest.spyOn(global.console, "error");

describe("<DeviceInfoTable/> functional component", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("render() function returns a component that", () => {
    describe(`when prop "properties" does not contain "channel"`, () => {
      const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 1]);
      const dummyProperties = ["Something", "OtherThing"];
      dummyDevice.Something = "test";
      dummyDevice.OtherThing = "otherTest";
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <DeviceInfoTable device={dummyDevice} properties={dummyProperties} />
        );
      });
      it("Contains 1 <Table/> component", () => {
        expect(wrapper.find(Table)).toHaveLength(1);
      });
      it("Contains 1 <TableBody/> component", () => {
        expect(wrapper.find(TableBody)).toHaveLength(1);
      });
      it("Contains same number of <DeviceInfoRow/> components as properties passed", () => {
        expect(wrapper.find(DeviceInfoRow)).toHaveLength(
          dummyProperties.length
        );
      });
      it("First <DeviceInfoRow/> component has expected props", () => {
        const props = wrapper.find(DeviceInfoRow).at(0).props();

        expect(props.name).toBe(dummyProperties[0]);
        expect(props.value).toBe("test");
        expect(props.device).toStrictEqual(dummyDevice);
      });
      it("Second <DeviceInfoRow/> component has expected props", () => {
        const props = wrapper.find(DeviceInfoRow).at(1).props();

        expect(props.name).toBe(dummyProperties[1]);
        expect(props.value).toBe("otherTest");
        expect(props.device).toStrictEqual(dummyDevice);
      });
    });
  });
  describe(`when prop "properties" contains "channel" and prop ActiveChannel is assigned`, () => {
    const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 1]);
    const dummyProperties = ["channel"];
    const dummyChannel = 5000;
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <DeviceInfoTable
          device={dummyDevice}
          properties={dummyProperties}
          activeChannel={dummyChannel}
        />
      );
    });
    it("Contains 1 <Table/> component", () => {
      expect(wrapper.find(Table)).toHaveLength(1);
    });
    it("Contains 1 <TableBody/> component", () => {
      expect(wrapper.find(TableBody)).toHaveLength(1);
    });
    it("Contains 1 <DeviceInfoRow/> component with expected props", () => {
      expect(wrapper.find(DeviceInfoRow)).toHaveLength(dummyProperties.length);
      const props = wrapper.find(DeviceInfoRow).first().props();

      expect(props.name).toBe("channel");
      expect(props.value).toBe(dummyChannel);
      expect(props.device).toStrictEqual(dummyDevice);
    });
  });
});
