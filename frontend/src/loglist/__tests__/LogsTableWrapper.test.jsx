import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import LogTableWrapper from "../LogTableWrapper";
import LogTable from "../LogTable";
import LogInfo from "../../model/LogInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<LogTableWrapper/> Class Component", () => {
  let wrapper;
  const dummyValue = [new LogInfo(1, null, "Info", "Log 1 info")];
  const dummySource = {
    getAllLogs() {
      return new Promise((resolve) => resolve(dummyValue));
    }
  };
  describe("render() function", () => {
    wrapper = Enzyme.shallow(<LogTableWrapper logsDataSource={dummySource} />);
    describe("returns a component that", () => {
      it("Contains 1 <LogTable/> component", () => {
        expect(wrapper.find(LogTable)).toHaveLength(1);
      });
    });
  });

  describe("handleLogsChange()", () => {
    wrapper = Enzyme.shallow(<LogTableWrapper logsDataSource={dummySource} />);
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
});
