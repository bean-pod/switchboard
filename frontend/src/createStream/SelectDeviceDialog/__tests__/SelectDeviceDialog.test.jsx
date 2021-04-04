import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, it } from "@jest/globals";
import { Dialog } from "@material-ui/core";

import SelectDeviceDialog from "../SelectDeviceDialog";

import DeviceInfo from "../../../model/DeviceInfo";
import InputChannelInfo from "../../../model/InputChannelInfo";
import OutputChannelInfo from "../../../model/OutputChannelInfo";
import SelectDeviceSwipeableSteps from "../SwipeableSteps/SelectDeviceSwipeableSteps";

Enzyme.configure({ adapter: new Adapter() });

describe("<SelectDeviceDialog/> class component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummyChannels = [
      new InputChannelInfo("", "hey"),
      new OutputChannelInfo("", "you"),
      new InputChannelInfo("", "there")
    ];
    const dummyDevice0 = new DeviceInfo(
      "serial",
      "sometime",
      "public",
      "private",
      "someName",
      "Online",
      dummyChannels,
      "encoder",
      "yabadoo"
    );
    const dummyDevice1 = new DeviceInfo("", "", "", "", "someName2");

    const deviceList = [dummyDevice0, dummyDevice1];
    const deviceIndex = 0;
    const channelIndex = 0;
    let mockSetDeviceIndex;
    let mockSetChannelIndex;

    beforeEach(() => {
      mockSetDeviceIndex = jest.fn();
      mockSetChannelIndex = jest.fn();
      wrapper = Enzyme.shallow(
        <SelectDeviceDialog
          deviceList={deviceList}
          deviceIndex={deviceIndex}
          setDeviceIndex={mockSetDeviceIndex}
          channelIndex={channelIndex}
          setChannelIndex={mockSetChannelIndex}
        />
      );
    });
    afterEach(() => {
      wrapper.unmount();
    });

    describe("render() function returns a component that", () => {
      it("Contains 1 <Dialog/> component with expected props", () => {
        const dialogs = wrapper.find(Dialog);
        expect(dialogs).toHaveLength(1);

        const props = dialogs.at(0).props();
        const expected = {
          open: wrapper.instance().state.open,
          fullWidth: true,
          maxWidth: "sm",
          onClose: wrapper.instance().closeDialog
        };
        expect(props.open).toBe(expected.open);
        expect(props.fullWidth).toBe(expected.fullWidth);
        expect(props.maxWidth).toBe(expected.maxWidth);
        expect(props.onClose).toStrictEqual(expected.onClose);
      });
      it("Contains 1 <SelectDeviceSwipeableSteps/> component with expected props", () => {
        const steps = wrapper.find(SelectDeviceSwipeableSteps);
        expect(steps).toHaveLength(1);

        const props = steps.at(0).props();
        const expected = {
          handleClose: wrapper.instance().closeDialog,
          deviceList,
          deviceIndex,
          setDeviceIndex: mockSetDeviceIndex,
          channelIndex,
          setChannelIndex: mockSetChannelIndex
        };
        expect(props).toStrictEqual(expected);
      });
    });
    describe("openDialog() function", () => {
      it("should set the state.open to true", () => {
        const startingState = {
          open: false
        };
        const openState = {
          open: true
        };

        wrapper.setState(startingState);
        wrapper.instance().openDialog();

        expect(wrapper.state()).toEqual(openState);
      });
    });

    describe("closeDialog() function", () => {
      it("should set the state.open to false", () => {
        const startingState = {
          open: true
        };
        const endState = {
          open: false
        };
        wrapper.setState(startingState);

        wrapper.instance().closeDialog();

        expect(wrapper.state()).toEqual(endState);
      });
    });
  });
});
