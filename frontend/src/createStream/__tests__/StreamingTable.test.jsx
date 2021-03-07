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
import { Grid } from "@material-ui/core";
import StreamingTable from "../StreamingTable";

import SelectDevicesTable from "../SelectDevicesTable";
import StreamButton from "../../general/Buttons/StreamButton";

Enzyme.configure({ adapter: new Adapter() });

const DummyData = {
  getSenders() {
    return ["A", "B", "C"];
  },

  getReceivers() {
    return ["X", "Y", "Z"];
  },

  preventDefault() {}
};

describe("<StreamingTable/> class component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamingTable />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("render() function returns a component that", () => {
    it("contains 4 <Grid/> components", () => {
      expect(wrapper.find(Grid)).toHaveLength(4);
    });
    it("contains 2 <SelectDevicesTable/> components", () => {
      expect(wrapper.find(SelectDevicesTable)).toHaveLength(2);
    });
    it("contains 1 <StreamButton/> components", () => {
      expect(wrapper.find(StreamButton)).toHaveLength(1);
    });
  });

  describe("onSenderSelected() function", () => {
    it("should set state.selectedSender and selectedSenderID", () => {
      const mockEvent = {
        target: {
          name: "selectedSenderID",
          value: "Test3"
        }
      };
      const defaultState = {
        senders: [],
        receivers: [],
        selectedSenderID: "",
        selectedReceiverID: ""
      };

      const expected = {
        senders: [],
        receivers: [],
        selectedSenderID: "Test3",
        selectedReceiverID: ""
      };

      wrapper.setState(defaultState);
      // act
      wrapper.instance().onSenderSelected(mockEvent);
      expect(wrapper.state()).toEqual(expected);
    });
  });
  describe("onReceiverSelected() function", () => {
    it("Sets state.selectedReceiverID", () => {
      const mockEvent = {
        target: {
          name: "selectedReceiverID",
          value: "Test6"
        }
      };

      const defaultState = {
        senders: [],
        receivers: [],
        selectedSenderID: "",
        selectedReceiverID: ""
      };
      const expected = {
        senders: [],
        receivers: [],
        selectedSenderID: "",
        selectedReceiverID: "Test6"
      };

      wrapper.setState(defaultState);
      // act
      wrapper.instance().onReceiverSelected(mockEvent);
      expect(wrapper.state()).toEqual(expected);
      expect(wrapper.state()).not.toEqual(defaultState);
    });
  });
  describe("handleSendersChange() function", () => {
    it("Sets state.senders", () => {
      const mockSenders = [null, null];
      const defaultState = {
        senders: [],
        receivers: [],
        selectedSenderID: "",
        selectedReceiverID: ""
      };
      const expected = {
        senders: mockSenders,
        receivers: [],
        selectedSenderID: "",
        selectedReceiverID: ""
      };

      wrapper.setState(defaultState);
      // act
      wrapper.instance().handleSendersChange(mockSenders);
      expect(wrapper.state()).toStrictEqual(expected);
      expect(wrapper.state()).not.toStrictEqual(defaultState);
    });
  });
  describe("handleReceiversChange() function", () => {
    it("Sets state.receivers", () => {
      const mockReceivers = [null, null];
      const defaultState = {
        senders: [],
        receivers: [],
        selectedSenderID: "",
        selectedReceiverID: ""
      };
      const expected = {
        senders: [],
        receivers: mockReceivers,
        selectedSenderID: "",
        selectedReceiverID: ""
      };

      wrapper.setState(defaultState);
      // act
      wrapper.instance().handleReceiversChange(mockReceivers);
      expect(wrapper.state()).toStrictEqual(expected);
      expect(wrapper.state()).not.toStrictEqual(defaultState);
    });
  });
  describe("handleSubmit() function", () => {
    const mockEvent = { preventDefault: jest.fn() };
    describe("should not call StreamAPI.createStream", () => {
      it("if selectedReceiverID & selectedSenderID are not set", () => {
        const state = {
          selectedSenderID: "",
          selectedReceiverID: ""
        };
        wrapper.setState(state);
        wrapper.instance().handleSubmit(mockEvent);
        // TODO: expect(createStream).not.toBeCalled()
      });
      it("if selectedSenderID is not set", () => {
        const state = {
          selectedSenderID: "",
          selectedReceiverID: "SomeID"
        };
        wrapper.setState(state);
        wrapper.instance().handleSubmit(mockEvent);
        // TODO: expect(createStream).not.toBeCalled()
      });
      it("if selectedReceiverID is not set", () => {
        const state = {
          selectedSenderID: "SomeId",
          selectedReceiverID: ""
        };
        wrapper.setState(state);
        wrapper.instance().handleSubmit(mockEvent);
        // TODO: expect(createStream).not.toBeCalled()
      });
    });
    describe("should call StreamApi.createStream", () => {
      it("if selectedReceiverID & selectedSenderID are both set", () => {
        const state = {
          selectedSenderID: "someID",
          selectedReceiverID: "someOtherId"
        };
        wrapper.setState(state);
        wrapper.instance().handleSubmit(mockEvent);
        // TODO: expect(createStream).toBeCalledWith()
      });
    });
  });
});
