import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import LogListPage from "../LogListPage";
import Page from "../../general/Page";
import LogsTableWrapper from "../LogsTableWrapper";

Enzyme.configure({ adapter: new Adapter() });

describe("<LogListPage/> functional component", () => {
  const mockDataSource = {
    dummyFunction1: () => {}
  };
  const wrapper = Enzyme.shallow(
    <LogListPage logsDataSource={mockDataSource} />
  );
  describe("returns a component that contains", () => {
    it("one <Page/> Component", () => {
      const expectedTitle = "Logs";
      const expectedBreadcrumbs = [
        ["Home", "/Home"],
        ["Logs", "/Logs"]
      ];
      expect(wrapper.find(Page)).toHaveLength(1);
      const pageProps = wrapper.find(Page).first().props;
      expect(pageProps.title).toBe(expectedTitle);
      expect(pageProps.breadcrumbs).toStrictEqual(expectedBreadcrumbs);
    });
    it("one <LogsTableWrapper/> component", () => {
      expect(wrapper.find(LogsTableWrapper)).toHaveLength(1);
    });
  });
});
