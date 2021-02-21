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
import { Box, Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeviceNameDetail from "../DeviceNameDetail";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("axios");

const mockEvent = {
  displayName: "New Name"
};
const mockPutDetails = {
  serialNumber: "1:22:333:4444",
  displayName: mockEvent.displayName
};

const flushPromises = () => new Promise(setImmediate);

describe("DeviceNameDetail", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <DeviceNameDetail
        deviceName="Test Device"
        deviceId={mockPutDetails.serialNumber}
      />
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
      it("Should set the state to editing when clicked", () => {
        wrapper.find("#editBtn").simulate("click");
        expect(wrapper.state("editing")).toBe(true);
      });
    });
  });

  describe("When editing", () => {
    beforeEach(() => {
      // simulate click to put us in editing mode
      wrapper.find("#editBtn").simulate("click");
    });

    it("Should render the correct number of child elements", () => {
      expect(wrapper.state("editing")).toBe(true);
      expect(wrapper.find("form")).toHaveLength(1);
      expect(wrapper.find(Box)).toHaveLength(3);
      expect(wrapper.find(Button)).toHaveLength(2);
      expect(wrapper.find(TextField)).toHaveLength(1);
    });

    describe("Textfield", () => {
      it("Should show the current device name as default text", () => {
        expect(wrapper.state("name")).toBe("Test Device");
      });
      it("Should update the name state on change", () => {
        const nameInput = wrapper.find("#deviceName");
        nameInput.simulate("focus");
        nameInput.simulate("change", {
          target: { value: mockPutDetails.displayName }
        });

        expect(wrapper.state("name")).toBe(mockPutDetails.displayName);
      });
    });

    describe("Cancel Button", () => {
      it("Should set the state to not editing and keep same device name when clicked", () => {
        wrapper.find("#cancelEditBtn").simulate("click");
        expect(wrapper.state("editing")).toBe(false);
        expect(wrapper.find("div.title").text()).toBe("Test Device");
      });
    });

    describe("Confirm Button", () => {
      // mock window location for refresh tests
      const { location } = window;
      const event = {
        preventDefault: jest.fn()
      };
      beforeEach(() => {
        delete window.location;
        window.location = { reload: jest.fn() };
      });
      afterEach(() => {
        window.location = location;
      });

      it("Should call the device API, set state to not editing when clicked, and show new name in title area", async () => {
        // mock axios before clicking confirm
        const axiosPromise = Promise.resolve();
        axios.put.mockImplementationOnce(() => axiosPromise);

        // simulate  changing the name
        const nameInput = wrapper.find("#deviceName");
        nameInput.simulate("focus");
        nameInput.simulate("change", {
          target: { value: mockPutDetails.displayName }
        });

        // click confirm
        wrapper.find(".deviceNameEditForm").simulate("submit", event);

        // check call is correct
        expect(axios.put).toHaveBeenCalledWith(process.env.REACT_APP_DEVICE, {
          serialNumber: mockPutDetails.serialNumber,
          displayName: mockPutDetails.displayName
        });

        // wait for flush
        await flushPromises();

        // finally, check state
        expect(wrapper.state("editing")).toBe(false);

        // check that new name is there
        const title = wrapper.find("div.title").first();
        expect(title.text()).toBe("New Name");
      });
    });
  });
  // not sure about this test since requires i understand promises a bit better LOL
  // describe("After editing", () => {
  //     it("Should display the updated device name", () => {});
  // });
});
