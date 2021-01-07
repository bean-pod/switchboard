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
import { Box, TableContainer } from "@material-ui/core";
import MaterialTable from "material-table";
import DevicesTable from "../DevicesTable";

Enzyme.configure({ adapter: new Adapter() });
jest.spyOn(global.console, "error");

describe("<DevicesTable/> component", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("has the correct components", () => {
    const dummyTitle = "TEST TITLE";
    const dummyDevices = [];
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <DevicesTable title={dummyTitle} devices={dummyDevices} />
      );
    });
    it("contains one (1) Box component", () => {
      expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("contains one (1) TableContainer component", () => {
      expect(wrapper.find(TableContainer)).toHaveLength(1);
    });
    it("contains one (1) MaterialTable component", () => {
      expect(wrapper.find(MaterialTable)).toHaveLength(1);
    });
  });
  describe("Props validation", () => {
    /*  eslint-disable no-console */
    const validTitle = "TEST TITLE";
    const validDevices = [];
    it("Does not log error if inputs are valid", () => {
      wrapper = Enzyme.shallow(
        <DevicesTable title={validTitle} devices={validDevices} />
      );
      expect(console.error).not.toHaveBeenCalled();
    });
    it("logs an error if title is a string", () => {
      const notAString = 47384;
      wrapper = Enzyme.shallow(
        <DevicesTable title={notAString} devices={validDevices} />
      );
      expect(console.error).toHaveBeenCalled();
    });
    it("logs an error if devices is not an array of DeviceInfo objects", () => {
      const notAnArrayOfDeviceInfo = 47384;
      wrapper = Enzyme.shallow(
        <DevicesTable title={validTitle} devices={notAnArrayOfDeviceInfo} />
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
