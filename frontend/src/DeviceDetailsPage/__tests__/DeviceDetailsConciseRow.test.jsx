import React from "react";
import axios from "axios";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  it,
  test
} from "@jest/globals";
import DeviceDetailsConciseRow from "../DeviceDetailsConciseRow";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");

describe("DeviceDetailsConciseRow", () => {
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
      const result = DeviceDetailsConciseRow.getPropertyDisplayName(
        "ip"
      );
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Name" when passed "name"', () => {
      const expected = "Name";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName(
        "name"
      );
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Status" when passed "status"', () => {
      const expected = "Status";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName(
        "status"
      );
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Channels" when passed "channels"', () => {
      const expected = "Channels";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName(
        "channels"
      );
      // assert
      expect(result).toEqual(expected);
    });
    it('should return "Additional Info" when passed an empty sting', () => {
      const expected = "Additional Info";
      // act
      const result = DeviceDetailsConciseRow.getPropertyDisplayName(
        ""
      );
      // assert
      expect(result).toEqual(expected);
    });
  });
});
