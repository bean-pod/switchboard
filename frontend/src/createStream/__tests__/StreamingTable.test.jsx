import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest
} from "@jest/globals";
import { Grid } from "@material-ui/core";
import StreamingTable from "../StreamingTable";
import * as authenticationUtil from "../../api/AuthenticationUtil";

import SelectDevicesTable from "../SelectDevicesTable";
import StreamButton from "../../general/Buttons/StreamButton";

import * as StreamApi from "../../api/StreamApi";

Enzyme.configure({ adapter: new Adapter() });

const authorizationHeader = {
  headers: {
    Authorization: "Bearer the_token"
  }
};

describe("<StreamingTable/>", () => {
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
      axios.post.mockImplementationOnce(async () => Promise.resolve(data));

      wrapper.setState(defaultState);
      // act
      wrapper.instance().handleReceiversChange(mockReceivers);
      expect(wrapper.state()).toStrictEqual(expected);
    });
    it("should call StreamApi.createStream if a sender and a receiver have been selected", () => {
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
      authenticationUtil.getAuthorizationHeader = jest
        .fn()
        .mockReturnValue(authorizationHeader);

      wrapper.instance().onSenderSelected(mockSender);
      wrapper.instance().onReceiverSelected(mockReceiver);

      wrapper.instance().handleSubmit(DummyData);

      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8080/stream",
        expected,
        authorizationHeader
      );
    });
  });
});
