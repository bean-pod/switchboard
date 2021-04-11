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
import LogTableWrapper from "../LogTableWrapper";
import LogTable from "../LogTable";
import LogInfo from "../../model/LogInfo";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

describe("<LogTableWrapper/> Class Component", () => {
  let wrapper;
  const dummyLog = [new LogInfo(1, null, "Info", "Log 1 info")];
  const dummySource = {
    getAllLogs: jest.fn()
  };

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("componentDidMount() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <LogTableWrapper logsDataSource={dummySource} />,
        {
          disableLifecycleMethods: true
        }
      );
    });

    it("calls the passed dataSource's getAllLogs()", () => {
      dummySource.getAllLogs.mockResolvedValue(dummyLog);

      wrapper.instance().componentDidMount();

      expect(dummySource.getAllLogs).toHaveBeenCalledTimes(1);
    });
    it("passes the resolved logs to handleLogChange()", async () => {
      dummySource.getAllLogs.mockResolvedValue(dummyLog);

      const handleLogsSpy = jest.spyOn(wrapper.instance(), "handleLogsChange");

      wrapper.instance().componentDidMount();

      await new Promise(setImmediate);

      expect(handleLogsSpy).toHaveBeenCalledWith(dummyLog);
    });
    it("if it rejects, an error snackbar with the caught error message is displayed", async () => {
      const returnedError = {
        message: "test"
      };
      dummySource.getAllLogs.mockRejectedValue(returnedError);

      wrapper.instance().componentDidMount();

      await new Promise(setImmediate);

      expect(snackbarSpy).toHaveBeenCalledWith(
        "error",
        `Failed to fetch logs: ${returnedError.message}`
      );
    });
  });

  describe("<LogTableWrapper/> class functions", () => {
    beforeEach(() => {
      dummySource.getAllLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(
        <LogTableWrapper logsDataSource={dummySource} />
      );
    });

    describe("handleLogsChange()", () => {
      it("should set the state", () => {
        const startingState = {
          logs: dummyLog
        };
        const expectedValue = [new LogInfo(1, null, "Info", "Log 1 info")];
        const expectedState = {
          logs: expectedValue
        };

        expect(wrapper.state()).toStrictEqual(startingState);
        wrapper.instance().handleLogsChange(expectedValue);
        expect(wrapper.state()).toStrictEqual(expectedState);
      });
    });

    describe("render() function", () => {
      describe("returns a component that", () => {
        it("Contains 1 <LogTable/> component with expected props", () => {
          const logTable = wrapper.find(LogTable);
          expect(logTable).toHaveLength(1);

          const wrapperState = wrapper.state();
          const shallowWrapper = wrapper.instance();
          const expected = {
            logs: wrapperState.logs,
            columns: shallowWrapper.columns
          };

          const logTableProps = logTable.props();
          expect(logTableProps).toStrictEqual(expected);
        });
      });
    });
  });
});
