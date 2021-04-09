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
import LogTable from "../../loglist/LogTable";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/LogApi");

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

describe("<StreamLogTableWrapper/> Class Component", () => {
  let wrapper;
  const dummyId = 1;
  const dummyLog = [
    new StreamLogInfo("2020-10-31T15:53:23", "Info", "Log 1 info")
  ];
  const dummySource = {
    getStreamLogs: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("handleLogsChange()", () => {
    beforeEach(() => {
      dummySource.getStreamLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(
        <StreamLogTableWrapper dataSource={dummySource} streamId={dummyId} />
      );
    });
    it("should set the state log", () => {
      const initialValue = [];

      wrapper.setState({
        logs: initialValue
      });

      const expectedValue = [new StreamLogInfo(null, "Info", "Test info")];

      wrapper.instance().handleStreamLogsChange(expectedValue);
      expect(wrapper.state().logs).toStrictEqual(expectedValue);
    });
  });

  describe("componentDidMount() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamLogTableWrapper dataSource={dummySource} streamId={dummyId} />,
        {
          disableLifecycleMethods: true
        }
      );
    });
    it("Calls the data source's getStreamLogs with the stream ID", async () => {
      dummySource.getStreamLogs.mockResolvedValue(dummyLog);

      wrapper.instance().componentDidMount();

      expect(dummySource.getStreamLogs).toHaveBeenCalledWith(dummyId);
    });
    it("if it resolves, it passes the resolved logs to handleStreamsLogChange()", async () => {
      dummySource.getStreamLogs.mockResolvedValue(dummyLog);

      const handleStreamsSpy = jest.spyOn(
        wrapper.instance(),
        "handleStreamLogsChange"
      );

      wrapper.instance().componentDidMount();

      await new Promise(setImmediate);

      expect(handleStreamsSpy).toHaveBeenCalledWith(dummyLog);
    });
    it("if it rejects, an error snackbar with the caught error message is displayed", async () => {
      const returnedError = {
        message: "test"
      };
      dummySource.getStreamLogs.mockRejectedValue(returnedError);

      wrapper.instance().componentDidMount();

      await new Promise(setImmediate);

      expect(snackbarSpy).toHaveBeenCalledWith(
        "error",
        `Failed to fetch stream logs: ${returnedError.message}`
      );
    });
  });

  describe("getColumnInfo()", () => {
    beforeEach(() => {
      dummySource.getStreamLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(
        <StreamLogTableWrapper dataSource={dummySource} streamId={dummyId} />
      );
    });
    it("should return the expected column to be passed to <LogTable/> component", () => {
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
    beforeEach(() => {
      dummySource.getStreamLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(
        <StreamLogTableWrapper dataSource={dummySource} streamId={dummyId} />
      );
    });
    describe("returns a component that", () => {
      it("Contains 1 <LogTable/> component with expected props", () => {
        const logTable = wrapper.find(LogTable);
        expect(logTable).toHaveLength(1);

        const wrapperState = wrapper.state();
        const shallowWrapper = wrapper.instance();
        const expected = {
          logs: wrapperState.logs,
          columns: shallowWrapper.getColumnInfo()
        };

        const logTableProps = logTable.props();
        expect(logTableProps.logs).toBe(expected.logs);
        expect(logTableProps.columns).toEqual(expected.columns);
      });
    });
  });
});
