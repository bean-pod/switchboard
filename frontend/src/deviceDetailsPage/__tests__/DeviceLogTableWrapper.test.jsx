import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";

import DeviceLogTableWrapper from "../DeviceLogTableWrapper";
import LogInfo from "../../model/LogInfo";
import LogsTable from "../../loglist/LogsTable";
import DeviceInfo from "../../model/DeviceInfo";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/LogApi");

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

describe("<DeviceLogTableWrapper/> Class Component", () => {
  let wrapper;
  const dummyDevice = new DeviceInfo(
    "serial",
    "lastCommunication",
    "publicIpAddress",
    "privateIpAddress",
    "displayName",
    "status",
    "channels",
    "deviceType",
    "extras"
  );
  const dummyLog = [new LogInfo(5)];
  const dummySource = {
    getDeviceLogs: jest.fn()
  };

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("handleLogsChange()", () => {
    beforeEach(() => {
      dummySource.getDeviceLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(
        <DeviceLogTableWrapper dataSource={dummySource} device={dummyDevice} />
      );
    });
    it("should set the state", () => {
      const startingState = {
        logs: []
      };
      const expectedValue = [new LogInfo(1, null, "Info", "Log 1 info")];

      wrapper.setState(startingState);

      wrapper.instance().handleDeviceLogsChange(expectedValue);
      expect(wrapper.state().logs).toStrictEqual(expectedValue);
    });
  });

  describe("componentDidMount() function", () => {
    describe("calls the passed dataSource's getDeviceLogs() with device serial number", () => {
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <DeviceLogTableWrapper
            dataSource={dummySource}
            device={dummyDevice}
          />,
          {
            disableLifecycleMethods: true
          }
        );
      });
      it("if it resolves, it passes the resolved logs to handleStreamsLogChange()", async () => {
        dummySource.getDeviceLogs.mockResolvedValue(dummyLog);

        const handleDeviceLogsSpy = jest.spyOn(
          wrapper.instance(),
          "handleDeviceLogsChange"
        );

        wrapper.instance().componentDidMount();
        expect(dummySource.getDeviceLogs).toHaveBeenCalledWith(
          dummyDevice.serialNumber
        );

        await new Promise(setImmediate);

        expect(handleDeviceLogsSpy).toHaveBeenCalledWith(dummyLog);
      });
      it("if it rejects, an error snackbar with the caught error message is displayed", async () => {
        const returnedError = {
          message: "test"
        };
        dummySource.getDeviceLogs.mockRejectedValue(returnedError);

        wrapper.instance().componentDidMount();

        await new Promise(setImmediate);

        expect(snackbarSpy).toHaveBeenCalledWith(
          "error",
          `Failed to fetch device logs: ${returnedError.message}`
        );
      });
    });
  });

  describe("render() function", () => {
    beforeEach(() => {
      dummySource.getDeviceLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(
        <DeviceLogTableWrapper dataSource={dummySource} device={dummyDevice} />
      );
    });
    describe("returns a component that", () => {
      it("Contains 1 <LogsTable/> component with expected components", () => {
        const logsTable = wrapper.find(LogsTable);
        expect(logsTable).toHaveLength(1);

        const wrapperState = wrapper.state();
        const shallowWrapper = wrapper.instance();
        const expected = {
          logs: wrapperState.logs,
          columns: shallowWrapper.getColumnInfo()
        };

        const logsTableProps = logsTable.props();
        expect(logsTableProps.logs).toBe(expected.logs);
        expect(logsTableProps.columns).toEqual(expected.columns);
      });
    });
  });

  describe("getColumnInfo()", () => {
    beforeEach(() => {
      dummySource.getDeviceLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(
        <DeviceLogTableWrapper dataSource={dummySource} device={dummyDevice} />
      );
    });
    it("should return the expected column to be passed to <LogsTable/> component", () => {
      const expectedValue = [
        {
          title: "ID",
          field: "id",
          cellStyle: { width: "10%" }
        },
        {
          title: "Date",
          field: "dateTime",
          cellStyle: { width: "15%" }
        },
        {
          title: "Level",
          field: "level",
          cellStyle: { width: "10%" }
        },
        {
          title: "Message",
          field: "message",
          sorting: false
        }
      ];
      const result = wrapper.instance().getColumnInfo();
      expect(result).toStrictEqual(expectedValue);
    });
  });
});
