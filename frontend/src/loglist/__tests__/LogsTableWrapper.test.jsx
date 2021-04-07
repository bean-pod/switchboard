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
    getAllLogs() {
      return new Promise((resolve) => resolve(dummyLog));
    }
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(<LogsTableWrapper logsDataSource={dummySource} />);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
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
      let wrapperDidMount;
      const mockGetAllLogs = jest.fn();
      const mockLogApi = {
        getAllLogs: mockGetAllLogs
      };

      beforeEach(() => {
        wrapperDidMount = Enzyme.shallow(
          <LogsTableWrapper logsDataSource={mockLogApi} />,
          {
            disableLifecycleMethods: true
          }
        );
      });

      afterEach(() => {
        wrapperDidMount.unmount();
        jest.clearAllMocks();
      });

      it("passes the resolved logs to handleLogChange()", async () => {
        mockLogApi.getAllLogs.mockResolvedValue(dummyLog);

        const handleLogsSpy = jest.spyOn(
          wrapperDidMount.instance(),
          "handleLogsChange"
        );

        wrapperDidMount.instance().componentDidMount();
        expect(mockLogApi.getAllLogs).toHaveBeenCalledTimes(1);

        await new Promise(setImmediate);

        expect(handleLogsSpy).toHaveBeenCalledWith(dummyLog);
      });
      it("if it rejects, an error snackbar with the caught error message is displayed", async () => {
        const returnedError = {
          message: "test"
        };
        mockLogApi.getAllLogs.mockRejectedValue(returnedError);

        wrapperDidMount.instance().componentDidMount();

        await new Promise(setImmediate);

        expect(snackbarSpy).toHaveBeenCalledWith(
          "error",
          `Failed to fetch logs: ${returnedError.message}`
        );
      });
    });
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
