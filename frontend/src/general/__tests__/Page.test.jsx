import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { Container } from "@material-ui/core";
import Page from "../Page";

import Title from "../Title";
import HeaderBar from "../HeaderBar";
import DynamicBreadcrumb from "../DynamicBreadcrumb";

Enzyme.configure({ adapter: new Adapter() });
describe("<Title/> functional Component", () => {
  const dummyTitle = "testString";
  const dummyCrumb = [["bread", "crumb"]];
  const dummyChild = <div className="someDummyChild" />;

  const wrapper = Enzyme.shallow(
    <Page title={dummyTitle} breadcrumbs={dummyCrumb}>
      {dummyChild}
    </Page>
  );

  it("returns a component with the correct composition", () => {
    expect(wrapper.find(HeaderBar)).toHaveLength(1);
    expect(wrapper.find(Container)).toHaveLength(1);

    expect(wrapper.find(DynamicBreadcrumb)).toHaveLength(1);
    const crumb = wrapper.find(DynamicBreadcrumb).first();
    expect(crumb.props().breadcrumbs[0][0]).toBe(dummyCrumb[0][0]);
    expect(crumb.props().breadcrumbs[0][1]).toBe(dummyCrumb[0][1]);

    expect(wrapper.find(Title)).toHaveLength(1);
    const title = wrapper.find(Title).first();
    expect(title.props().title).toBe(dummyTitle);

    expect(wrapper.find(".someDummyChild").length).toBeGreaterThan(0);
  });
});
