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
    new StreamLogInfo("2020-10-31T15:53:23", "Info", "Log 1 info")
  ];
  const dummySource = {
    getStreamLogs: jest.fn()
  };

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
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

  describe("<StreamLogTableWrapper/> class functions", () => {
    beforeEach(() => {
      dummySource.getStreamLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(
        <StreamLogTableWrapper dataSource={dummySource} streamId={dummyId} />
      );
    });

    describe("handleLogsChange()", () => {
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

    describe("render() function", () => {
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
