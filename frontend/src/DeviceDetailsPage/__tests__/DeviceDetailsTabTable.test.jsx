import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, jest, it } from "@jest/globals";
import { TableCell, TableContainer, TableRow } from "@material-ui/core";
import DeviceDetailsConciseRow from "../DeviceDetailsConciseRow";
import ChannelDetailsTable from "../../devicelist/ChannelDetailsTable";
import InputChannelInfo from "../../model/InputChannelInfo";
import OutputChannelInfo from "../../model/OutputChannelInfo";
import DeviceDetailsTabTable from "../DeviceDetailsTabTable";
import DeviceDetailsConciseTable from "../DeviceDetailsConciseTable";
import DeviceDetailsActivityPanel from "../TabPanels/DeviceDetailsActivityPanel";
import DeviceDetailsNotesPanel from "../TabPanels/DeviceDetailsNotesPanel";
import DeviceInfo from "../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");
jest.spyOn(global.console, "error");

describe("DeviceDetailsConciseRow class", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getPanelContents()", () => {
    it('Returns a DeviceDetailsConciseTable component if passed "Overview"', () => {
      const dummyTabInfo = "Overview";
      const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, ["Hello"]);

      wrapper = Enzyme.shallow(
        <div>
          {DeviceDetailsTabTable.getPanelContents(dummyTabInfo, dummyDevice)}
        </div>
      );
      expect(wrapper.find(DeviceDetailsConciseTable)).toHaveLength(1);
    });
    it('Returns a DeviceDetailsActivityPanel component if passed "Activity Log"', () => {
      const dummyTabInfo = "Activity Log";
      const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, ["Hello"]);

      wrapper = Enzyme.shallow(
        <div>
          {DeviceDetailsTabTable.getPanelContents(dummyTabInfo, dummyDevice)}
        </div>
      );
      expect(wrapper.find(DeviceDetailsActivityPanel)).toHaveLength(1);
    });
  });
  it('Returns a DeviceDetailsNotesPanel component if passed "Notes"', () => {
    const dummyTabInfo = "Notes";
    const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, ["Hello"]);

    wrapper = Enzyme.shallow(
      <div>
        {DeviceDetailsTabTable.getPanelContents(dummyTabInfo, dummyDevice)}
      </div>
    );
    expect(wrapper.find(DeviceDetailsNotesPanel)).toHaveLength(1);
  });
  it("Returns a div component if passed an invalid value", () => {
    const dummyTabInfo = "Not a valid Value";
    const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, ["Hello"]);

    wrapper = Enzyme.shallow(
      <div>
        {DeviceDetailsTabTable.getPanelContents(dummyTabInfo, dummyDevice)}
      </div>
    );
    expect(wrapper.children).toHaveLength(1);
    expect(wrapper.childAt(0).text()).toEqual("Whoops not a valid value");
  });
});
