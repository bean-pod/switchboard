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

import SelectDevicesTable from "../SelectDevicesTable";
import StreamButton from "../../general/Buttons/StreamButton";

import * as StreamApi from "../../api/StreamApi";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");
const flushPromises = () => new Promise(setImmediate);

describe("<StreamingTable/> class component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<StreamingTable />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
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

      wrapper.setState(defaultState);
      // act
      wrapper.instance().handleReceiversChange(mockReceivers);
      expect(wrapper.state()).toStrictEqual(expected);
    });
  });
  describe("handleSubmit() function", () => {
    const mockEvent = { preventDefault: jest.fn() };
    beforeEach(() => {
      jest.spyOn(StreamApi, "createStream").mockImplementation(() => {});
    });
    describe("should not call StreamAPI.createStream", () => {
      it("if selectedReceiverID & selectedSenderID are not set", () => {
        const state = {
          selectedSenderID: "",
          selectedReceiverID: ""
        };
        wrapper.setState(state);
        wrapper.instance().handleSubmit(mockEvent);
        expect(StreamApi.createStream).not.toBeCalled();
      });
      it("if selectedSenderID is not set", () => {
        const state = {
          selectedSenderID: "",
          selectedReceiverID: "SomeID"
        };
        wrapper.setState(state);
        wrapper.instance().handleSubmit(mockEvent);
        expect(StreamApi.createStream).not.toBeCalled();
      });
      it("if selectedReceiverID is not set", () => {
        const state = {
          selectedSenderID: "SomeId",
          selectedReceiverID: ""
        };
        wrapper.setState(state);
        wrapper.instance().handleSubmit(mockEvent);
        expect(StreamApi.createStream).not.toBeCalled();
      });
    });
    describe("should call StreamApi.createStream", () => {
      describe("if selectedReceiverID & selectedSenderID are both set", () => {
        it("and the post resolves, a success snackbar should appear", async () => {
          const state = {
            selectedSenderID: "someID",
            selectedReceiverID: "someOtherId"
          };
          wrapper.setState(state);

          StreamApi.createStream.mockResolvedValueOnce();

          wrapper.instance().handleSubmit(mockEvent);
          expect(StreamApi.createStream).toBeCalledWith(
            state.selectedReceiverID,
            state.selectedSenderID
          );

          // Wait for axios promise to finish
          await flushPromises();

          expect(snackbarSpy).toHaveBeenCalledTimes(1);
          expect(snackbarSpy).toHaveBeenCalledWith(
            "success",
            "Successfully created stream!"
          );
        });
        it("and the post rejects, an error snackbar should appear", async () => {
          const state = {
            selectedSenderID: "someID",
            selectedReceiverID: "someOtherId"
          };
          wrapper.setState(state);

          StreamApi.createStream.mockRejectedValueOnce();

          wrapper.instance().handleSubmit(mockEvent);
          expect(StreamApi.createStream).toBeCalledWith(
            state.selectedReceiverID,
            state.selectedSenderID
          );

          // Wait for axios promise to finish
          await flushPromises();

          expect(snackbarSpy).toHaveBeenCalledTimes(1);
          expect(snackbarSpy).toHaveBeenCalledWith(
            "error",
            "Failed to create stream"
          );
        });
      });
    });
  });
});
