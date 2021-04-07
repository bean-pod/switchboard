import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { IconButton, Tooltip } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import DeviceInfo from "../../model/DeviceInfo";
import StreamInfo from "../../model/StreamInfo";
import StreamDetailsButton from "../StreamDetailsButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<StreamDetailsButton/> functional component", () => {
  let wrapper;
  const dummySender = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 2]);
  const dummyReceiver = new DeviceInfo(2, 2, 2, 2, 2, 2, [3, 4]);
  const dummyStream = new StreamInfo(1, dummySender, dummyReceiver, 2, 3);

  describe("returns a component that", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <StreamDetailsButton streamInfo={dummyStream} />
      );
    });
    it("contains 1 NavLink component with expected props", () => {
      const expectedPath = `/Streams/Details/${dummyStream.id}`;
      const expectedState = {
        stream: dummyStream
      };
      const expectedToProp = {
        pathname: expectedPath,
        state: expectedState
      };

      const navLink = wrapper.find(NavLink);
      expect(navLink).toHaveLength(1);

      const navLinkProps = navLink.first().props();
      expect(navLinkProps.to).toStrictEqual(expectedToProp);
    });
    it("contains 1 IconButton and 1 Description component", () => {
      expect(wrapper.find(IconButton)).toHaveLength(1);
      expect(wrapper.find(Description)).toHaveLength(1);
    });
    it("contains 1 Tooltip component with expected props", () => {
      const tooltip = wrapper.find(Tooltip);
      expect(tooltip).toHaveLength(1);
      expect(tooltip.props().title).toEqual("View Stream Details");
    });
  });
});
