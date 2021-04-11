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

  describe("componentDidMount() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <DeviceLogTableWrapper dataSource={dummySource} device={dummyDevice} />,
        {
          disableLifecycleMethods: true
        }
      );
    });
    it("Calls the passed data source's getDeviceLogs with the serial number", async () => {
      dummySource.getDeviceLogs.mockResolvedValue(dummyLog);

      wrapper.instance().componentDidMount();

      expect(dummySource.getDeviceLogs).toHaveBeenCalledWith(
        dummyDevice.serialNumber
      );
    });
    it("if it resolves, it passes the resolved logs to handleStreamsLogChange()", async () => {
      dummySource.getDeviceLogs.mockResolvedValue(dummyLog);

      const handleDeviceLogsSpy = jest.spyOn(
        wrapper.instance(),
        "handleDeviceLogsChange"
      );

      wrapper.instance().componentDidMount();

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

  describe("<DeviceLogTableWrapper/> class functions", () => {
    beforeEach(() => {
      dummySource.getDeviceLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(
        <DeviceLogTableWrapper dataSource={dummySource} device={dummyDevice} />
      );
    });

    describe("handleLogsChange()", () => {
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

    describe("render() function", () => {
      beforeEach(() => {
        dummySource.getDeviceLogs.mockResolvedValue(dummyLog);
        wrapper = Enzyme.shallow(
          <DeviceLogTableWrapper
            dataSource={dummySource}
            device={dummyDevice}
          />
        );
      });
      describe("returns a component that", () => {
        it("Contains 1 <LogsTable/> component with expected props", () => {
          const logsTable = wrapper.find(LogsTable);
          expect(logsTable).toHaveLength(1);

          const wrapperState = wrapper.state();
          const shallowWrapper = wrapper.instance();
          const expected = {
            logs: wrapperState.logs,
            columns: shallowWrapper.columns
          };

          const logsTableProps = logsTable.props();
          expect(logsTableProps).toStrictEqual(expected);
        });
      });
    });
  });
});
