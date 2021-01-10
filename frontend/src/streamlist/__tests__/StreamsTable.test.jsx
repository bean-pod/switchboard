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
import StreamsTable from "../StreamsTable";

Enzyme.configure({ adapter: new Adapter() });
jest.spyOn(global.console, "error");

describe("<StreamsTable/> component", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("has the correct components", () => {
    const dummyStreams = [];
    beforeEach(() => {
      wrapper = Enzyme.shallow(<StreamsTable streamDetails={dummyStreams} />);
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
    const validStreams = [];
    it("Does not log error if inputs are valid", () => {
      wrapper = Enzyme.shallow(<StreamsTable streamDetails={validStreams} />);
      expect(console.error).not.toHaveBeenCalled();
    });
    it("logs an error if streams is not an array of StreamInfo objects", () => {
      const notAnArrayOfStreamInfo = 47384;
      wrapper = Enzyme.shallow(
        <StreamsTable streamDetails={notAnArrayOfStreamInfo} />
      );
      expect(console.error).toHaveBeenCalled();
    });
  });
});
