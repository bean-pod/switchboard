import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, jest } from "@jest/globals";

import DeleteDeviceDialog from "../DeleteDeviceDialog";
import Dialog from "../../../general/dialog/Dialog";

import * as DeviceApi from "../../../api/DeviceApi";
import DeviceInfo from "../../../model/DeviceInfo";
import * as SnackbarMessage from "../../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

const snackbarSpy = jest.spyOn(SnackbarMessage, "snackbar");
const flushPromises = () => new Promise(setImmediate);

describe("<DeleteDeviceDialog/> class", () => {
  let wrapper;

  const mockOpenDialog = jest.fn();
  const mockCloseDialog = jest.fn();
  const mockRefElement = {
    current: {
      openDialog: mockOpenDialog,
      closeDialog: mockCloseDialog
    }
  };
  const device = new DeviceInfo();
  beforeEach(() => {
    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });
    jest.spyOn(DeviceApi, "deleteDevice").mockImplementation(() => {
      return Promise.resolve();
    });
    wrapper = Enzyme.shallow(<DeleteDeviceDialog device={device} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("render() function", () => {
    it("renders one <Dialog/> Component", () => {
      expect(wrapper.find(Dialog)).toHaveLength(1);
    });
  });
  describe("openDialog() function", () => {
    it("calls the child's openDialog() function", () => {
      wrapper.instance().openDialog();
      expect(mockOpenDialog).toBeCalledTimes(1);
    });
  });
  describe("confirmDelete() function", () => {
    describe("calls DeviceApi with the device's serial number", () => {
      it("and delete is successful, it closes the dialog and displays a success snackbar", async () => {
        DeviceApi.deleteDevice.mockResolvedValueOnce();

        wrapper.instance().confirmDelete();
        expect(mockCloseDialog).toBeCalledTimes(1);
        expect(DeviceApi.deleteDevice).toBeCalledWith(device.serialNumber);

        await flushPromises();

        expect(snackbarSpy).toHaveBeenCalledTimes(1);
        expect(snackbarSpy).toHaveBeenCalledWith(
          "success",
          `Device deleted! (Serial Number: ${device.serialNumber})`,
          "Devices"
        );
      });
      it("and delete fails, it closes the dialog and displays an error snackbar", async () => {
        DeviceApi.deleteDevice.mockRejectedValueOnce();

        wrapper.instance().confirmDelete();
        expect(mockCloseDialog).toBeCalledTimes(1);
        expect(DeviceApi.deleteDevice).toBeCalledWith(device.serialNumber);

        await flushPromises();

        expect(snackbarSpy).toHaveBeenCalledTimes(1);
        expect(snackbarSpy).toHaveBeenCalledWith(
          "error",
          `Could not delete device (Serial Number: ${device.serialNumber})`
        );
      });
    });
  });
});
