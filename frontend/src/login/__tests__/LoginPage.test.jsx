import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";

import LoginPage from "../LoginPage";
import Page from "../../general/Page";
import LoginPageContents from "../LoginPageContents";

Enzyme.configure({ adapter: new Adapter() });

describe("<LoginPage/> class component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.mount(<LoginPage />);
  });
  it("Contains one <Page/> component with correct props", () => {
    const expectedTitle = "Login";
    const expectedBreadcrumb = [];

    expect(wrapper.find(Page)).toHaveLength(1);

    const page = wrapper.find(Page).first;
    expect(page.props().title).toBe(expectedTitle);
    expect(page.props().breadcrumbs).toStrictEqual(expectedBreadcrumb);
  });
  it("Contains one <LoginPageContents/> component", () => {
    expect(wrapper.find(LoginPageContents)).toHaveLength(1);
  });
});
