import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect, it } from "@jest/globals";
import { DialogTitle, MobileStepper } from "@material-ui/core";

import SwipeableViews from "react-swipeable-views";
import SelectDeviceSwipeableSteps from "../SelectDeviceSwipeableSteps";
import InputChannelInfo from "../../../model/InputChannelInfo";
import DeviceInfo from "../../../model/DeviceInfo";
import StepperBackButton from "../StepperBackButton";
import StepperNextButton from "../StepperNextButton";
import SelectDeviceTable from "../../SelectDeviceDialog/SelectDeviceTable";
import SelectChannelTable from "../../SelectDeviceDialog/SelectChannelTable";
import StreamDeviceCard from "../../../general/StreamDeviceCard";

Enzyme.configure({ adapter: new Adapter() });

describe("<SelectDeviceSwipeableSteps/> class component", () => {
  let wrapper;

  const dummyChannels = [
    new InputChannelInfo("", "hey", 4),
    new InputChannelInfo("", "you", 5),
    new InputChannelInfo("", "there", 6)
  ];
  const dummyDevice = (num) =>
    new DeviceInfo(
      "serial",
      "sometime",
      "public",
      "private",
      `someName${num}`,
      "Online",
      dummyChannels,
      "encoder",
      "yabadoo"
    );

  const dummyDeviceList = [
    dummyDevice(0),
    dummyDevice(1),
    dummyDevice(2),
    dummyDevice(3)
  ];
  const dummyDeviceIndex = 0;
  const dummyChannelIndex = 0;

  const mockHandleClose = jest.fn();
  const mockSetDeviceIndex = jest.fn();
  const mockSetChannelIndex = jest.fn();

  afterEach(() => {
    wrapper.unmount();
  });
  describe("render() function returns a component that", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <SelectDeviceSwipeableSteps
          handleClose={mockHandleClose}
          deviceList={dummyDeviceList}
          deviceIndex={dummyDeviceIndex}
          setDeviceIndex={mockSetDeviceIndex}
          channelIndex={dummyChannelIndex}
          setChannelIndex={mockSetChannelIndex}
        />
      );
    });

    it("Contains 1 <DialogTitle/> component with expected value", () => {
      const components = wrapper.find(DialogTitle);
      expect(components).toHaveLength(1);
      const props = components.at(0).props();

      const expected = {
        children: wrapper.instance().steps[0]
      };
      expect(props.children).toBe(expected.children);
    });
    it("Contains 1 <SwipeableViews/> component with expected props", () => {
      const components = wrapper.find(SwipeableViews);
      expect(components).toHaveLength(1);
      const props = components.at(0).props();

      const expected = {
        axis: "x",
        index: wrapper.state().activeStep,
        enableMouseEvents: true
      };
      expect(props).toMatchObject(expected);
    });
    it("Contains 1 <SelectDeviceTable/> component with expected props", () => {
      const components = wrapper.find(SelectDeviceTable);
      expect(components).toHaveLength(1);
      const props = components.at(0).props();

      const expected = {
        selectedIndex: dummyDeviceIndex,
        setIndex: mockSetDeviceIndex,
        deviceList: dummyDeviceList
      };
      expect(props).toStrictEqual(expected);
    });
    const invalidChannelIndex = -1;
    const validChannelIndex = 0;
    const invalidDeviceIndex = -1;
    const validDeviceIndex = 0;

    describe("when deviceIndex is not set (index == -1)", () => {
      describe("when channelIndex is not set (index == -1)", () => {
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <SelectDeviceSwipeableSteps
              handleClose={mockHandleClose}
              deviceList={dummyDeviceList}
              deviceIndex={invalidDeviceIndex}
              setDeviceIndex={mockSetDeviceIndex}
              channelIndex={invalidChannelIndex}
              setChannelIndex={mockSetChannelIndex}
            />
          );
        });
        it("Contains 0 <SelectChannelTable/> components", () => {
          const components = wrapper.find(SelectChannelTable);
          expect(components).toHaveLength(0);
        });
        it("Contains 0 <StreamDeviceCard/> components", () => {
          const components = wrapper.find(StreamDeviceCard);
          expect(components).toHaveLength(0);
        });
      });
      describe("when channelIndex is set (index != -1)", () => {
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <SelectDeviceSwipeableSteps
              handleClose={mockHandleClose}
              deviceList={dummyDeviceList}
              deviceIndex={invalidDeviceIndex}
              setDeviceIndex={mockSetDeviceIndex}
              channelIndex={validChannelIndex}
              setChannelIndex={mockSetChannelIndex}
            />
          );
        });

        it("Contains 0 <SelectChannelTable/> components", () => {
          const components = wrapper.find(SelectChannelTable);
          expect(components).toHaveLength(0);
        });
        it("Contains 0 <StreamDeviceCard/> components", () => {
          const components = wrapper.find(StreamDeviceCard);
          expect(components).toHaveLength(0);
        });
      });
    });
    describe("when deviceIndex is set (index != -1)", () => {
      describe("when channelIndex is not set (index == -1)", () => {
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <SelectDeviceSwipeableSteps
              handleClose={mockHandleClose}
              deviceList={dummyDeviceList}
              deviceIndex={validDeviceIndex}
              setDeviceIndex={mockSetDeviceIndex}
              channelIndex={invalidChannelIndex}
              setChannelIndex={mockSetChannelIndex}
            />
          );
        });
        it("Contains 1 <SelectChannelTable/> component with expected props", () => {
          const components = wrapper.find(SelectChannelTable);
          expect(components).toHaveLength(1);
          const props = components.at(0).props();

          const expected = {
            selectedIndex: invalidChannelIndex,
            setIndex: mockSetChannelIndex,
            deviceIndex: validDeviceIndex,
            deviceList: dummyDeviceList
          };
          expect(props).toMatchObject(expected);
        });
        it("Contains 0 <StreamDeviceCard/> components", () => {
          const components = wrapper.find(StreamDeviceCard);
          expect(components).toHaveLength(0);
        });
      });
      describe("when channelIndex is set (index != -1)", () => {
        beforeEach(() => {
          wrapper = Enzyme.shallow(
            <SelectDeviceSwipeableSteps
              handleClose={mockHandleClose}
              deviceList={dummyDeviceList}
              deviceIndex={validDeviceIndex}
              setDeviceIndex={mockSetDeviceIndex}
              channelIndex={validChannelIndex}
              setChannelIndex={mockSetChannelIndex}
            />
          );
        });
        it("Contains 1 <SelectChannelTable/> component with expected props", () => {
          const components = wrapper.find(SelectChannelTable);
          expect(components).toHaveLength(1);
          const props = components.at(0).props();

          const expected = {
            selectedIndex: validChannelIndex,
            setIndex: mockSetChannelIndex,
            deviceIndex: validDeviceIndex,
            deviceList: dummyDeviceList
          };
          expect(props).toMatchObject(expected);
        });
        it("Contains 1 <StreamDeviceCard/> component with expected props", () => {
          const components = wrapper.find(StreamDeviceCard);
          expect(components).toHaveLength(1);
          const props = components.at(0).props();

          const expected = {
            title: "Preview",
            device: dummyDeviceList[dummyDeviceIndex],
            channel:
              dummyDeviceList[dummyDeviceIndex].channels[dummyChannelIndex].port
          };
          expect(props).toMatchObject(expected);
        });
      });
    });
    it("Contains 1 <MobileStepper/> component with expected value", () => {
      const components = wrapper.find(MobileStepper);
      expect(components).toHaveLength(1);
      const props = components.at(0).props();

      const expected = {
        steps: 3,
        position: "static",
        variant: "text",
        activeStep: wrapper.state().activeStep,
        nextButton: (
          <StepperNextButton
            disabled={wrapper.instance().disableNext()}
            isLast={wrapper.state().activeStep === 2}
            handleClose={mockHandleClose}
            handleNext={wrapper.instance().handleNext}
          />
        ),
        backButton: (
          <StepperBackButton
            isFirst={wrapper.state().activeStep === 0}
            handleClose={mockHandleClose}
            handleBack={wrapper.instance().handleBack}
          />
        )
      };
      expect(props).toStrictEqual(expected);
    });
  });
  describe("handleNext() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <SelectDeviceSwipeableSteps
          handleClose={mockHandleClose}
          deviceList={dummyDeviceList}
          deviceIndex={dummyDeviceIndex}
          setDeviceIndex={mockSetDeviceIndex}
          channelIndex={dummyChannelIndex}
          setChannelIndex={mockSetChannelIndex}
        />
      );
    });
    it("should increment state.activeStep ", () => {
      const startingState = {
        activeStep: 34
      };
      const expectedState = {
        activeStep: 35
      };

      wrapper.setState(startingState);
      wrapper.instance().handleNext();

      expect(wrapper.state()).toEqual(expectedState);
    });
  });
  describe("handleBack() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <SelectDeviceSwipeableSteps
          handleClose={mockHandleClose}
          deviceList={dummyDeviceList}
          deviceIndex={dummyDeviceIndex}
          setDeviceIndex={mockSetDeviceIndex}
          channelIndex={dummyChannelIndex}
          setChannelIndex={mockSetChannelIndex}
        />
      );
    });
    it("should decrement state.activeStep ", () => {
      const startingState = {
        activeStep: 34
      };
      const expectedState = {
        activeStep: 33
      };

      wrapper.setState(startingState);
      wrapper.instance().handleBack();

      expect(wrapper.state()).toEqual(expectedState);
    });
  });
  describe("getBackButton() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <SelectDeviceSwipeableSteps
          handleClose={mockHandleClose}
          deviceList={dummyDeviceList}
          deviceIndex={dummyDeviceIndex}
          setDeviceIndex={mockSetDeviceIndex}
          channelIndex={dummyChannelIndex}
          setChannelIndex={mockSetChannelIndex}
        />
      );
    });
    it("returns a <StepperBacktButton/> component with expected props", () => {
      const result = wrapper.instance().getBackButton();
      const expected = (
        <StepperBackButton
          isFirst={wrapper.state().activeStep === 0}
          handleClose={mockHandleClose}
          handleBack={wrapper.instance().handleBack}
        />
      );
      expect(result).toStrictEqual(expected);
    });
  });
  describe("getNextButton() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <SelectDeviceSwipeableSteps
          handleClose={mockHandleClose}
          deviceList={dummyDeviceList}
          deviceIndex={dummyDeviceIndex}
          setDeviceIndex={mockSetDeviceIndex}
          channelIndex={dummyChannelIndex}
          setChannelIndex={mockSetChannelIndex}
        />
      );
    });
    it("returns a <StepperNextButton/> component with expected props", () => {
      const result = wrapper.instance().getNextButton();
      const expected = (
        <StepperNextButton
          disabled={wrapper.instance().disableNext()}
          isLast={wrapper.state().activeStep === 2}
          handleClose={mockHandleClose}
          handleNext={wrapper.instance().handleNext}
        />
      );
      expect(result).toStrictEqual(expected);
    });
  });
  describe("disableNext() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(
        <SelectDeviceSwipeableSteps
          handleClose={mockHandleClose}
          deviceList={dummyDeviceList}
          deviceIndex={dummyDeviceIndex}
          setDeviceIndex={mockSetDeviceIndex}
          channelIndex={dummyChannelIndex}
          setChannelIndex={mockSetChannelIndex}
        />
      );
    });
    describe("when state.activeStep is 0 (select Device)", () => {
      it("returns true if deviceIndex is -1 (if device is not selected, Next should be disabled)", () => {
        wrapper.setState({ activeStep: 0 });
        wrapper.setProps({ deviceIndex: -1 });
        const expected = true;
        const result = wrapper.instance().disableNext();

        expect(result).toBe(expected);
      });
      it("returns false if deviceIndex is not -1 (if device is selected, Next should not be disabled)", () => {
        wrapper.setState({ activeStep: 0 });
        wrapper.setProps({ deviceIndex: 1 });
        const expected = false;
        const result = wrapper.instance().disableNext();

        expect(result).toBe(expected);
      });
    });
    describe("when state.activeStep is 1 (select Channel)", () => {
      it("returns true if channelIndex is -1 (if channel is not selected, Next should be disabled)", () => {
        wrapper.setState({ activeStep: 1 });
        wrapper.setProps({ channelIndex: -1 });
        const expected = true;
        const result = wrapper.instance().disableNext();

        expect(result).toBe(expected);
      });
      it("returns false if channelIndex is not -1 (if channel is selected, Next should not be disabled)", () => {
        wrapper.setState({ activeStep: 1 });
        wrapper.setProps({ channelIndex: 2 });
        const expected = false;
        const result = wrapper.instance().disableNext();

        expect(result).toBe(expected);
      });
    });
    describe("when state.activeStep is not 0 or 1", () => {
      it("returns false (should not be disabled)", () => {
        wrapper.setState({ activeStep: 69 });
        wrapper.setProps({ channelIndex: 2 });
        const expected = false;
        const result = wrapper.instance().disableNext();

        expect(result).toBe(expected);
      });
    });
  });
});
