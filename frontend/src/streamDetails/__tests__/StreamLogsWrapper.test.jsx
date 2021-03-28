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

import StreamLogsWrapper from "../StreamLogsWrapper";
import LogInfo from "../../model/LogInfo";
import LogsTable from "../../loglist/LogsTable";

import * as LogApi from "../../api/LogApi";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/LogApi");

describe("<StreamLogsWrapper/> Class Component", () => {
  let wrapper;
  const dummyId = 1;
  const expectedLogs = [new LogInfo(5)];

  beforeEach(async () => {
    LogApi.getStreamLogs.mockResolvedValue(expectedLogs);
    wrapper = Enzyme.shallow(<StreamLogsWrapper streamId={dummyId} />);

    expect(LogApi.getStreamLogs).toBeCalledWith(dummyId);
    await new Promise(setImmediate);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  describe("handleLogsChange()", () => {
    it("should set the state", () => {
      const expectedValue = [new LogInfo(1, null, "Info", "Log 1 info")];

      wrapper.instance().handleStreamLogsChange(expectedValue);
      expect(wrapper.state().logs).toStrictEqual(expectedValue);
    });
  });

  describe("componentDidMount() function", () => {
    describe("calls LogApi getStreamLogs() with the expected arguments", () => {
      it("then sets the state to resolved value", () => {
        expect(wrapper.state().logs).toEqual(expectedLogs);
      });
    });
  });

  describe("render() function", () => {
    describe("returns a component that", () => {
      it("Contains 1 <LogsTable/> component with expected props", () => {
        expect(wrapper.find(LogsTable)).toHaveLength(1);
        const props = wrapper.find(LogsTable).props();
        expect(props.title).toEqual(`${dummyId} Logs`);
        expect(props.logs).toBe(wrapper.state().logs);
      });
    });
  });
});
