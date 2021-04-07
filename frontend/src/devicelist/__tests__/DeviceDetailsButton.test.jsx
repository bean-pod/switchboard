import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { IconButton } from "@material-ui/core";
import { Description } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

import { afterEach } from "@jest/globals";
import DeviceInfo from "../../model/DeviceInfo";
import DeviceDetailsButton from "../DeviceDetailsButton";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceDetailsButton/> functional component", () => {
  let wrapper;
  const dummyDevice = new DeviceInfo(1, 1, 1, 1, 1, 1, [1, 2]);

  describe("returns a component that", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <DeviceDetailsButton deviceInfo={dummyDevice} />
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it("contains 1 NavLink component with expected props", () => {
      const expectedPath = `/Devices/Details/${dummyDevice.serialNumber}`;
      const expectedState = {
        device: dummyDevice
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
  });
});
