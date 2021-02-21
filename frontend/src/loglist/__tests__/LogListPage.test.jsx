import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, jest, it } from "@jest/globals";
import { Container, Box } from "@material-ui/core";

import LogListPage from "../LogListPage";
import DynamicBreadcrumb from "../../general/DynamicBreadcrumb";
import * as LogApi from "../../api/LogApi";

Enzyme.configure({ adapter: new Adapter() });

jest.spyOn(global.console, "error");
jest.mock("../../api/LogApi");
jest.spyOn(LogApi, "getAllLogs");

const mockLogs = [
  {
    id: 1,
    dateTime: "2020-10-31T15:53:23",
    level: "info",
    message: "Log test 1"
  },
  {
    id: 2,
    dateTime: "2020-11-13T12:36:30",
    level: "info",
    message: "Log test 2"
  }
];

beforeEach(() => {
  LogApi.getAllLogs.mockResolvedValue(mockLogs);
});

describe("LogListPage", () => {
  it("contains one Container component", () => {
    const wrapper = Enzyme.shallow(<LogListPage />);
    expect(wrapper.find(Container)).toHaveLength(1);
  });
  it("contains one DynamicBreadcrumb component", () => {
    const wrapper = Enzyme.shallow(<LogListPage />);
    expect(wrapper.find(DynamicBreadcrumb)).toHaveLength(1);
    expect(wrapper.find(DynamicBreadcrumb).prop("breadcrumbs")).toEqual([
      ["Home", "/"],
      ["Logs", "/Logs"]
    ]);
  });
  it("contains two Box components", () => {
    const wrapper = Enzyme.shallow(<LogListPage />);
    expect(wrapper.find(Box)).toHaveLength(2);
  });
  it("contains one Time zone indicator text box", () => {
    const wrapper = Enzyme.shallow(<LogListPage />);
    expect(
      wrapper
        .text()
        .includes(
          "Time Zone: ".concat(
            Intl.DateTimeFormat().resolvedOptions().timeZone
          )
        )
    ).toBe(true);
  });
  it("contains one LogsTable", async () => {
    const wrapper = Enzyme.shallow(<LogListPage />);
    expect(wrapper.find("LogsTable")).toHaveLength(1);
    const flushPromises = () => new Promise(setImmediate);
    await flushPromises();
    expect(wrapper.state("logs")).toBe(mockLogs);
  });
});
