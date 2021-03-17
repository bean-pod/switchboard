import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { describe } from "@jest/globals";
import DeviceInfo from "../../model/DeviceInfo";

import StreamDeviceDetails from "../StreamDeviceDetails";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamDeviceDetails/> functional component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummyDevice = new DeviceInfo(
      "serial",
      "sometime",
      "public",
      "private",
      "someName",
      "Online",
      "encoder",
      "yabadoo"
    );
    const dummyChannel = 10;

    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamDeviceDetails device={dummyDevice} channel={dummyChannel} />
      );
    });
    it("contains 1 TableContainer component with expected props", () => {
      const expectedStyle = { maxHeight: 300 };
      const tableContainer = wrapper.find(TableContainer);
      expect(tableContainer).toHaveLength(1);

      const tableContainerProps = tableContainer.props();
      expect(tableContainerProps.style).toStrictEqual(expectedStyle);
    });
    it("contains 1 Table component, 1 TableBody component, and 3 TableRow components", () => {
      expect(wrapper.find(Table)).toHaveLength(1);
      expect(wrapper.find(TableBody)).toHaveLength(1);
      expect(wrapper.find(TableRow)).toHaveLength(3);
    });
    it("contains 6 TableCell components with expected contents", () => {
      const tableCells = wrapper.find(TableCell);
      expect(tableCells.length).toBe(6);

      expect(tableCells.at(0).text()).toBe("Name");
      expect(tableCells.at(1).text()).toBe(dummyDevice.name);

      expect(tableCells.at(2).text()).toBe("Serial Number");
      expect(tableCells.at(3).text()).toBe(dummyDevice.serialNumber);

      expect(tableCells.at(4).text()).toBe("Channel");
      expect(tableCells.at(5).text()).toBe(dummyChannel.toString());
    });
  });
});
