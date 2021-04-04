import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect } from "@jest/globals";
import { Button, Grid } from "@material-ui/core";
import { Forward } from "@material-ui/icons";

import CreateStreamPageContents from "../CreateStreamPageContents";

import DeviceInfo from "../../model/DeviceInfo";
import CreateStreamDeviceCardWrapper from "../CreateStreamDeviceCardWrapper";

import * as DeviceApi from "../../api/DeviceApi";

Enzyme.configure({ adapter: new Adapter() });

describe("<CreateStreamPageContents/> class component", () => {
  let wrapper;
  describe("render() function returns a component that", () => {
    beforeEach(() => {
        wrapper = Enzyme.shallow(<CreateStreamPageContents />);
      });
    it("Contains 5 <Grid/> Components", ()=>{
        const grids = wrapper.find(Grid);
        expect(grids).toHaveLength(5);
    })
    it("<Grid/> 0 has expected props", ()=>{
        const grids = wrapper.find(Grid);
        const props = grids.at(0).props();
        const expected = {
            container: true,
            justify: "center",
            alignItems: "stretch",
            direction: "row",
            spacing: 3
        }
        expect(props).toMatchObject(expected);
    })
    it("<Grid/> 1 has expected props", ()=>{
        const grids = wrapper.find(Grid);
        const props = grids.at(1).props();
        const expected = {
            item: true,
            xs: 5,
            style:{
                margin: "auto"
            }
        }
        expect(props).toMatchObject(expected);
    })
    it("<Grid/> 2 has expected props", ()=>{
        const grids = wrapper.find(Grid);
        const props = grids.at(2).props();
        const expected = {
            item: true,
            xs: 2,
            style:{
                margin: "auto",
                textAlign: "center"
            }
        }
        expect(props).toMatchObject(expected);
    })
    it("<Grid/> 3 has expected props", ()=>{
        const grids = wrapper.find(Grid);
        const props = grids.at(3).props();
        const expected = {
            item: true,
            xs: 5,
            style:{
                margin: "auto"
            }
        }
        expect(props).toMatchObject(expected);
    })
    it("<Grid/> 4 has expected props", ()=>{
        const grids = wrapper.find(Grid);
        const props = grids.at(4).props();
        const expected = {
            item: true,
            xs: 2
        }
        expect(props).toMatchObject(expected);
    })
    it("Contains 2 CreateStreamDeviceCardWrapper/> Components", ()=>{
        const CSDwrappers = wrapper.find(CreateStreamDeviceCardWrapper);
        expect(CSDwrappers).toHaveLength(2);
    })
    it("<CreateStreamDeviceCardWrapper/> 0 has expected props", ()=>{
        const CSDWrappers = wrapper.find(CreateStreamDeviceCardWrapper);
        const props = CSDWrappers.at(0).props();
        const expected = {
            title: "Sender",
            deviceList: wrapper.state().senders,
            deviceIndex: wrapper.state().senderDeviceIndex,
            setDeviceIndex: wrapper.instance().setSenderDeviceIndex,
            channelIndex: wrapper.state().senderChannelIndex,
            setChannelIndex: wrapper.instance().setSenderChannelIndex,
        }
        expect(props).toMatchObject(expected);
    })
    it("<CreateStreamDeviceCardWrapper/> 1 has expected props", ()=>{
        const CSDWrappers = wrapper.find(CreateStreamDeviceCardWrapper);
        const props = CSDWrappers.at(1).props();
        const expected = {
            title: "Receiver",
            deviceList: wrapper.state().receivers,
            deviceIndex: wrapper.state().receiverDeviceIndex,
            setDeviceIndex: wrapper.instance().setReceiverDeviceIndex,
            channelIndex: wrapper.state().receiverChannelIndex,
            setChannelIndex: wrapper.instance().setReceiverChannelIndex,
        }
        expect(props).toMatchObject(expected);
    })
    it("Contains 1 <Forward/> component with expected props", ()=>{
        const components = wrapper.find(Forward);
        expect(components).toHaveLength(1);
        
        const props = components.at(0).props();
        const expected = {
            style:{fontSize: 100}
        }
        expect(props).toMatchObject(expected);
    })
    it("Contains 1 <Button/> component with expected props", ()=>{
        const components = wrapper.find(Button);
        expect(components).toHaveLength(1);

        const props = components.at(0).props();
        const expected = {
            variant: "contained",
            color: "primary",
            onClick: wrapper.instance().createStream,
            children: "Create Stream"
        }
        expect(props).toMatchObject(expected);
    })
  });
  describe("componentDidMount() function", () => {
    it("calls DeviceApi.getSenders() and getReceivers()", () => {
        const dummySenders = [new DeviceInfo("Beep")];
        const dummyReceivers = [new DeviceInfo("boop!")];
      
      jest.spyOn(DeviceApi, "getSenders").mockImplementation(() => {
        return dummySenders;
      });
      jest.spyOn(DeviceApi, "getReceivers").mockImplementation(() => {
        return dummyReceivers;
      });
      wrapper = Enzyme.shallow(<CreateStreamPageContents />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().componentDidMount();

      expect(DeviceApi.getSenders).toHaveBeenCalledWith(
        wrapper.instance().setSenders
      );
      expect(DeviceApi.getReceivers).toHaveBeenCalledWith(
        wrapper.instance().setReceivers
      );
    });
  });
  describe("State setting functions", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<CreateStreamPageContents />);
    });
    it("setSenders() function should set the state", () => {
      const startingState = {
        senders: [],
        receivers: [],
        senderDeviceIndex: -1,
        senderChannelIndex: -1,
        receiverDeviceIndex: -1,
        receiverChannelIndex: -1
      };
      const someSenders = [new DeviceInfo("s", "lc", "f", "d", "someName")];
      const expectedState = {
        senders: someSenders
      };

      wrapper.setState(startingState);
      wrapper.instance().setSenders(someSenders);

      expect(wrapper.state()).toMatchObject(expectedState);
    });
    it("setReceivers() function should set the state", () => {
      const startingState = {
        senders: [],
        receivers: [],
        senderDeviceIndex: -1,
        senderChannelIndex: -1,
        receiverDeviceIndex: -1,
        receiverChannelIndex: -1
      };
      const someReceivers = [new DeviceInfo("s", "lc", "f", "d", "someName")];
      const expectedState = {
        receivers: someReceivers
      };

      wrapper.setState(startingState);
      wrapper.instance().setReceivers(someReceivers);

      expect(wrapper.state()).toMatchObject(expectedState);
    });
    it("setSenderDeviceIndex() function should set the state", () => {
      const startingState = {
        senders: [],
        receivers: [],
        senderDeviceIndex: -1,
        senderChannelIndex: -1,
        receiverDeviceIndex: -1,
        receiverChannelIndex: -1
      };
      const someIndex = 88;
      const expectedState = {
        senderDeviceIndex: someIndex
      };

      wrapper.setState(startingState);
      wrapper.instance().setSenderDeviceIndex(someIndex);

      expect(wrapper.state()).toMatchObject(expectedState);
    });
    it("setReceiverDeviceIndex() function should set the state", () => {
      const startingState = {
        senders: [],
        receivers: [],
        senderDeviceIndex: -1,
        senderChannelIndex: -1,
        receiverDeviceIndex: -1,
        receiverChannelIndex: -1
      };
      const someIndex = 88;
      const expectedState = {
        receiverDeviceIndex: someIndex
      };

      wrapper.setState(startingState);
      wrapper.instance().setReceiverDeviceIndex(someIndex);

      expect(wrapper.state()).toMatchObject(expectedState);
    });
    it("setSenderChannelIndex() function should set the state", () => {
      const startingState = {
        senders: [],
        receivers: [],
        senderDeviceIndex: -1,
        senderChannelIndex: -1,
        receiverDeviceIndex: -1,
        receiverChannelIndex: -1
      };
      const someIndex = 88;
      const expectedState = {
        senderChannelIndex: someIndex
      };

      wrapper.setState(startingState);
      wrapper.instance().setSenderChannelIndex(someIndex);

      expect(wrapper.state()).toMatchObject(expectedState);
    });
    it("setReceiverChannelIndex() function should set the state", () => {
      const startingState = {
        senders: [],
        receivers: [],
        senderDeviceIndex: -1,
        senderChannelIndex: -1,
        receiverDeviceIndex: -1,
        receiverChannelIndex: -1
      };
      const someIndex = 88;
      const expectedState = {
        receiverChannelIndex: someIndex
      };

      wrapper.setState(startingState);
      wrapper.instance().setReceiverChannelIndex(someIndex);

      expect(wrapper.state()).toMatchObject(expectedState);
    });
  });
  describe("createStream() function", () => {});
});
