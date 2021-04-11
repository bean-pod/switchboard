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
import MaterialTable, { MTableToolbar } from "material-table";
import DeviceTable from "../DeviceTable";
import ChannelDetailsTable from "../ChannelDetailsTable/ChannelDetailsTable";
import StatusIndicator from "../../general/StatusIndicator";
import DeviceDetailsButton from "../DeviceDetailsButton";
import * as SampleData from "../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });
jest.spyOn(global.console, "error");

describe("<DeviceTable/> class component", () => {
  let wrapper;
  let wrapperInstance;
  const dummyTitle = "test";
  const dummyDevices = [];

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <DeviceTable title={dummyTitle} devices={dummyDevices} />
    );
    wrapperInstance = wrapper.instance();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("render() function", () => {
    describe("returns a component that", () => {
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
          components: shallowWrapper.components,
          columns: shallowWrapper.columns,
          data: dummyDevices,
          detailPanel: shallowWrapper.detailPanel,
          options: shallowWrapper.options,
          icons: shallowWrapper.icons
        };

        const tableProps = wrapper.find(MaterialTable).props();
        expect(tableProps).toStrictEqual(expected);
      });
    });
  });

  describe("components variable", () => {
    it(`should have a render() function that returns a <MTableToolbar/> component`, () => {
      const wrapperProps = wrapper.props();
      /*  eslint-disable react/jsx-props-no-spreading */
      const expectedRenderedComponent = (
        <div className="lightestGrey">
          <MTableToolbar {...wrapperProps} />
        </div>
      );

      expect(wrapperInstance.components.Toolbar(wrapperProps)).toStrictEqual(
        expectedRenderedComponent
      );
    });
  });

  describe("columns variable", () => {
    it(`should have a render() function that returns a <StatusIndicator/> component in Status column`, () => {
      const dummyData = {
        status: "Online"
      };

      const expectedRenderedComponent = (
        <StatusIndicator status={dummyData.status} />
      );

      expect(wrapperInstance.columns[2].render(dummyData)).toStrictEqual(
        expectedRenderedComponent
      );
    });
    it(`should have a render() function that returns a <DeviceDetailsButton/> component in Actions column`, () => {
      const sampleDevice = SampleData.getSampleSender();

      const expectedRenderedComponent = (
        <DeviceDetailsButton deviceInfo={sampleDevice} />
      );

      expect(wrapperInstance.columns[5].render(sampleDevice)).toStrictEqual(
        expectedRenderedComponent
      );
    });
  });

  describe("detailPanel variable", () => {
    it(`should have a render() function that returns <Typography/> and <ChannelDetailsTable/> components`, () => {
      const sampleDevice = SampleData.getSampleSender();

      const expectedRenderedComponent = (
        <div className="lightestGrey" style={{ padding: "1.5em" }}>
          <Typography variant="h6">Channels</Typography>
          <ChannelDetailsTable channels={sampleDevice.channels} />
        </div>
      );

      expect(wrapperInstance.detailPanel[0].render(sampleDevice)).toStrictEqual(
        expectedRenderedComponent
      );
    });
  });
});
