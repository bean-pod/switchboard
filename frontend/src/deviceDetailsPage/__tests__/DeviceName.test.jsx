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
import DeviceName from "../DeviceName";
import EditableName from "../EditableName";
import StaticName from "../StaticName";

import * as DeviceApi from "../../api/DeviceApi";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/DeviceApi");
jest.spyOn(DeviceApi, "updateDeviceName");

let stat;
let message;
let pathname;
const snackbar = jest.fn();
jest
  .spyOn(SnackbarMessage, "snackbar")
  .mockImplementation(() => snackbar(stat, message, pathname));

describe("<DeviceName/> component", () => {
  let wrapper;
  const mockDevice = {
    name: "Mock Device",
    id: "Serial Number"
  };
  const defaultState = {
    name: mockDevice.name,
    editing: false
  };
  const editingState = {
    name: mockDevice.name,
    editing: true
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <DeviceName deviceName={mockDevice.name} deviceId={mockDevice.id} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("render() function returns a component that ", () => {
    describe("When state.editing is false", () => {
      it("Contains one <StaticName/> component with expected props", () => {
        expect(wrapper.state()).toEqual(defaultState);

        const staticName = wrapper.find(StaticName);
        expect(staticName).toHaveLength(1);

        const props = staticName.first().props();
        expect(props.deviceName).toEqual(mockDevice.name);
        expect(props.startEditing).toEqual(wrapper.instance().startEdit);
      });
    });

    describe("When state.editing is true", () => {
      it("Contains one <EditableName/> component with expected props", () => {
        wrapper.setState(editingState);

        const editableName = wrapper.find(EditableName);
        expect(editableName).toHaveLength(1);

        const props = editableName.first().props();
        expect(props.deviceName).toEqual(mockDevice.name);
        expect(props.confirmEditing).toEqual(wrapper.instance().confirmEditing);
        expect(props.setName).toEqual(wrapper.instance().setName);
        expect(props.cancelEditing).toEqual(wrapper.instance().cancelEditing);
      });
    });
  });

  it("startEdit() function sets the state to editing: true", () => {
    wrapper.instance().startEdit();
    expect(wrapper.state()).toEqual(editingState);
  });

  describe("cancelEditing() function", () => {
    beforeEach(() => {
      wrapper.setState(editingState);
    });

    it("sets the state to editing: false", () => {
      wrapper.instance().cancelEditing();
      expect(wrapper.state()).toEqual(defaultState);
    });
  });

  it("setName() function sets the state.name to passed value", () => {
    const newName = "New Name";
    wrapper.instance().setName(newName);
    expect(wrapper.state()).toEqual({
      name: newName,
      editing: false
    });
  });

  describe("confirmEditing() function", () => {
    beforeEach(() => {
      wrapper.setState(editingState);
    });

    describe("When updating name succeeds", () => {
      it("Calls updateDeviceName and contains <StaticName/> with the new name", () => {
        const newName = "New Name";
        wrapper.instance().setName(newName);

        DeviceApi.updateDeviceName.mockResolvedValue(
          snackbar(
            "success",
            `Device successfully renamed to ${newName}`,
            "Devices"
          )
        );

        const editEvent = {
          preventDefault: jest.fn()
        };
        wrapper.instance().confirmEditing(editEvent);

        expect(DeviceApi.updateDeviceName).toHaveBeenCalledWith(
          mockDevice.id,
          newName
        );

        const staticName = wrapper.find(StaticName);
        expect(staticName).toHaveLength(1);
        const props = staticName.first().props();
        expect(props.deviceName).toEqual(newName);

        expect(snackbar).toHaveBeenCalledTimes(1);
        expect(snackbar).toHaveBeenCalledWith(
          "success",
          `Device successfully renamed to ${newName}`,
          "Devices"
        );
      });
    });

    describe("When updating name fails", () => {
      it("Calls updateDeviceName and contains <StaticName/> with the old name", async () => {
        const newName = "New Name";
        wrapper.instance().setName(newName);

        DeviceApi.updateDeviceName.mockRejectedValue(
          snackbar("error", `Failed to rename device`)
        );

        const editEvent = {
          preventDefault: jest.fn()
        };
        wrapper.instance().confirmEditing(editEvent);
        const flushPromises = () => new Promise(setImmediate);
        await flushPromises();

        expect(DeviceApi.updateDeviceName).toHaveBeenCalledWith(
          mockDevice.id,
          newName
        );

        const staticName = wrapper.find(StaticName);
        expect(staticName).toHaveLength(1);
        const props = staticName.first().props();
        expect(props.deviceName).toEqual(mockDevice.name);

        expect(snackbar).toHaveBeenCalledTimes(1);
        expect(snackbar).toHaveBeenCalledWith(
          "error",
          `Failed to rename device`
        );
      });
    });
  });
});
