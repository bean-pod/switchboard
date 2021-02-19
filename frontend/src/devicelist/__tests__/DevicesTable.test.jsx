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
    it("contains one Box component", () => {
      expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("contains one TableContainer component and has maxHeight of 570", () => {
      expect(wrapper.find(TableContainer)).toHaveLength(1);
      expect(wrapper.find(TableContainer).prop("style")).toHaveProperty(
        "maxHeight",
        570
      );
    });
    it("contains one MaterialTable component", () => {
      expect(wrapper.find(MaterialTable)).toHaveLength(1);
    });
  });
});
