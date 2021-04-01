import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  it
} from "@jest/globals";

import DeviceListPageContents from "../DeviceListPageContents";
import DeviceTableTitle from "../DeviceTableTitle";
import DevicesTable from "../DevicesTable";

import * as DeviceApi from "../../api/DeviceApi";
import DeviceInfo from "../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceListPageContents/> class component", () => {
  let wrapper;
  const dummySenders = [new DeviceInfo("Beep")];
  const dummyReceivers = [new DeviceInfo("boop!")];

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("componentDidMount() function", () => {
    it("calls DeviceApi.getSenders() and getReceivers()", () => {
      jest.spyOn(DeviceApi, "getSenders").mockImplementation(() => {
        return dummySenders;
      });
      jest.spyOn(DeviceApi, "getReceivers").mockImplementation(() => {
        return dummyReceivers;
      });
      wrapper = Enzyme.shallow(<DeviceListPageContents />, {
        disableLifecycleMethods: true
      });
      wrapper.instance().componentDidMount();

      expect(DeviceApi.getSenders).toHaveBeenCalledWith(
        wrapper.instance().handleSendersChange
      );
      expect(DeviceApi.getReceivers).toHaveBeenCalledWith(
        wrapper.instance().handleReceiversChange
      );
    });
  });

  describe("getDevices() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<DeviceListPageContents />);
    });
    it("if state.selected == 0, returns and array that combines state.senders and state.receivers ", () => {
      const someState = {
        selected: 0,
        senders: dummySenders,
        receivers: dummyReceivers
      };
      wrapper.setState(someState);
      const result = wrapper.instance().getDevices();

      expect(result).toStrictEqual(
        someState.senders.concat(someState.receivers)
      );
    });
    it("if state.selected == 1, returns state.senders ", () => {
      const someState = {
        selected: 1,
        senders: dummySenders,
        receivers: dummyReceivers
      };
      wrapper.setState(someState);
      const result = wrapper.instance().getDevices();

      expect(result).toStrictEqual(someState.senders);
    });
    it("if state.selected == 2, returns state.receivers ", () => {
      const someState = {
        selected: 2,
        senders: dummySenders,
        receivers: dummyReceivers
      };
      wrapper.setState(someState);
      const result = wrapper.instance().getDevices();

      expect(result).toStrictEqual(someState.receivers);
    });
  });
  describe("getTitle() function", () => {
    it("returns a <DeviceTableTitle/> component with expected props", () => {
      wrapper = Enzyme.shallow(<DeviceListPageContents />);
      const expected = {
        index: wrapper.state().selected,
        handleChange: wrapper.instance().handleChange
      };
      const wrap = Enzyme.shallow(wrapper.instance().getTitle());

    //   expect(wrapper.matchesElement(<DeviceTableTitle index={expected.index} handleChange={expected.handleChange}/>)).toBe(true);

      const props = wrap.instance().props;
      expect(props.index).toBe(expected.index);
      expect(props.handleChange).toStrictEqual(expected.handleChange);
    });
  });
  describe("render() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<DeviceListPageContents />);
    });
    describe("returns a component that", () => {
      it("Contains 1 <DevicesTable/> component with expected props", () => {
        const someState = {
            selected: 0,
            senders: dummySenders,
            receivers: dummyReceivers
          };
        wrapper.setState(someState);
        
        const component = wrapper.find(DevicesTable);
        expect(component).toHaveLength(1);
        const expected = {
          devices: dummySenders.concat(dummyReceivers),
          title: (
            <DeviceTableTitle
              index={0}
              handleChange={wrapper.instance().handleChange}
            />
          )
        };
        const props = component.at(0).props();
        expect(props.devices).toStrictEqual(expected.devices);
        expect(props.title).toStrictEqual(expected.title);
      });
    });
  });
});
