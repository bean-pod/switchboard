import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect } from "@jest/globals";

import CreateStreamCardToggler from "../CreateStreamCardToggler";

import DeviceInfo from "../../../model/DeviceInfo";
import InputChannelInfo from "../../../model/InputChannelInfo";
import OutputChannelInfo from "../../../model/OutputChannelInfo";
import SelectedDeviceCard from "../SelectedDeviceCard";
import UnselectedDeviceCard from "../UnselectedDeviceCard";

Enzyme.configure({ adapter: new Adapter() });

describe("<SelectDeviceTable/> functional component", () => {
  let wrapper;

  describe("returns a component that", () => {
    const dummyChannels = [
      new InputChannelInfo("", "hey"),
      new OutputChannelInfo("", "you"),
      new InputChannelInfo("", "there", 555)
    ];
    const dummyDevice0 = new DeviceInfo(
      "serial",
      "sometime",
      "public",
      "private",
      "someName",
      "Online",
      dummyChannels
    );
    const dummyDevice1 = new DeviceInfo("", "", "", "", "someName2");
    const dummyDevices = [dummyDevice1];
    dummyDevices[5] = dummyDevice0;
    const dummyTitle = "TITLE";

    const mockOpenDialog = jest.fn();

    afterEach(() => {
      wrapper.unmount();
    });
    describe("when deviceIndex is -1", () => {
      const dummyDeviceIndex = -1;
      describe("when channelIndex is -1", () => {
        const dummyChannelIndex = -1;
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <CreateStreamCardToggler
              title={dummyTitle}
              openDialog={mockOpenDialog}
              deviceIndex={dummyDeviceIndex}
              deviceList={dummyDevices}
              channelIndex={dummyChannelIndex}
            />
          );
        });
        describe("returns a component that", () => {
          it("Contains 0 <SelectedDeviceCard/> components with expected props", () => {
            const selectedCards = wrapper.find(SelectedDeviceCard);
            expect(selectedCards).toHaveLength(0);
          });
          it("Contains 1 <UnselectedDeviceCard/> component with expected props", () => {
            const unselectedCards = wrapper.find(UnselectedDeviceCard);
            expect(unselectedCards).toHaveLength(1);

            const props = unselectedCards.at(0).props();

            const expected = {
              title: dummyTitle,
              onClick: mockOpenDialog
            };
            expect(props.title).toBe(expected.title);
            expect(props.onClick).toStrictEqual(expected.onClick);
          });
        });
      });
      describe("when channelIndex is not -1", () => {
        const dummyChannelIndex = 2;
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <CreateStreamCardToggler
              title={dummyTitle}
              openDialog={mockOpenDialog}
              deviceIndex={dummyDeviceIndex}
              deviceList={dummyDevices}
              channelIndex={dummyChannelIndex}
            />
          );
        });
        describe("returns a component that", () => {
          it("Contains 0 <SelectedDeviceCard/> components with expected props", () => {
            const selectedCards = wrapper.find(SelectedDeviceCard);
            expect(selectedCards).toHaveLength(0);
          });
          it("Contains 1 <UnselectedDeviceCard/> component with expected props", () => {
            const unselectedCards = wrapper.find(UnselectedDeviceCard);
            expect(unselectedCards).toHaveLength(1);

            const props = unselectedCards.at(0).props();

            const expected = {
              title: dummyTitle,
              onClick: mockOpenDialog
            };
            expect(props.title).toBe(expected.title);
            expect(props.onClick).toStrictEqual(expected.onClick);
          });
        });
      });
    });
    describe("when deviceIndex is not -1", () => {
      const dummyDeviceIndex = 5;
      describe("when channelIndex is -1", () => {
        const dummyChannelIndex = -1;
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <CreateStreamCardToggler
              title={dummyTitle}
              openDialog={mockOpenDialog}
              deviceIndex={dummyDeviceIndex}
              deviceList={dummyDevices}
              channelIndex={dummyChannelIndex}
            />
          );
        });
        describe("returns a component that", () => {
          it("Contains 0 <SelectedDeviceCard/> components with expected props", () => {
            const selectedCards = wrapper.find(SelectedDeviceCard);
            expect(selectedCards).toHaveLength(0);
          });
          it("Contains 1 <UnselectedDeviceCard/> component with expected props", () => {
            const unselectedCards = wrapper.find(UnselectedDeviceCard);
            expect(unselectedCards).toHaveLength(1);

            const props = unselectedCards.at(0).props();

            const expected = {
              title: dummyTitle,
              onClick: mockOpenDialog
            };
            expect(props.title).toBe(expected.title);
            expect(props.onClick).toStrictEqual(expected.onClick);
          });
        });
      });
      describe("when channelIndex is not -1", () => {
        const dummyChannelIndex = 2;
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <CreateStreamCardToggler
              title={dummyTitle}
              openDialog={mockOpenDialog}
              deviceIndex={dummyDeviceIndex}
              deviceList={dummyDevices}
              channelIndex={dummyChannelIndex}
            />
          );
        });
        describe("returns a component that", () => {
          it("Contains 1 <SelectedDeviceCard/> components with expected props", () => {
            const selectedCards = wrapper.find(SelectedDeviceCard);
            expect(selectedCards).toHaveLength(1);

            const props = selectedCards.at(0).props();
            const expected = {
              title: dummyTitle,
              openDialog: mockOpenDialog,
              device: dummyDevices[dummyDeviceIndex],
              channelId:
                dummyDevices[dummyDeviceIndex].channels[dummyChannelIndex].port
            };

            expect(props).toStrictEqual(expected);
          });
          it("Contains 0 <UnselectedDeviceCard/> components", () => {
            const unselectedCards = wrapper.find(UnselectedDeviceCard);
            expect(unselectedCards).toHaveLength(0);
          });
        });
      });
    });
  });
});
