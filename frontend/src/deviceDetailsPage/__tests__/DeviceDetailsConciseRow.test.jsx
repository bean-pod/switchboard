import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import { TableCell, TableContainer, TableRow } from "@material-ui/core";
import DeviceDetailsConciseRow from "../DeviceDetailsConciseRow";
import ChannelDetailsTable from "../../devicelist/ChannelDetailsTable";
import InputChannelInfo from "../../model/InputChannelInfo";
import OutputChannelInfo from "../../model/OutputChannelInfo";
import StatusIndicator from "../../general/StatusIndicator";
import DeviceName from "../DeviceName";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");
jest.spyOn(global.console, "error");

describe("DeviceDetailsConciseRow class", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPropertyDisplayName()", () => {
    it("should return Serial Number when passed serialNumber", () => {
      const expected = "Serial Number";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName(
        "serialNumber"
      );
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Last Communication" when passed "lastCommunication"', () => {
      const expected = "Last Communication";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName(
        "lastCommunication"
      );
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Public IP Address" when passed "publicIp"', () => {
      const expected = "Public IP Address";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName("publicIp");
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Private IP Address" when passed "privateIp"', () => {
      const expected = "Private IP Address";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName(
        "privateIp"
      );
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Name" when passed "name"', () => {
      const expected = "Name";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName("name");
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Status" when passed "status"', () => {
      const expected = "Status";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName("status");
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Channels" when passed "channels"', () => {
      const expected = "Channels";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName("channels");
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Additional Info" when passed an empty sting', () => {
      const expected = "Additional Info";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName("");
      // assert
      expect(result).toEqual(expected);
    });
  });
  describe("createInnerTable()", () => {
    describe("When passed a value of length 2 ", () => {
      const dummyProps = {
        name: "channels",
        value: [new InputChannelInfo(), new OutputChannelInfo()]
      };
      wrapper = Enzyme.shallow(
        DeviceDetailsConciseRow.createInnerTable(dummyProps.value)
      );
      it("Creates one (1) ChannelDetailsTable component", () => {
        expect(wrapper.find(ChannelDetailsTable)).toHaveLength(1);
      });
    });
  });
  describe("render function", () => {
    it("Renders one (1) <TableRow/> components", () => {
      const dummyValue = [];
      wrapper = Enzyme.shallow(
        <DeviceDetailsConciseRow name="Test_Name" value={dummyValue} />
      );
      expect(wrapper.find(TableRow)).toHaveLength(1);
    });
    it('Renders two (2) <TableCell/> components if name is not "channels"', () => {
      const dummyValue = [];
      wrapper = Enzyme.shallow(
        <DeviceDetailsConciseRow name="Test_Name" value={dummyValue} />
      );
      expect(wrapper.find(TableCell)).toHaveLength(2);
    });
    it('Renders one (1) <TableContainer/> component if name is "channels"', () => {
      const dummyValue = [];
      wrapper = Enzyme.shallow(
        <DeviceDetailsConciseRow name="channels" value={dummyValue} />
      );
      expect(wrapper.find(TableContainer)).toHaveLength(1);
    });
  });
  describe("createTableCellContents()", () => {
    it('should create a StatusIndicator component when passed "status"', () => {
      const name = "status";
      const value = "Offline";
      const device = {
        serialNumber: "serial"
      };

      wrapper = Enzyme.shallow(
        DeviceDetailsConciseRow.createTableCellContents(name, value, device)
      );

      expect(wrapper.type()).toEqual("div");
      expect(wrapper.instance()).toBeInstanceOf(StatusIndicator);
    });
    it('should call createInnerTable() when passed "channels"', () => {
      jest.spyOn(DeviceDetailsConciseRow, "createInnerTable");

      const name = "channels";
      const value = [];
      const device = {
        serialNumber: "serial"
      };

      DeviceDetailsConciseRow.createTableCellContents(name, value, device);

      expect(DeviceDetailsConciseRow.createInnerTable).toHaveBeenCalledWith(
        value
      );
    });
    it('should call createInnerTable() when passed "channels"', () => {
      jest.spyOn(DeviceDetailsConciseRow, "createInnerTable");

      const name = "name";
      const value = "Name";
      const device = {
        serialNumber: "serial"
      };

      wrapper = Enzyme.shallow(
        DeviceDetailsConciseRow.createTableCellContents(name, value, device)
      );
      expect(wrapper.instance()).toBeInstanceOf(DeviceName);
    });
  });
});
