import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import { TableCell, TableContainer, TableRow } from "@material-ui/core";
import DeviceDetailsConciseRow from "../DeviceDetailsConciseRow";
import ChannelDetailsTable from "../../devicelist/ChannelDetailsTable";
import InputChannelInfo from "../../model/InputChannelInfo";
import OutputChannelInfo from "../../model/OutputChannelInfo";

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
    it('should return "IP Address" when passed "ip"', () => {
      const expected = "IP Address";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName("ip");
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
  describe("createInnerTable", () => {
    it("Creates two ChannelDetailsTable components when passed a value of length 2 ", () => {
      const dummyProps = {
        name: "channels",
        value: [new InputChannelInfo(), new OutputChannelInfo()]
      };
      wrapper = Enzyme.shallow(
        DeviceDetailsConciseRow.createInnerTable(dummyProps.value)
      );

      expect(wrapper.find(ChannelDetailsTable)).toHaveLength(2);
    });
  });
  describe("<DeviceDetailsConciseRow/>", () => {
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
    it("Throws an error when using value that is not an array of ChannelInfo objects", () => {
      const dummyValue = "badValue";
      wrapper = Enzyme.shallow(
        <DeviceDetailsConciseRow name="Test_Name" value={dummyValue} />
      );
      expect(console.error).toHaveBeenCalled();
    });
    it("Throws an error when using name that is not a string", () => {
      const dummyValue = [];
      const badName = 2;
      wrapper = Enzyme.shallow(
        <DeviceDetailsConciseRow name={badName} value={dummyValue} />
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
