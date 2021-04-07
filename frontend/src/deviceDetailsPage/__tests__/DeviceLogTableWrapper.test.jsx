import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it, jest } from "@jest/globals";

import DeviceLogTableWrapper from "../DeviceLogTableWrapper";
import LogInfo from "../../model/LogInfo";
import LogsTable from "../../loglist/LogsTable";
import DeviceInfo from "../../model/DeviceInfo";

import * as LogApi from "../../api/LogApi";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/LogApi");

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
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("handleLogsChange()", () => {
    const expectedLogs = [new LogInfo(5)];

    LogApi.getDeviceLogs.mockReturnValue(Promise.resolve(expectedLogs));
    wrapper = Enzyme.shallow(<DeviceLogTableWrapper device={dummyDevice} />);
    it("should set the state", () => {
      const startingState = {
        logs: []
      };
      const expectedValue = [new LogInfo(1, null, "Info", "Log 1 info")];

      wrapper.setState(startingState);

      wrapper.instance().handleLogsChange(expectedValue);
      expect(wrapper.state().logs).toStrictEqual(expectedValue);
    });
  });

  describe("componentDidMount() function", () => {
    describe("calls LogApi getDeviceLogs() with the expected arguments", () => {
      it("that resolves, then sets the state to resolved value", async () => {
        const expectedLogs = [new LogInfo(5)];

        LogApi.getDeviceLogs.mockReturnValue(Promise.resolve(expectedLogs));

        wrapper = Enzyme.shallow(
          <DeviceLogTableWrapper device={dummyDevice} />
        );

        expect(LogApi.getDeviceLogs).toBeCalledWith(dummyDevice.serialNumber);
        wrapper.instance().componentDidMount();
        await new Promise(setImmediate);

        expect(wrapper.state().logs).toStrictEqual(expectedLogs);
      });

      it("that rejects and does nothing", () => {
        LogApi.getDeviceLogs.mockReturnValue(Promise.reject());

        wrapper = Enzyme.shallow(
          <DeviceLogTableWrapper device={dummyDevice} />
        );

        wrapper.setState({ logs: "dummyValue" });
        wrapper.instance().componentDidMount();
        expect(LogApi.getDeviceLogs).toBeCalledWith(dummyDevice.serialNumber);
        expect(wrapper.state().logs).toBe("dummyValue");
      });
    });
  });

  describe("render() function", () => {
    const resolveLogs = [new LogInfo(5)];

    LogApi.getDeviceLogs.mockReturnValue(Promise.resolve(resolveLogs));
    wrapper = Enzyme.shallow(<DeviceLogTableWrapper device={dummyDevice} />);
    describe("returns a component that", () => {
      it("Contains 1 <LogsTable/> component with expected components", () => {
        expect(wrapper.find(LogsTable)).toHaveLength(1);

        const expectedLogs = [new LogInfo(1, null, "Info", "Log 1 info")];
        wrapper.setState({ logs: expectedLogs });

        const props = wrapper.find(LogsTable).first().props();
        expect(props.logs).toBe(expectedLogs);
      });
    });
  });

  describe("getColumnInfo()", () => {
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
