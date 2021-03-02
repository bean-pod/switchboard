import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Container, Box } from "@material-ui/core";

import LogListPage from "../LogListPage";
import DynamicBreadcrumb from "../../general/DynamicBreadcrumb";
import LogTableWrapper from "../LogTableWrapper";

Enzyme.configure({ adapter: new Adapter() });

describe("<LogListPage/> functional component", () => {
  const mockDataSource = {
    dummyFunction1: () => {}
  };
  const wrapper = Enzyme.shallow(
    <LogListPage logsDataSource={mockDataSource} />
  );
  describe("returns a component that contains", () => {
    it("one Container component", () => {
      expect(wrapper.find(Container)).toHaveLength(1);
    });
    it("one DynamicBreadcrumb component", () => {
      expect(wrapper.find(DynamicBreadcrumb)).toHaveLength(1);
      expect(wrapper.find(DynamicBreadcrumb).prop("breadcrumbs")).toEqual([
        ["Home", "/"],
        ["Logs", "/Logs"]
      ]);
    });
    it("two Box components", () => {
      expect(wrapper.find(Box)).toHaveLength(2);
    });
    it("one text title component", () => {
      expect(wrapper.find(".title")).toHaveLength(1);
    });
    it("one LogTableWrapper", () => {
      expect(wrapper.find(LogTableWrapper)).toHaveLength(1);
    });
  });
});
