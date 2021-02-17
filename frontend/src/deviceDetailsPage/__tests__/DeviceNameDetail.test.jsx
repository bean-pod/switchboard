import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme from "enzyme";
import {
  describe,
  afterEach,
  beforeEach,
  expect,
  jest,
  it
} from "@jest/globals";
import axios from "axios";
import { Box, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeviceNameDetail from "../DeviceNameDetail";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

const mockPutDetails = {
  serialNumber: "1",
  displayName: "New Name"
};
const mockHistoryGo = jest.fn();
const mockHistory = {
  go: mockHistoryGo
};

jest.mock("react-router-dom", () => ({
  useHistory: () => {
    return mockHistory;
  }
}));

const flushPromises = () => new Promise(setImmediate);

describe("DeviceNameDetail", () => {
  let wrapper;

  // let editing;
  const setEditing = jest.fn();
  // const setName = jest.fn();
  const handleClick = jest.spyOn(React, "useState");
  // const handleTextChange = jest.spyOn(React, "useState");

  beforeEach(() => {
    handleClick.mockImplementation((editing) => [editing, setEditing]);
    // handleTextChange.mockImplementation((name) => [name, setName]);

    wrapper = Enzyme.shallow(
      <DeviceNameDetail deviceName="Test Device" deviceId="1:22:333:4444" />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When not editing", () => {
    it("Should render the correct number of child elements", () => {
      expect(wrapper.find(Box)).toHaveLength(2);
      expect(wrapper.find("div")).toHaveLength(2);
      expect(wrapper.find(Button)).toHaveLength(1);
      expect(wrapper.find(EditIcon)).toHaveLength(1);

      expect(wrapper.find("div.title")).toHaveLength(1);
      expect(wrapper.find("div.title").text()).toBe("Test Device");
    });
    describe("Edit button", () => {
      it("Should set the state to editing", () => {
        wrapper.find("#editBtn").simulate("click");
        expect(setEditing).toHaveBeenCalledWith(true);
        expect(wrapper.find("form")).toHaveLength(1);
      });
    });
  });

  describe("When editing", () => {
    beforeEach(() => {
      // simulate click to put us in editing mode
      wrapper.find("#editBtn").simulate("click");
      wrapper.update();
    });

    it.only("Should render the correct number of child elements", () => {
      expect(setEditing).toHaveBeenCalledWith(true);
      expect(wrapper.find("form")).toHaveLength(1);
      expect(wrapper.find(Box)).toHaveLength(3);
      expect(wrapper.find(Button)).toHaveLength(2);
      expect(wrapper.find(TextField)).toHaveLength(1);
    });

    describe("Textfield", () => {
      it("Should show the current device name as default text", () => {
        expect(wrapper.find(Textfield).text()).toBe("Test Device");
      });
    });

    describe("Cancel Button", () => {
      it("Should set the state to not editing and keep same device name", () => {
        wrapper.find("#cancelEditBtn").simulate("click");
        expect(setEditing).toHaveBeenCalledWith(false);
        expect(wrapper.find("div.title").text()).toBe("Test Device");
      });
    });

    describe("Confirm Button", () => {
      it("Should call the device API, refresh page, and set state to not editing", async () => {
        // mock axios before clicking confirm
        const axiosPromise = Promise.resolve();
        axios.put.mockImplementationOnce(() => axiosPromise);

        // click confirm
        wrapper.find("#confirmEditBtn").simulate("click");

        // check call is correct
        expect(axios.put).toHaveBeenCalledWith(
          mockPutDetails.serialNumber,
          mockPutDetails.displayName
        );

        // wait for flush
        await flushPromises();

        // check redirect
        expect(mockHistoryGo).toHaveBeenCalledWith(0);

        // finally, check state
        expect(setEditing).tohave.toHaveBeenCalledWith(false);
      });
    });
  });
  // not sure about this test since requires i understand promises a bit better LOL
  // describe("After editing", () => {
  //     it("Should display the updated device name", () => {});
  // });
});
