import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import StreamListPage from "../StreamListPage";
import DetailedStreamTableWrapper from "../DetailedStreamTableWrapper";
import Page from "../../general/Page";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamListPage/> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamListPage />);
  });
  afterEach(() => {
    wrapper.unmount();
  });

  describe("Should contain the following components", () => {
    it("Contains 1 <Page/> component with correct props", () => {
      const expectedBreadcrumbs = [
        ["Home", "/Home"],
        ["Active Streams", "/Streams"]
      ];

      const expected = {
        title: "Active Streams",
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
    it("Contains 1 <DetailedStreamTableWrapper/> component", () => {
      expect(wrapper.find(DetailedStreamTableWrapper)).toHaveLength(1);
    });
  });
});
