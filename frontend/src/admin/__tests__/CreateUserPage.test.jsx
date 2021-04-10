import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

import CreateUserPage from "../createUser/CreateUserPage";
import Page from "../../general/Page";
import CreateUserPageContents from "../createUser/CreateUserPageContents";

Enzyme.configure({ adapter: new Adapter() });

describe("<CreateUserPage/> class component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<CreateUserPage />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("Contains one <Page/> component with correct props", () => {
    const expectedTitle = "Create a User";
    const expectedBreadcrumb = [
      ["Home", "/Home"],
      ["Admin"],
      ["Create a User", "/Admin/New"]
    ];

    expect(wrapper.find(Page)).toHaveLength(1);

    const page = wrapper.find(Page).first();
    expect(page.props().title).toBe(expectedTitle);
    expect(page.props().breadcrumbs).toStrictEqual(expectedBreadcrumb);
  });

  it("Contains one <CreateUserPageContents/> component", () => {
    expect(wrapper.find(CreateUserPageContents)).toHaveLength(1);
  });
});
