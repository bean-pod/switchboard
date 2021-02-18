import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, jest, it } from "@jest/globals";

import { Container, Box } from "@material-ui/core";
import LogList from "../LogList";
import DynamicBreadcrumb from "../../general/DynamicBreadcrumb";
import * as LogApi from "../../api/LogApi";

Enzyme.configure({ adapter: new Adapter() });

jest.spyOn(global.console, "error");

describe("LogsList", () => {
  const wrapper = Enzyme.shallow(<LogList dataSource={LogApi} />);
  it("contains one Container component", () => {
    expect(wrapper.find(Container)).toHaveLength(1);
  });
  it("contains one DynamicBreadcrumb component", () => {
    expect(wrapper.find(DynamicBreadcrumb)).toHaveLength(1);
    expect(wrapper.find(DynamicBreadcrumb).prop("breadcrumbs")).toEqual([
      ["Home", "/"],
      ["Logs", "/Logs"]
    ]);
  });
  it("contains two Box components", () => {
    expect(wrapper.find(Box)).toHaveLength(2);
  });
  it("contains one Time zone indicator text box", () => {
    expect(wrapper.text().includes("Logs")).toBe(true);
  });
  it("contains one LogsTable", () => {
    expect(wrapper.find("LogsTable")).toHaveLength(1);
  });
});
