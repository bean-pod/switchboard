import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

import LoginPage from "../LoginPage";
import Page from "../../general/Page";
import LoginPageContents from "../LoginPageContents";

Enzyme.configure({ adapter: new Adapter() });

describe("<LoginPage/> Class Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<LoginPage />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("render() function", () => {
    describe("returns a component that", () => {
      it("Contains 1 <Page/> component with expected props", () => {
        const expectedTitle = "Login";
        const expectedBreadcrumb = [];

        expect(wrapper.find(Page)).toHaveLength(1);

        const page = wrapper.find(Page).first();
        expect(page.props().title).toBe(expectedTitle);
        expect(page.props().breadcrumbs).toStrictEqual(expectedBreadcrumb);
      });
      it("Contains 1 <LoginPageContents/> component", () => {
        expect(wrapper.find(LoginPageContents)).toHaveLength(1);
      });
    });
  });
});
