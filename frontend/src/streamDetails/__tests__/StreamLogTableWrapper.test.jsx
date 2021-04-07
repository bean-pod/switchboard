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

import StreamLogTableWrapper from "../StreamLogTableWrapper";
import StreamLogInfo from "../../model/StreamLogInfo";
import LogsTable from "../../loglist/LogsTable";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/LogApi");

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

describe("<StreamLogsTableWrapper/> Class Component", () => {
  let wrapper;
  const dummyId = 1;
  const dummyLog = [
    new StreamLogInfo(
      "2020-10-31T15:53:23",
      "Info",
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
      <StreamLogTableWrapper dataSource={dummySource} streamId={dummyId} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("handleLogsChange()", () => {
    it("should set the state log", () => {
      const initialValue = [];

      wrapper.setState({
        logs: initialValue
      });

      const expectedValue = [
        new StreamLogInfo(null, "Info", "Test info")
      ];

      wrapper.instance().handleStreamLogsChange(expectedValue);
      expect(wrapper.state().logs).toStrictEqual(expectedValue);
    });
  });

  describe("componentDidMount() function", () => {
    describe("calls the passed dataSource's getStreamLogs() with stream ID", () => {
      let wrapperDidMount;
      const mockGetStreamLogs = jest.fn();
      const mockLogApi = {
        getStreamLogs: mockGetStreamLogs
      };
      beforeEach(() => {
        wrapperDidMount = Enzyme.shallow(
          <StreamLogTableWrapper dataSource={mockLogApi} streamId={dummyId} />,
          {
            disableLifecycleMethods: true
          }
        );
      });
      afterEach(() => {
        wrapperDidMount.unmount();
        jest.clearAllMocks();
      });
      it("if it resolves, it passes the resolved logs to handleStreamsLogChange()", async () => {
        mockLogApi.getStreamLogs.mockResolvedValue(dummyLog);

        const handleStreamsSpy = jest.spyOn(
          wrapperDidMount.instance(),
          "handleStreamLogsChange"
        );

        wrapperDidMount.instance().componentDidMount();
        expect(mockLogApi.getStreamLogs).toHaveBeenCalledWith(dummyId);

        await new Promise(setImmediate);

        expect(handleStreamsSpy).toHaveBeenCalledWith(dummyLog);
      });
      it("if it rejects, an error snackbar with the caught error message is displayed", async () => {
        const returnedError = {
          message: "test"
        };
        mockLogApi.getStreamLogs.mockRejectedValue(returnedError);

        wrapperDidMount.instance().componentDidMount();

        await new Promise(setImmediate);

        expect(snackbarSpy).toHaveBeenCalledWith(
          "error",
          `Failed to fetch stream logs: ${returnedError.message}`
        );
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
