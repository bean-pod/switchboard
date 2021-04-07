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
  Search,
  ArrowDownward,
  Clear,
  SaveAlt,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";
import MaterialTable from "material-table";
import LogsTable from "../LogsTable";

Enzyme.configure({ adapter: new Adapter() });
jest.spyOn(global.console, "error");

describe("<LogsTable/> component", () => {
  let wrapper;
  const dummyLogs = [];
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
      <LogsTable logs={dummyLogs} columns={dummyColumns} />
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
        title: wrapperProps.title,
        columns: wrapperProps.columns,
        data: wrapperProps.logs,
        options: shallowWrapper.getOptions(),
        icons: shallowWrapper.getIcons()
      };

      const tableProps = wrapper.find(MaterialTable).props();
      expect(tableProps.title).toBe(expected.title);
      expect(tableProps.columns).toBe(expected.columns);
      expect(tableProps.data).toBe(expected.data);
      expect(tableProps.options).toEqual(expected.options);
      expect(tableProps.icons).toEqual(expected.icons);
    });
    it("contains 1 Time zone indicator text box", () => {
      expect(
        wrapper
          .text()
          .includes(
            "Time Zone: ".concat(
              Intl.DateTimeFormat().resolvedOptions().timeZone
            )
          )
      ).toBe(true);
    });
  });

  describe("getOptions() function", () => {
    it("should return the expected options to be used in the <MaterialTable/> component", () => {
      const expected = {
        toolbar: true,
        showTitle: true,
        search: true,
        exportButton: true,
        headerStyle: {
          backgroundColor: "#f1f1f1",
          fontWeight: "bold"
        },
        filtering: false,
        draggable: false,
        maxBodyHeight: "auto",
        minBodyHeight: "auto"
      };
      const result = wrapper.instance().getOptions();
      expect(result).toStrictEqual(expected);
    });
  });

  describe("getIcons() function", () => {
    it("should return the expected icons to be used in the <MaterialTable/> component", () => {
      const expected = {
        Search,
        ResetSearch: Clear,
        SortArrow: ArrowDownward,
        Export: SaveAlt,
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
