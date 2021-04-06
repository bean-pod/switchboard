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
  // update
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("has the correct components", () => {
    it("contains one Box component", () => {
      expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("contains one TableContainer component", () => {
      expect(wrapper.find(TableContainer)).toHaveLength(1);
    });
    describe("contains MaterialTable component", () => {
      it("that has length of 1 with expected prop values", () => {
        expect(wrapper.find(MaterialTable)).toHaveLength(1);
        const tableProps = wrapper.find(MaterialTable).props();
        expect(tableProps.title).toBe(wrapper.instance().props.title);
        expect(tableProps.columns).toBe(wrapper.instance().props.columns);
        expect(tableProps.data).toBe(wrapper.instance().props.logs);
        expect(tableProps.options).toEqual(wrapper.instance().getOptions());
        expect(tableProps.icons).toEqual(wrapper.instance().getIcons());
      });
    });
    it("contains one Time zone indicator text box", () => {
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
    it("should return the expected options to be used in the MaterialTable component", () => {
      const expected = {
        toolbar: true,
        showTitle: false,
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
    it("should return the expected icons to be used in the MaterialTable component", () => {
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
