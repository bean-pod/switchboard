import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import LogsTableWrapper from "../LogsTableWrapper";
import LogsTable from "../LogsTable";
import LogInfo from "../../model/LogInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<LogsTableWrapper/> Class Component", () => {
  let wrapper;
  const dummyValue = [new LogInfo(1, null, "Info", "Log 1 info")];
  const dummySource = {
    getAllLogs() {
      return new Promise((resolve) => resolve(dummyValue));
    }
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(<LogsTableWrapper logsDataSource={dummySource} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("render() function", () => {
    describe("returns a component that", () => {
      it("Contains 1 <LogsTable/> component with expected props", () => {
        const logsTable = wrapper.find(LogsTable);
        expect(logsTable).toHaveLength(1);

        const logsTableProps = logsTable.props();
        const expected = wrapper.instance().getColumnInfo();
        expect(logsTableProps.columns).toEqual(expected);
      });
    });
  });

  describe("handleLogsChange()", () => {
    it("should set the state", () => {
      const startingState = {
        logs: dummyValue
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
