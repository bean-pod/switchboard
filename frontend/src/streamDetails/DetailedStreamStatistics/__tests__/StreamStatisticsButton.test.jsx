import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";

import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import StreamStatisticsButton from "../StreamStatisticsButton";
import { getSampleStreamStats } from "../../../api/SampleData";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamStatisticsButton/> functional component", () => {
  const dummyStats = getSampleStreamStats();
  describe("returns a component with the correct elements", () => {
    const wrapper = Enzyme.shallow(
      <StreamStatisticsButton statistics={dummyStats} />
    );
    it("has 1 NavLink component with expected props", () => {
      const expectedProps = {
        activeClassName: "hideLinkStyle",
        className: "hideLinkStyle",
        to: {
          pathname: `/Streams/Details/${dummyStats.id}/Statistics`,
          state: { statistics: dummyStats }
        }
      };

      const navlink = wrapper.find(NavLink);
      expect(navlink).toHaveLength(1);

      const navlinkProps = navlink.props();
      expect(navlinkProps.activeClassName).toBe(expectedProps.activeClassName);
      expect(navlinkProps.className).toBe(expectedProps.className);
      expect(navlinkProps.to).toStrictEqual(expectedProps.to);
    });
    it("has 1 Button component with expected props", () => {
      const expectedProps = {
        variant: "contained"
      };

      const button = wrapper.find(Button);
      expect(button).toHaveLength(1);
      expect(button.text()).toBe("More Statistics");

      const buttonProps = button.props();
      expect(buttonProps.variant).toBe(expectedProps.variant);
    });
  });
});
