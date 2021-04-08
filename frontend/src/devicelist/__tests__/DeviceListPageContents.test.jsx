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
import * as SnackbarMessage from "../../general/SnackbarMessage";
import DeviceInfo from "../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");

describe("<DeviceListPageContents/> class component", () => {
  let wrapper;
  const dummySenders = [new DeviceInfo("Beep")];
  const dummyReceivers = [new DeviceInfo("boop!")];

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("componentDidMount() function", () => {
    beforeEach(() => {
      wrapper = Enzyme.shallow(<DeviceListPageContents />, {
        disableLifecycleMethods: true
      });
    });
    it("calls DeviceApi.getSenders() and getReceivers()", () => {
      jest.spyOn(DeviceApi, "getSenders").mockImplementation(() => {
        return Promise.resolve(dummySenders);
      });
      jest.spyOn(DeviceApi, "getReceivers").mockImplementation(() => {
        return Promise.resolve(dummyReceivers);
      });

      wrapper.instance().componentDidMount();

      expect(DeviceApi.getSenders).toHaveBeenCalled();
      expect(DeviceApi.getReceivers).toHaveBeenCalled();
    });
    it("if getSenders() rejects, an error snackbar with the caught error message is displayed", async () => {
      const returnedError = {
        message: "test"
      };
      jest.spyOn(DeviceApi, "getSenders").mockRejectedValue(returnedError);
      jest.spyOn(DeviceApi, "getReceivers").mockImplementation(() => {
        return Promise.resolve(dummyReceivers);
      });

      wrapper.instance().componentDidMount();

      await new Promise(setImmediate);

      expect(DeviceApi.getReceivers).toHaveBeenCalled();

      expect(snackbarSpy).toHaveBeenCalledWith(
        "error",
        `Failed to fetch senders: ${returnedError.message}`
      );
    });
    it("if getReceivers() rejects, an error snackbar with the caught error message is displayed", async () => {
      const returnedError = {
        message: "test"
      };
      jest.spyOn(DeviceApi, "getSenders").mockImplementation(() => {
        return Promise.resolve(dummySenders);
      });
      jest.spyOn(DeviceApi, "getReceivers").mockRejectedValue(returnedError);

      wrapper.instance().componentDidMount();

      await new Promise(setImmediate);

      expect(DeviceApi.getSenders).toHaveBeenCalled();

      expect(snackbarSpy).toHaveBeenCalledWith(
        "error",
        `Failed to fetch receivers: ${returnedError.message}`
      );
    });
    it("if getReceivers() and getSenders() rejects, two error snackbars with the caught error message are displayed", async () => {
      const returnedError = {
        message: "test"
      };

      jest.spyOn(DeviceApi, "getSenders").mockRejectedValue(returnedError);
      jest.spyOn(DeviceApi, "getReceivers").mockRejectedValue(returnedError);

      wrapper.instance().componentDidMount();

      await new Promise(setImmediate);

      expect(snackbarSpy).toHaveBeenCalledTimes(2);
      expect(snackbarSpy).toHaveBeenCalledWith(
        "error",
        `Failed to fetch senders: ${returnedError.message}`
      );
      expect(snackbarSpy).toHaveBeenCalledWith(
        "error",
        `Failed to fetch receivers: ${returnedError.message}`
      );
    });
  });

  describe("<DeviceListPageContents/> class functions", () => {
    beforeEach(() => {
      jest.spyOn(DeviceApi, "getSenders").mockImplementation(() => {
        return Promise.resolve(dummySenders);
      });
      jest.spyOn(DeviceApi, "getReceivers").mockImplementation(() => {
        return Promise.resolve(dummyReceivers);
      });
      wrapper = Enzyme.shallow(<DeviceListPageContents />);
    });

    describe("handleChange() function", () => {
      it("should set the state", () => {
        const startingState = {
          selected: 0,
          senders: [],
          receivers: []
        };

        const expectedValue = 5;

        wrapper.setState(startingState);

        wrapper.instance().handleChange(expectedValue);
        expect(wrapper.state().selected).toStrictEqual(expectedValue);
      });
    });

    describe("handleSendersChange() function", () => {
      it("should set the state", () => {
        const startingState = {
          selected: 0,
          senders: [],
          receivers: []
        };

        const expectedValue = [new DeviceInfo("thing!")];

        wrapper.setState(startingState);

        wrapper.instance().handleSendersChange(expectedValue);
        expect(wrapper.state().senders).toStrictEqual(expectedValue);
      });
    });

    describe("handleReceiversChange() function", () => {
      it("should set the state", () => {
        const startingState = {
          selected: 0,
          senders: [],
          receivers: []
        };

        const expectedValue = [new DeviceInfo("thing!")];

        wrapper.setState(startingState);

        wrapper.instance().handleReceiversChange(expectedValue);
        expect(wrapper.state().receivers).toStrictEqual(expectedValue);
      });
    });

    describe("getDevices() function", () => {
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
        const deviceTableTitle = wrapper.instance().getTitle();
        expect(deviceTableTitle.type).toEqual(DeviceTableTitle);

        const wrap = Enzyme.shallow(deviceTableTitle);

        const { props } = wrap.instance();
        expect(props.index).toBe(expected.index);
        expect(props.handleChange).toStrictEqual(expected.handleChange);
      });
    });

    describe("render() function", () => {
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
});
