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
import LogsTableWrapper from "../LogsTableWrapper";
import LogsTable from "../LogsTable";
import LogInfo from "../../model/LogInfo";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

describe("<LogsTableWrapper/> Class Component", () => {
  let wrapper;
  const dummyLog = [new LogInfo(1, null, "Info", "Log 1 info")];
  const dummySource = {
    getAllLogs: jest.fn()
  };

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("render() function", () => {
    beforeEach(() => {
      dummySource.getAllLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(<LogsTableWrapper logsDataSource={dummySource} />);
    });
    describe("returns a component that", () => {
      it("Contains 1 <LogsTable/> component with expected props", () => {
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

  describe("componentDidMount() function", () => {
    describe("calls the passed dataSource's getAllLogs()", () => {
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <LogsTableWrapper logsDataSource={dummySource} />,
          {
            disableLifecycleMethods: true
          }
        );
      });

      it("passes the resolved logs to handleLogChange()", async () => {
        dummySource.getAllLogs.mockResolvedValue(dummyLog);

        const handleLogsSpy = jest.spyOn(
          wrapper.instance(),
          "handleLogsChange"
        );

        wrapper.instance().componentDidMount();
        expect(dummySource.getAllLogs).toHaveBeenCalledTimes(1);

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
  });

  describe("handleLogsChange()", () => {
    beforeEach(() => {
      dummySource.getAllLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(<LogsTableWrapper logsDataSource={dummySource} />);
    });
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

  describe("getColumnInfo()", () => {
    beforeEach(() => {
      dummySource.getAllLogs.mockResolvedValue(dummyLog);
      wrapper = Enzyme.shallow(<LogsTableWrapper logsDataSource={dummySource} />);
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
