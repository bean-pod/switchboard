import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { afterEach } from "@jest/globals";
import DeviceInfo from "../../model/DeviceInfo";
import StreamInfo from "../../model/StreamInfo";
import StreamDetailsButton from "../StreamDetailsButton";
import DetailsButton from "../../general/Buttons/DetailsButton";

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
    afterEach(() => {
      wrapper.unmount();
    });
    it("contains 1 DetailsButton component with expected props", () => {
      const expectedPath = `/Streams/Details/${dummyStream.id}`;
      const expectedState = {
        stream: dummyStream
      };
      const expectedToProp = {
        pathname: expectedPath,
        state: expectedState
      };

      const detailsButton = wrapper.find(DetailsButton);
      expect(detailsButton).toHaveLength(1);

      const detailsButtonProps = detailsButton.props();
      expect(detailsButtonProps.navLinkInfo).toStrictEqual(expectedToProp);
      expect(detailsButtonProps.tooltipTitle).toEqual("View Stream Details");
    });
    it("contains 1 Tooltip component with expected props", () => {
      const tooltip = wrapper.find(Tooltip);
      expect(tooltip).toHaveLength(1);
      expect(tooltip.props().title).toEqual("View Stream Details");
    });
  });
});
