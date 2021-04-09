import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  it
} from "@jest/globals";

import { Table, TableBody } from "@material-ui/core";
import DeviceInfoTable from "../DeviceInfoTable";

import DeviceInfo from "../../../model/DeviceInfo";
import DeviceInfoRow from "../DeviceInfoRow";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");
jest.mock("../../../model/DeviceInfo");
jest.spyOn(global.console, "error");

describe("<DeviceInfoTable/> functional component", () => {
  let wrapper;

  beforeEach(() => {
    const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 1]);
    const dummyProperties = ["Something", "Something Else", "Other thing"];
    wrapper = Enzyme.shallow(
      <DeviceInfoTable device={dummyDevice} properties={dummyProperties} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("render() function returns a component that", () => {
    it("Contains 1 <Table/> component", () => {
      expect(wrapper.find(Table)).toHaveLength(1);
    });
    it("Contains 1 <TableBody/> component", () => {
      expect(wrapper.find(TableBody)).toHaveLength(1);
    });
    it("Contains 3 <DeviceInfoRow/> components", () => {
      expect(wrapper.find(DeviceInfoRow)).toHaveLength(3);
    });
  });
});
