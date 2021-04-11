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
import {
  ArrowDownward,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";
import MaterialTable from "material-table";
import StreamsTable from "../StreamsTable";

Enzyme.configure({ adapter: new Adapter() });
jest.spyOn(global.console, "error");

describe("<StreamsTable/> component", () => {
  let wrapper;
  const dummyStreams = [];
  const dummyColumns = [
    {
      title: "ID",
      field: "id"
    },
    {
      title: "Date",
      field: "date"
    }
  ];

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <StreamsTable streams={dummyStreams} columns={dummyColumns} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("has the correct components", () => {
    it("contains 1 <Box/> component", () => {
      expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("contains 1 <TableContainer/> component", () => {
      expect(wrapper.find(TableContainer)).toHaveLength(1);
    });
    it("contains 1 <MaterialTable/> component with expected props", () => {
      const table = wrapper.find(MaterialTable);
      expect(table).toHaveLength(1);

      const wrapperProps = wrapper.instance().props;
      const shallowWrapper = wrapper.instance();
      const expected = {
        columns: wrapperProps.columns,
        data: wrapperProps.streams,
        options: shallowWrapper.getOptions(),
        icons: shallowWrapper.getIcons()
      };

      const tableProps = table.props();
      expect(tableProps.columns).toBe(expected.columns);
      expect(tableProps.data).toBe(expected.data);
      expect(tableProps.options).toEqual(expected.options);
      expect(tableProps.icons).toEqual(expected.icons);
    });
  });

  describe("getOptions() function", () => {
    it("should return the expected options to be used in the <MaterialTable/> component", () => {
      const expected = {
        toolbar: false,
        headerStyle: {
          backgroundColor: "#f1f1f1",
          fontWeight: "bold"
        },
        filtering: false,
        draggable: false
      };
      const result = wrapper.instance().getOptions();
      expect(result).toStrictEqual(expected);
    });
  });

  describe("getIcons() function", () => {
    it("should return the expected icons to be used in the <MaterialTable/> component", () => {
      const expected = {
        SortArrow: ArrowDownward,
        FirstPage,
        LastPage,
        NextPage: ChevronRight,
        PreviousPage: ChevronLeft
      };
      const result = wrapper.instance().getIcons();
      expect(result).toStrictEqual(expected);
    });
  });
});
