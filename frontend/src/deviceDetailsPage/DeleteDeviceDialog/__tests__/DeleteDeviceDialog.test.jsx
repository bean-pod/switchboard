import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, jest } from "@jest/globals";

import DeleteDeviceDialog from "../DeleteDeviceDialog";
import Dialog from "../../../general/dialog/Dialog";

import * as DeviceApi from "../../../api/DeviceApi";
import DeviceInfo from "../../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeleteDeviceDialog/> class", () => {
  let wrapper;

  const mockPush = jest.fn();
  const dummyHistory = {
    push: mockPush
  };
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
    wrapper = Enzyme.shallow(
      <DeleteDeviceDialog device={device} history={dummyHistory} />
    );
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
    it("calls DeviceApi with the device's serial number", () => {
      wrapper.instance().confirmDelete();
      expect(DeviceApi.deleteDevice).toBeCalledWith(device.serialNumber);
    });
  });
  describe("afterDelete() function", () => {
    it("closes the dialog and redirects to the Devices page", () => {
      const expectedPushArg = "/Devices";

      wrapper.instance().afterDelete();
      wrapper.instance().forceUpdate();

      expect(mockCloseDialog).toBeCalledTimes(1);
      expect(mockPush).toBeCalledTimes(1);
      expect(mockPush).toBeCalledWith(expectedPushArg);
    });
  });
});
