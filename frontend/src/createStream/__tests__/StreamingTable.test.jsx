import React from "react";
import axios from "axios";
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
import StreamingTable from "../StreamingTable";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");
jest.spyOn(global.console, "log");

class DummyData {
  getSenders() {
    return ["A", "B", "C"];
  }

  getReceivers() {
    return ["X", "Y", "Z"];
  }

  preventDefault() {}
}

describe("<StreamingTable/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamingTable dataSource={new DummyData()} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("onSenderSelected", () => {
    it("should call setState and set selectedSender and selectedSenderID", () => {
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

      expect(wrapper.state()).toEqual(defaultState);
      // act
      wrapper.instance().onSenderSelected(mockEvent);
      expect(wrapper.state()).toEqual(expected);
    });
  });

  describe("onReceiverSelected", () => {
    it("should call setState and set selectedReceiver and selectedReceiverID", () => {
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

      expect(wrapper.state()).toEqual(defaultState);
      // act
      wrapper.instance().onReceiverSelected(mockEvent);
      expect(wrapper.state()).toEqual(expected);
    });
  });

  describe("handleSubmit", () => {
    it("should do nothing if no receiver or sender has been selected", () => {
      const data = {
        data: "test"
      };
      axios.post.mockImplementationOnce(() => Promise.resolve(data));
      // act
      wrapper.instance().handleSubmit(new DummyData());
      expect(axios.post).not.toHaveBeenCalled();
    }),
      it("should do nothing if a receiver but no sender has been selected", () => {
        const mockReceiver = {
          target: {
            name: "selectedReceiverID",
            value: "Test6"
          }
        };

        const data = {
          data: "test"
        };
        axios.post.mockImplementationOnce(() => Promise.resolve(data));

        // act
        wrapper.instance().onReceiverSelected(mockReceiver);

        wrapper.instance().handleSubmit(new DummyData());
        expect(axios.post).not.toHaveBeenCalled();
      }),
      it("should do nothing if no receiver but a sender has been selected", () => {
        const mockSender = {
          target: {
            name: "selectedSenderID",
            value: "Test3"
          }
        };
        const data = {
          data: "test"
        };
        axios.post.mockImplementationOnce(() => Promise.resolve(data));

        // act
        wrapper.instance().onSenderSelected(mockSender);
        wrapper.instance().handleSubmit(new DummyData());
        expect(axios.post).not.toHaveBeenCalled();
      }),
      it("should call axios.post if a sender and a receiver have been selected", () => {
        const mockReceiver = {
          target: {
            name: "selectedReceiverID",
            value: "Test6"
          }
        };
        const mockSender = {
          target: {
            name: "selectedSenderID",
            value: "Test3"
          }
        };

        const expected = {
          outputChannelId: "Test3",
          inputChannelId: "Test6"
        };

        const data = {
          data: "test"
        };
        axios.post.mockImplementationOnce(() => Promise.resolve(data));

        wrapper.instance().onSenderSelected(mockSender);
        wrapper.instance().onReceiverSelected(mockReceiver);

        wrapper.instance().handleSubmit(new DummyData());

        expect(axios.post).toHaveBeenCalledWith(
          "http://localhost:8080/stream",
          expected
        );

        setTimeout(() => {
          expect(console.log).toHaveBeenCalledWith("Success. Stream Started.");
        }, 0);
      });
  });
});
