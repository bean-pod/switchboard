import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect } from "@jest/globals";

import DeviceListPage from "../DeviceListPage";
import Page from "../../general/Page";
import DeviceListPageContents from "../DeviceListPageContents";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceListPage/> functional component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<DeviceListPage />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe("returns a component that", () => {
    it("Contains 1 <Page/> component with the expected props", () => {
      const expectedBreadcrumbs = [
        ["Home", "/Home"],
        ["My Devices", "/Devices"]
      ];
      const expected = {
        title: "My Devices",
        breadcrumbs: expectedBreadcrumbs,
        hasStreamButton: true
      };

      const page = wrapper.find(Page);
      expect(page).toHaveLength(1);

      const pageProps = page.props();
      expect(pageProps.title).toBe(expected.title);
      expect(pageProps.breadcrumbs).toStrictEqual(expected.breadcrumbs);
      expect(pageProps.hasStreamButton).toBe(expected.hasStreamButton);
    });
    it("Contains 1 <DeviceListPageContents/> component", () => {
      expect(wrapper.find(DeviceListPageContents)).toHaveLength(1);
    });
  });
});
