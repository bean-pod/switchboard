import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import { Box, TableContainer } from "@material-ui/core";
import MaterialTable from "material-table";
import LogsTable from "../LogsTable";

Enzyme.configure({ adapter: new Adapter() });

describe("LogsTable", () => {
  const dummyLogs = [];
  const wrapper = Enzyme.shallow(<LogsTable logs={dummyLogs} />);
  it("contains one Box component", () => {
    expect(wrapper.find(Box)).toHaveLength(1);
  });
  it("contains one TableContainer component", () => {
    expect(wrapper.find(TableContainer)).toHaveLength(1);
  });
  it("contains one MaterialTable component", () => {
    expect(wrapper.find(MaterialTable)).toHaveLength(1);
  });
  it("contains one Time zone indicator text box", () => {
    expect(
      wrapper
        .text()
        .includes(
          "Time Zone: ".concat(Intl.DateTimeFormat().resolvedOptions().timeZone)
        )
    ).toBe(true);
  });
});
