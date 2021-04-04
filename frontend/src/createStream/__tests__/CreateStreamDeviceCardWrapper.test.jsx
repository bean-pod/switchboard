import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect } from "@jest/globals";

import CreateStreamDeviceCardWrapper from "../CreateStreamDeviceCardWrapper";
import CreateStreamCardToggler from "../cards/CreateStreamCardToggler";
import SelectDeviceDialog from "../SelectDeviceDialog/SelectDeviceDialog";
import InputChannelInfo from "../../model/InputChannelInfo";
import DeviceInfo from "../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<CreateStreamDeviceCardWrapper/> class component", ()=>{
    let wrapper;

    const mockOpenDialog = jest.fn();
    const mockRefElement = {
      current: {
        openDialog: mockOpenDialog
      }
    };

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
    const dummyTitle = "some Title";
    const dummyDeviceIndex = 0;
    const dummyChannelIndex = 0;
  
    const mockSetDeviceIndex = jest.fn();
    const mockSetChannelIndex = jest.fn();

    beforeEach(()=>{
        jest.spyOn(React, "createRef").mockImplementation(() => {
            return mockRefElement;
          });

        wrapper = Enzyme.shallow(
        <CreateStreamDeviceCardWrapper
            title={dummyTitle}
            deviceIndex={dummyDeviceIndex}
            channelIndex={dummyChannelIndex}
            deviceList={dummyDeviceList}
            setDeviceIndex={mockSetDeviceIndex}
            setChannelIndex={mockSetChannelIndex}
        />
        )
    })
    describe("render() function returns a component that", ()=>{
        it("Contains 1 <CreateStreamCardToggler/> component with expected props", ()=>{
            const components = wrapper.find(CreateStreamCardToggler);
            expect(components).toHaveLength(1);
            const props = components.at(0).props();
      
            const expected = {
                title: dummyTitle,
                openDialog: wrapper.instance().openDialog,
                deviceIndex: dummyDeviceIndex,
                deviceList: dummyDeviceList,
                channelIndex: dummyChannelIndex
            };

            expect(props).toStrictEqual(expected);
        })
        it("Contains 1 <SelectDeviceDialog/> component with expected props", ()=>{
            const components = wrapper.find(SelectDeviceDialog);
            expect(components).toHaveLength(1);
            const props = components.at(0).props();
      
            const expected = {
                deviceList: dummyDeviceList,
                deviceIndex: dummyDeviceIndex,
                setDeviceIndex: mockSetDeviceIndex,
                channelIndex: dummyChannelIndex,
                setChannelIndex: mockSetChannelIndex,
            };

            expect(props).toStrictEqual(expected);
        })
    });
    describe("openDialog() function", () => {

        it("calls dialogElement.current.openDialog()", () => {
    
        wrapper = Enzyme.shallow(
            <CreateStreamDeviceCardWrapper
                title={dummyTitle}
                deviceIndex={dummyDeviceIndex}
                channelIndex={dummyChannelIndex}
                deviceList={dummyDeviceList}
                setDeviceIndex={mockSetDeviceIndex}
                setChannelIndex={mockSetChannelIndex}
            />
            )
          wrapper.instance().openDialog();
          expect(mockOpenDialog).toBeCalledTimes(1);
        });
      });
})