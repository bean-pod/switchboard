import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { Grid } from "@material-ui/core";

import PathNotFoundPage from "../PathNotFoundPage";
import Page from "../Page";

import * as AuthApi from "../../api/AuthenticationApi";
import DashboardButton from "../dashboard/DashboardButton";
import DashboardCard from "../dashboard/DashboardCard";

Enzyme.configure({ adapter: new Adapter() });

describe("<PathNotFoundPage/> functional Component", () => {
  let wrapper;

  describe("returns a component that", () => {
    describe("when AuthApi.isAuthenticated() returns true", () => {
      beforeEach(() => {
        jest.spyOn(AuthApi, "isAuthenticated").mockImplementation(() => {
          return true;
        });
        wrapper = Enzyme.shallow(<PathNotFoundPage />);
      });
      it("Contains 1 <Page/> component with correct props", () => {
        expect(wrapper.find(Page)).toHaveLength(1);
        const expectedTitle = "Error 404: Path not found";
        const expectedBreadcrumb = [];

        const page = wrapper.find(Page).first();
        expect(page.props().title).toBe(expectedTitle);

        expect(page.props().breadcrumbs).toStrictEqual(expectedBreadcrumb);
      });
      it("Contains 2 <Grid/> components", () => {
        expect(wrapper.find(Grid)).toHaveLength(2);
      });
      it("<Grid/> 1 has expected props", () => {
        const props = wrapper.find(Grid).at(0).props();
        const expectedJustify = "center";
        const expectedDirection = "row";
        const expectedSpacing = 3;

        expect(props.container).toBe(true);
        expect(props.justify).toBe(expectedJustify);
        expect(props.direction).toBe(expectedDirection);
        expect(props.spacing).toBe(expectedSpacing);
      });
      it("<Grid/> 2 has expected props", () => {
        const props = wrapper.find(Grid).at(1).props();
        const expectedXs = 6;

        expect(props.item).toBe(true);
        expect(props.xs).toBe(expectedXs);
        expect(props.children.type.name).toBe("DashboardCard");
      });
      it("Contains 1 <DashboardCard/> component with expected props", () => {
        expect(wrapper.find(DashboardCard)).toHaveLength(1);
        const expectedTitle = "Sorry, that page doesn't exist!";

        const props = wrapper.find(DashboardCard).at(0).props();
        expect(props.title).toBe(expectedTitle);
      });
      it("Contains 1 <DashboardButton/> component with expected props", () => {
        expect(wrapper.find(DashboardButton)).toHaveLength(1);
        const expectedHref = "/Home";
        const expectedText = "Go Home";

        const props = wrapper.find(DashboardButton).at(0).props();
        expect(props.href).toBe(expectedHref);
        expect(props.children).toBe(expectedText);
      });
    });
    describe("when AuthApi.isAuthenticated() returns false", () => {
      beforeEach(() => {
        jest.spyOn(AuthApi, "isAuthenticated").mockImplementation(() => {
          return false;
        });
        wrapper = Enzyme.shallow(<PathNotFoundPage />);
      });
      it("Contains 1 <Page/> component with correct props", () => {
        expect(wrapper.find(Page)).toHaveLength(1);
        const expectedTitle = "Error 404: Path not found";
        const expectedBreadcrumb = [];

        const page = wrapper.find(Page).first();
        expect(page.props().title).toBe(expectedTitle);

        expect(page.props().breadcrumbs).toStrictEqual(expectedBreadcrumb);
      });
      it("Contains 2 <Grid/> components", () => {
        expect(wrapper.find(Grid)).toHaveLength(2);
      });
      it("<Grid/> 1 has expected props", () => {
        const props = wrapper.find(Grid).at(0).props();
        const expectedJustify = "center";
        const expectedDirection = "row";
        const expectedSpacing = 3;

        expect(props.container).toBe(true);
        expect(props.justify).toBe(expectedJustify);
        expect(props.direction).toBe(expectedDirection);
        expect(props.spacing).toBe(expectedSpacing);
      });
      it("<Grid/> 2 has expected props", () => {
        const props = wrapper.find(Grid).at(1).props();
        const expectedXs = 6;

        expect(props.item).toBe(true);
        expect(props.xs).toBe(expectedXs);
        expect(props.children.type.name).toBe("DashboardCard");
      });
      it("Contains 1 <DashboardCard/> component with expected props", () => {
        expect(wrapper.find(DashboardCard)).toHaveLength(1);
        const expectedTitle = "Sorry, that page doesn't exist!";

        const props = wrapper.find(DashboardCard).at(0).props();
        expect(props.title).toBe(expectedTitle);
      });
      it("Contains 1 <DashboardButton/> component with expected props", () => {
        expect(wrapper.find(DashboardButton)).toHaveLength(1);
        const expectedHref = "/Login";
        const expectedText = "Go to Login";

        const props = wrapper.find(DashboardButton).at(0).props();
        expect(props.href).toBe(expectedHref);
        expect(props.children).toBe(expectedText);
      });
    });
  });
});
