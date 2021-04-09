import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { afterEach } from "@jest/globals";
import DeviceInfo from "../../model/DeviceInfo";
import DeviceDetailsButton from "../DeviceDetailsButton";
import DetailsButton from "../../general/Buttons/DetailsButton";

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
    it("contains 1 DetailsButton component with expected props", () => {
      const expectedPath = `/Devices/Details/${dummyDevice.serialNumber}`;
      const expectedState = {
        device: dummyDevice
      };
      const expectedToProp = {
        pathname: expectedPath,
        state: expectedState
      };

      const detailsButton = wrapper.find(DetailsButton);
      expect(detailsButton).toHaveLength(1);

      const detailsButtonProps = detailsButton.props();
      expect(detailsButtonProps.navLinkInfo).toStrictEqual(expectedToProp);
      expect(detailsButtonProps.tooltipTitle).toEqual("View Device Details");
    });
  });
});
