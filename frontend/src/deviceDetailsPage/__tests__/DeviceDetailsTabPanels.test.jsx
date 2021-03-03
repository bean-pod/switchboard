import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, jest, it } from "@jest/globals";
import { Container } from "@material-ui/core";

import DeviceDetailsActivityPanel from "../TabPanels/DeviceDetailsActivityPanel";
import DeviceDetailsNotesPanel from "../TabPanels/DeviceDetailsNotesPanel";
import DeviceInfo from "../../model/DeviceInfo";
import * as LogApi from "../../api/LogApi";

Enzyme.configure({ adapter: new Adapter() });

jest.spyOn(global.console, "error");
jest.mock("../../api/LogApi");
jest.spyOn(LogApi, "getDeviceLogs");

const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, ["Hello"]);

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
  LogApi.getDeviceLogs.mockResolvedValue(mockLogs);
});

describe("DeviceDetailsTabPanels", () => {
  let wrapper;
  describe("ActivityPanel", () => {
    it("Renders one Container component containing Container and LogsTable", async () => {
      wrapper = Enzyme.shallow(
        <DeviceDetailsActivityPanel device={dummyDevice} />
      );
      expect(wrapper.find(Container)).toHaveLength(1);
      expect(wrapper.find("LogsTable")).toHaveLength(1);
      const flushPromises = () => new Promise(setImmediate);
      await flushPromises();
      expect(wrapper.state("logs")).toBe(mockLogs);
    });
  });
  describe("NotesPanel", () => {
    it("Renders one Container component", () => {
      wrapper = Enzyme.shallow(<DeviceDetailsNotesPanel extras={[]} />);
      expect(wrapper.find(Container)).toHaveLength(1);
    });
    it("Renders the text of the extras array passed", () => {
      wrapper = Enzyme.shallow(<DeviceDetailsNotesPanel extras={["TEST"]} />);
      expect(wrapper.find(Container)).toHaveLength(1);
      expect(wrapper.text()).toBe("TEST");
    });
  });
});
