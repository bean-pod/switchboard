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
import { Box, TableContainer, Typography } from "@material-ui/core";
import {
  FilterList,
  Search,
  ExpandLess,
  ExpandMore,
  ArrowDownward,
  Clear,
  SaveAlt,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";
import MaterialTable, { MTableToolbar } from "material-table";
import DevicesTable from "../DevicesTable";
import ChannelDetailsTable from "../ChannelDetailsTable";
import StatusIndicator from "../../general/StatusIndicator";
import DeviceDetailsButton from "../DeviceDetailsButton";
import * as SampleData from "../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });
jest.spyOn(global.console, "error");

describe("<DevicesTable/> component", () => {
  let wrapper;
  const dummyTitle = "test";
  const dummyDevices = [];

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <DevicesTable title={dummyTitle} devices={dummyDevices} />
    );
  });

  afterEach(() => {
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

      const shallowWrapper = wrapper.instance();
      const expected = {
        title: dummyTitle,
        components: shallowWrapper.getComponents(),
        columns: shallowWrapper.getColumnInfo(),
        data: dummyDevices,
        detailPanel: shallowWrapper.getDetailPanel(),
        options: shallowWrapper.getOptions(),
        icons: shallowWrapper.getIcons()
      };

      const tableProps = wrapper.find(MaterialTable).props();
      expect(tableProps.title).toEqual(expected.title);
      expect(tableProps.components).toEqual(expected.components);
      expect(tableProps.columns).toEqual(expected.columns);
      expect(tableProps.data).toBe(expected.data);
      expect(tableProps.detailPanel).toEqual(expected.detailPanel);
      expect(tableProps.options).toEqual(expected.options);
      expect(tableProps.icons).toEqual(expected.icons);
    });
  });

  describe("getComponents() function", () => {
    it(`should have a render() function that returns a <MTableToolbar/> component`, () => {
      const result = wrapper.instance().getComponents();
      const props = wrapper.props();

      /*  eslint-disable react/jsx-props-no-spreading */
      const expectedRenderFunction = function Components(passedProps) {
        return (
          <div className="lightestGrey">
            <MTableToolbar {...passedProps} />
          </div>
        );
      };

      const expectedRenderResult = expectedRenderFunction(props);
      expect(result.Toolbar(props)).toMatchObject(expectedRenderResult);
    });
  });

  describe("getColumnInfo() function", () => {
    let result;

    beforeEach(() => {
      result = wrapper.instance().getColumnInfo();
    });

    it("should return the expected column info to be used in the <MaterialTable/> component", () => {
      const expected = [
        {
          title: "Name",
          field: "name"
        },
        {
          title: "Serial Number",
          field: "serialNumber"
        },
        {
          title: "Status",
          field: "status",
          lookup: {
            Online: "Online",
            Pending: "Pending",
            Error: "Error",
            Offline: "Offline"
          }
        },
        {
          title: "Private IP Address",
          field: "privateIp"
        },
        {
          title: "Public IP Address",
          field: "publicIp"
        },
        {
          title: "Actions",
          field: "action",
          filtering: false,
          sorting: false,
          align: "center",
          export: false
        }
      ];
      expect(result).toMatchObject(expected);
    });
    it(`should have a render() function that returns a <StatusIndicator/> component in Status column`, () => {
      const dummyData = {
        status: "Online"
      };

      const expectedRenderFunction = function Status(rowData) {
        return <StatusIndicator status={rowData.status} />;
      };

      const expectedRenderResult = expectedRenderFunction(dummyData);
      expect(result[2].render(dummyData)).toMatchObject(expectedRenderResult);
    });
    it(`should have a render() function that returns a <DeviceDetailsButton/> component in Actions column`, () => {
      const sampleDevice = SampleData.getSampleSender();

      const expectedRenderFunction = function Actions(rowData) {
        return <DeviceDetailsButton deviceInfo={rowData} />;
      };

      const expectedRenderResult = expectedRenderFunction(sampleDevice);
      expect(result[5].render(sampleDevice)).toMatchObject(
        expectedRenderResult
      );
    });
  });

  describe("getDetailPanel() function", () => {
    let result;

    beforeEach(() => {
      result = wrapper.instance().getDetailPanel();
    });

    it("should return the expected detail panel to be used in the <MaterialTable/> component", () => {
      const expected = [
        {
          icon: ExpandMore,
          openIcon: ExpandLess,
          tooltip: "Show Channels"
        }
      ];
      expect(result).toMatchObject(expected);
    });
    it(`should have a render() function that returns <Typography/> and <ChannelDetailsTable/> components`, () => {
      const sampleDevice = SampleData.getSampleSender();

      const expectedRenderFunction = function DetailPanel(rowData) {
        return (
          <div className="lightestGrey" style={{ padding: "1.5em" }}>
            <Typography variant="h6">Channels</Typography>
            <ChannelDetailsTable channels={rowData.channels} />
          </div>
        );
      };

      const expectedRenderResult = expectedRenderFunction(sampleDevice);
      expect(result[0].render(sampleDevice)).toMatchObject(
        expectedRenderResult
      );
    });
  });

  describe("getOptions() function", () => {
    it("should return the expected options to be used in the <MaterialTable/> component", () => {
      const expected = {
        toolbar: true,
        search: true,
        exportButton: true,
        headerStyle: {
          backgroundColor: "#f1f1f1",
          fontWeight: "bold"
        },
        filtering: true,
        draggable: false
      };
      const result = wrapper.instance().getOptions();
      expect(result).toStrictEqual(expected);
    });
  });

  describe("getIcons() function", () => {
    it("should return the expected icons to be used in the <MaterialTable/> component", () => {
      const expected = {
        Filter: FilterList,
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
