import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest
} from "@jest/globals";

import StreamLogsTableWrapper from "../StreamLogsTableWrapper";
import StreamLogInfo from "../../model/StreamLogInfo";
import LogsTable from "../../loglist/LogsTable";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/LogApi");

describe("<StreamLogsTableWrapper/> Class Component", () => {
  let wrapper;
  const dummyId = 1;
  const dummyLog = [
    new StreamLogInfo(
      "2020-10-31T15:53:23",
      "Info",
      "1:10:111:999",
      "1:22:333:989",
      "Log 1 info"
    )
  ];
  const dummySource = {
    getStreamLogs() {
      return new Promise((resolve) => resolve(dummyLog));
    }
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <StreamLogsTableWrapper dataSource={dummySource} streamId={dummyId} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("handleLogsChange()", () => {
    it("should set the state", () => {
      const expectedValue = [
        new StreamLogInfo(null, "Info", null, null, "Test info")
      ];

      wrapper.instance().handleStreamLogsChange(expectedValue);
      expect(wrapper.state().logs).toStrictEqual(expectedValue);
    });
  });

  describe("componentDidMount() function", () => {
    describe("calls LogApi getStreamLogs() with the expected arguments", () => {
      it("then sets the state to resolved value", () => {
        expect(wrapper.state().logs).toEqual(dummyLog);
      });
    });
  });

  describe("getColumnInfo()", () => {
    it("should return the expected column to be passed to <LogsTable/> component", () => {
      const expectedValue = [
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
          title: "Sender",
          field: "encoderSerial",
          cellStyle: { width: "10%" }
        },
        {
          title: "Receiver",
          field: "decoderSerial",
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

  describe("render() function", () => {
    describe("returns a component that", () => {
      it("Contains 1 <LogsTable/> component with expected props", () => {
        const logsTable = wrapper.find(LogsTable);
        expect(logsTable).toHaveLength(1);

        const wrapperState = wrapper.state();
        const shallowWrapper = wrapper.instance();
        const expected = {
          title: `${dummyId} Logs`,
          logs: wrapperState.logs,
          columns: shallowWrapper.getColumnInfo()
        };

        const logsTableProps = logsTable.props();
        expect(logsTableProps.title).toEqual(expected.title);
        expect(logsTableProps.logs).toBe(expected.logs);
        expect(logsTableProps.columns).toEqual(expected.columns);
      });
    });
  });
});
