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
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("axios");
jest.spyOn(global.console, "log");

const snackbar = jest.fn();
jest.spyOn(SnackbarMessage, "snackbar").mockImplementation(() => snackbar(status, message, pathname));

const flushPromises = () => new Promise(setImmediate);

const DummyData = {
  getSenders() {
    return ["A", "B", "C"];
  },

  getReceivers() {
    return ["X", "Y", "Z"];
  },

  preventDefault() {}
};

describe("<StreamingTable/>", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamingTable dataSource={DummyData} />);
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
      wrapper.instance().handleSubmit(DummyData);
      expect(axios.post).not.toHaveBeenCalled();
    });
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

      wrapper.instance().handleSubmit(DummyData);
      expect(axios.post).not.toHaveBeenCalled();
    });
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
      wrapper.instance().handleSubmit(DummyData);
      expect(axios.post).not.toHaveBeenCalled();
    });
    it("should call axios.post if a sender and a receiver have been selected and display a snackbar", async () => {
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
      axios.post.mockImplementationOnce(
        () => Promise.resolve(data),
        snackbar(
          "success",
          `Stream successful between Sender ${expected.outputChannelId} and Receiver ${expected.inputChannelId}!`,
          "Streaming"
        )
      );
      wrapper.instance().onSenderSelected(mockSender);
      wrapper.instance().onReceiverSelected(mockReceiver);

      wrapper.instance().handleSubmit(DummyData);

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/stream",
        expected
      );

      await flushPromises();

      // display snackbar
      expect(snackbar).toHaveBeenCalledTimes(1);
      expect(snackbar).toHaveBeenCalledWith(
        "success",
        `Stream successful between Sender ${expected.outputChannelId} and Receiver ${expected.inputChannelId}!`,
        "Streaming"
      );
    });
    it("if the axios.post is rejected, an error snackbar will be displayed", async () => {
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

      axios.post.mockImplementationOnce(
        () => Promise.reject(data),
        snackbar(
          "error",
          `Stream failed between Sender ${expected.outputChannelId} and Receiver ${expected.inputChannelId}`,
          "Streaming"
        )
      );
      wrapper.instance().onSenderSelected(mockSender);
      wrapper.instance().onReceiverSelected(mockReceiver);
  
      wrapper.instance().handleSubmit(DummyData);
  
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/stream",
        expected
      );
  
      await flushPromises();
  
      // display snackbar
      expect(snackbar).toHaveBeenCalledTimes(1);
      expect(snackbar).toHaveBeenCalledWith(
        "error",
        `Stream failed between Sender ${expected.outputChannelId} and Receiver ${expected.inputChannelId}`,
        "Streaming"
      );
    });
  });
});
