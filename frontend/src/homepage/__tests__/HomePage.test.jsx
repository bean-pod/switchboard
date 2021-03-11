import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import HomePage from "../HomePage";
import HomePageContents from "../HomePageContents";
import Page from "../../general/Page";

Enzyme.configure({ adapter: new Adapter() });

describe("<HomePage/> functional component", () => {
  let wrapper;
  const expectedTitle = "Dashboard";
  const expectedCrumb = [["Home", ""]];
  describe("returns a component that", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<HomePage />);
    });
    it("contains 1 <Page/> component with the correct props", () => {
      expect(wrapper.find(Page)).toHaveLength(1);

      const pageProps = wrapper.find(Page).first().props();
      expect(pageProps.title).toBe(expectedTitle);
      expect(pageProps.breadcrumbs).toStrictEqual(expectedCrumb);
    });
    it("Contains 1 <HomePageContents/> component", () => {
      expect(wrapper.find(HomePageContents)).toHaveLength(1);
    });
  });
});
