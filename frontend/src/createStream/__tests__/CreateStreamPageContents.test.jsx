import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect } from "@jest/globals";
import DeviceInfo from "../../model/DeviceInfo";
import CreateStreamPageContents from "../CreateStreamPageContents";

Enzyme.configure({ adapter: new Adapter() });

describe("<CreateStreamPageContents/> class component", () => {
  let wrapper;
  describe("render() function", () => {});
  describe("componentDidMount() function", () => {});
  describe("State setting functions", () => {
      beforeEach(()=>{
          wrapper = Enzyme.shallow(<CreateStreamPageContents/>)
      })
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
