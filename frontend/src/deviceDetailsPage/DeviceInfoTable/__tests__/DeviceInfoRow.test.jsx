import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  describe,
  expect,
  jest,
  it,
  beforeEach
} from "@jest/globals";
import { TableCell, TableRow } from "@material-ui/core";

import DeviceInfoRow from "../DeviceInfoRow";
import ChannelDetailsTable from "../../../devicelist/ChannelDetailsTable";

import StatusIndicator from "../../../general/StatusIndicator";
import DeviceName from "../../DeviceName";

import DeviceInfo from "../../../model/DeviceInfo";
import InputChannelInfo from "../../../model/InputChannelInfo";
import OutputChannelInfo from "../../../model/OutputChannelInfo";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

describe("<DeviceInfoRow/> Class component", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPropertyDisplayName() function", () => {
    const dummyValue = [];
    const dummyDevice = new DeviceInfo("serial");

    it(`should return Serial Number when passed serialNumber`, () => {
      const input = "serialNumber";
      const expected = "Serial Number";
      wrapper = Enzyme.shallow(
        <DeviceInfoRow name={input} value={dummyValue} device={dummyDevice} />
      );
      // act
      const result = wrapper.instance().getPropertyDisplayName();
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Last Communication" when passed "lastCommunication"', () => {
      const input = "lastCommunication";
      const expected = "Last Communication";
      wrapper = Enzyme.shallow(
        <DeviceInfoRow name={input} value={dummyValue} device={dummyDevice} />
      );
      // act
      const result = wrapper.instance().getPropertyDisplayName();
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Public IP Address" when passed "publicIp"', () => {
      const expected = "Public IP Address";
      const input = "publicIp";
      wrapper = Enzyme.shallow(
        <DeviceInfoRow name={input} value={dummyValue} device={dummyDevice} />
      );
      // act
      const result = wrapper.instance().getPropertyDisplayName();
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Private IP Address" when passed "privateIp"', () => {
      const expected = "Private IP Address";
      const input = "privateIp";
      wrapper = Enzyme.shallow(
        <DeviceInfoRow name={input} value={dummyValue} device={dummyDevice} />
      );
      // act
      const result = wrapper.instance().getPropertyDisplayName();
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Name" when passed "name"', () => {
      const expected = "Name";
      const input = "name";
      wrapper = Enzyme.shallow(
        <DeviceInfoRow name={input} value={dummyValue} device={dummyDevice} />
      );
      // act
      const result = wrapper.instance().getPropertyDisplayName();
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Status" when passed "status"', () => {
      const expected = "Status";
      const input = "status";
      const value = "Offline";
      wrapper = Enzyme.shallow(
        <DeviceInfoRow name={input} value={value} device={dummyDevice} />
      );
      // act
      const result = wrapper.instance().getPropertyDisplayName();
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Channels" when passed "channels"', () => {
      const expected = "Channels";
      const input = "channels";
      wrapper = Enzyme.shallow(
        <DeviceInfoRow name={input} value={dummyValue} device={dummyDevice} />
      );
      // act
      const result = wrapper.instance().getPropertyDisplayName();
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Additional Info" when passed an empty sting', () => {
      const expected = "Additional Info";
      const input = "";
      wrapper = Enzyme.shallow(
        <DeviceInfoRow name={input} value={dummyValue} device={dummyDevice} />
      );
      // act
      const result = wrapper.instance().getPropertyDisplayName();
      // assert
      expect(result).toEqual(expected);
    });
  });
  describe("createInnerTable() function", () => {
    const dummyValue = [new InputChannelInfo(), new OutputChannelInfo()];

    beforeEach(() => {
      const dummyName = "channels";
      const dummyDevice = new DeviceInfo("serial");
      wrapper = Enzyme.shallow(
        <DeviceInfoRow
          name={dummyName}
          value={dummyValue}
          device={dummyDevice}
        />
      );

      // act
      wrapper = Enzyme.shallow(wrapper.instance().createInnerTable());
    });
    describe("returns a component that", () => {
      it("Contains 1 <ChannelDetailsTable/> component with expected props", () => {
        expect(wrapper.find(ChannelDetailsTable)).toHaveLength(1);
        const props = wrapper.find(ChannelDetailsTable).first().props();
        expect(props.channels).toStrictEqual(dummyValue);
      });
    });
  });
  describe("render() function", () => {
    beforeEach(() => {
      const dummyName = "Test_Name";
      const dummyValue = [];
      const dummyDevice = new DeviceInfo();
      wrapper = Enzyme.shallow(
        <DeviceInfoRow
          name={dummyName}
          value={dummyValue}
          device={dummyDevice}
        />
      );
    });
    it("Renders one (1) <TableRow/> component", () => {
      expect(wrapper.find(TableRow)).toHaveLength(1);
    });
    it('Renders two (2) <TableCell/> components if name is not "channels"', () => {
      expect(wrapper.find(TableCell)).toHaveLength(2);
    });
  });
  describe("createTableCellContents() function", () => {
    const dummyDevice = new DeviceInfo("serial");
    it('should return a <StatusIndicator/> component when name is "status"', () => {
      const dummyName = "status";
      const dummyValue = "Offline";

      wrapper = Enzyme.shallow(
        <DeviceInfoRow
          name={dummyName}
          value={dummyValue}
          device={dummyDevice}
        />
      );

      // act
      wrapper = Enzyme.shallow(wrapper.instance().createTableCellContents());

      expect(wrapper.instance()).toBeInstanceOf(StatusIndicator);
    });
    it('should return a <DeviceName/> component when name is "name"', () => {
      const dummyName = "name";
      const dummyValue = "Something";

      wrapper = Enzyme.shallow(
        <DeviceInfoRow
          name={dummyName}
          value={dummyValue}
          device={dummyDevice}
        />
      );

      // act
      wrapper = Enzyme.shallow(wrapper.instance().createTableCellContents());

      expect(wrapper.instance()).toBeInstanceOf(DeviceName);
    });
    it('should return the same component as createInnerTable when passed "channels"', () => {
      const dummyName = "channels";
      const dummyValue = [];

      wrapper = Enzyme.shallow(
        <DeviceInfoRow
          name={dummyName}
          value={dummyValue}
          device={dummyDevice}
        />
      );
      const expected = Enzyme.shallow(wrapper.instance().createInnerTable());

      // act
      wrapper = Enzyme.shallow(wrapper.instance().createTableCellContents());

      expect(wrapper).toStrictEqual(expected);
    });
  });
});
