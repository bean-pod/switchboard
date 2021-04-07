import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { Container } from "@material-ui/core";
import Page from "../Page";

import Title from "../Title";
import HeaderBar from "../HeaderBar";
import DynamicBreadcrumb from "../DynamicBreadcrumb";

Enzyme.configure({ adapter: new Adapter() });
describe("<Page/> functional Component", () => {
  const dummyTitle = "testString";
  const dummyCrumb = [["bread", "crumb"]];
  const dummyChild = <div className="someDummyChild" />;

  let wrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  describe("returns a component that", () => {
    describe("if props do not contain deviceList", () => {
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <Page
            title={dummyTitle}
            breadcrumbs={dummyCrumb}
            hasStreamButton={false}
          >
            {dummyChild}
          </Page>
        );
      });
      it("Contains 1 <HeaderBar/> component with expected props", () => {
        expect(wrapper.find(HeaderBar)).toHaveLength(1);
      });
      it("Contains 1 <Container/> component", () => {
        expect(wrapper.find(Container)).toHaveLength(1);
      });
      it("Contains 1 <DynamicBreadcrumb/> component with expected props", () => {
        expect(wrapper.find(DynamicBreadcrumb)).toHaveLength(1);
        const crumb = wrapper.find(DynamicBreadcrumb).first();
        expect(crumb.props().breadcrumbs[0][0]).toBe(dummyCrumb[0][0]);
        expect(crumb.props().breadcrumbs[0][1]).toBe(dummyCrumb[0][1]);
      });
      it("Contains 1 <Title/> component with expected props", () => {
        const title = wrapper.find(Title);
        expect(title).toHaveLength(1);

        const expected = {
          title: dummyTitle,
          hasStreamButton
        };

        const titleProps = wrapper.find(Title).props();
        expect(titleProps.title).toBe(expected.title);
        expect(titleProps.hasStreamButton).toBe(expected.hasStreamButton);
      });
    });
    describe("if props contain hasStreamButton", () => {
      beforeEach(() => {
        wrapper = Enzyme.shallow(
          <Page
            title={dummyTitle}
            breadcrumbs={dummyCrumb}
            hasStreamButton={true}
          >
            {dummyChild}
          </Page>
        );
      });
      it("Contains 1 <Title/> component with expected props", () => {
        const title = wrapper.find(Title);
        expect(title).toHaveLength(1);

        const expected = {
          title: dummyTitle,
          hasStreamButton
        };

        const titleProps = title.props();
        expect(titleProps.title).toBe(expected.title);
        expect(titleProps.hasStreamButton).toBe(expected.hasStreamButton);
      });
    });
  });
});
