import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";

import { Box, Breadcrumbs, Link, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { NavigateNext } from "@material-ui/icons";
import DeviceInfo from "../../model/DeviceInfo";
import StreamInfo from "../../model/StreamInfo";
import DynamicBreadcrumb from "../DynamicBreadcrumb";

Enzyme.configure({ adapter: new Adapter() });

describe("<DynamicBreadcrumb/> functional component", () => {
  let wrapper;
  const objectBreadcrumb = [
    "someDisplayName",
    "somePathName",
    { beep: new DeviceInfo("beep"), boop: new StreamInfo("boop") }
  ];
  const noObjectBreadcrumb = ["someOtherDisplayName", "someOtherPathName"];
  const breadcrumbs = [objectBreadcrumb, noObjectBreadcrumb];

  beforeEach(() => {
    wrapper = Enzyme.shallow(<DynamicBreadcrumb breadcrumbs={breadcrumbs} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  describe("returns a component that", () => {
    it("Contains one <Box/> component with expected props", () => {
      const components = wrapper.find(Box);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();

      const expected = {
        padding: "2em 0em 0em"
      };
      expect(props.padding).toBe(expected.padding);
    });
    it("Contains one <Breadcrumbs/> component with expected props", () => {
      const components = wrapper.find(Breadcrumbs);
      expect(components).toHaveLength(1);

      const props = components.at(0).props();

      const expected = {
        "aria-label": "breadcrumb",
        separator: <NavigateNext fontSize="medium" />
      };
      expect(props).toMatchObject(expected);
    });
    it("Contains <Link/> components equal to number of crumbs passed", () => {
      const components = wrapper.find(Link);
      expect(components).toHaveLength(breadcrumbs.length);
    });
    it("<Link/> 0 has expected props", () => {
      const components = wrapper.find(Link);

      const props = components.at(0).props();

      const expected = {
        component: NavLink,
        to: {
          pathname: objectBreadcrumb[1],
          state: objectBreadcrumb[2]
        }
      };
      expect(props).toMatchObject(expected);
    });
    it("<Link/> 1 has expected props", () => {
      const components = wrapper.find(Link);

      const props = components.at(1).props();

      const expected = {
        component: NavLink,
        to: {
          pathname: noObjectBreadcrumb[1],
          state: null
        }
      };
      expect(props).toMatchObject(expected);
    });
    it("Contains <Typography/> components equal to number of crumbs passed", () => {
      const components = wrapper.find(Typography);
      expect(components).toHaveLength(breadcrumbs.length);
    });
    it("<Typography/> 1 components has expected props", () => {
      const components = wrapper.find(Typography);
      const props = components.at(0).props();

      const expected = {
        color: "textPrimary",
        children: objectBreadcrumb[0]
      };
      expect(props).toMatchObject(expected);
    });
    it("<Typography/> 1 components has expected props", () => {
      const components = wrapper.find(Typography);
      const props = components.at(1).props();

      const expected = {
        color: "textPrimary",
        children: noObjectBreadcrumb[0]
      };
      expect(props).toMatchObject(expected);
    });
  });
});
