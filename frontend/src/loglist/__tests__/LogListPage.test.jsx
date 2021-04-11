import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import LogListPage from "../LogListPage";
import Page from "../../general/Page";
import LogTableWrapper from "../LogTableWrapper";

Enzyme.configure({ adapter: new Adapter() });

describe("<LogListPage/> functional component", () => {
  const wrapper = Enzyme.shallow(<LogListPage />);
  describe("returns a component that contains", () => {
    it("one <Page/> Component with expected props", () => {
      const expectedTitle = "Logs";
      const expectedBreadcrumbs = [
        ["Home", "/Home"],
        ["Logs", "/Logs"]
      ];
      expect(wrapper.find(Page)).toHaveLength(1);
      const pageProps = wrapper.find(Page).first().props();
      expect(pageProps.title).toBe(expectedTitle);
      expect(pageProps.breadcrumbs).toStrictEqual(expectedBreadcrumbs);
    });
    it("one <LogTableWrapper/> component", () => {
      expect(wrapper.find(LogTableWrapper)).toHaveLength(1);
    });
  });
});
