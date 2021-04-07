import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, it } from "@jest/globals";
import { NavLink } from "react-router-dom";
import TitleButtons from "../TitleButtons";
import StreamButton from "../Buttons/StreamButton";

// comment

Enzyme.configure({ adapter: new Adapter() });

describe("<TitleButtons/> functional component", () => {
  const wrapper = Enzyme.shallow(<TitleButtons />);
  describe("returns a component that", () => {
    it("contains 1 div with expected className", () => {
      expect(wrapper.find(".alignRightFloat")).toHaveLength(1);
    });
    it("contains 1 <NavLink/> component with expected props", () => {
      expect(wrapper.find(NavLink)).toHaveLength(1);

      const navLinkProps = wrapper.find(NavLink).first().props();
      expect(navLinkProps.to).toBe("/Streams/New");
      expect(navLinkProps.activeClassName).toBe("hideLinkStyle");
      expect(navLinkProps.className).toBe("hideLinkStyle");
      expect(navLinkProps.exact).toBe(true);

      expect(navLinkProps.children.type.name).toBe("StreamButton");
    });
    it("Contains 1 <StreamButton/> component with expected props", () => {
      expect(wrapper.find(StreamButton)).toHaveLength(1);

      const streamButtonProps = wrapper.find(StreamButton).first().props();

      expect(streamButtonProps.type).toBe("submit");
    });
  });
});
