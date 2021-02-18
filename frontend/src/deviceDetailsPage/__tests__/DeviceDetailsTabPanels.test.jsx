import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, jest, it } from "@jest/globals";
import { Container } from "@material-ui/core";

import DeviceDetailsActivityPanel from "../TabPanels/DeviceDetailsActivityPanel";
import DeviceDetailsNotesPanel from "../TabPanels/DeviceDetailsNotesPanel";
import * as SampleData from "../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

jest.spyOn(global.console, "error");

describe("DeviceDetailsPanels", () => {
  let wrapper;
  describe("ActivityPanel", () => {
    const sampleDevice = SampleData.getSampleSender();
    it("Renders one Container component containing Container and LogsTable", () => {
      wrapper = Enzyme.shallow(
        <DeviceDetailsActivityPanel device={sampleDevice} />
      );
      expect(wrapper.find(Container)).toHaveLength(1);
      expect(wrapper.find("LogsTable")).toHaveLength(1);
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
