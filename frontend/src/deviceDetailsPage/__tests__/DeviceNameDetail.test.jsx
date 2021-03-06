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
import DeviceNameDetail from "../DeviceNameDetail";
import EditableName from "../EditableName";
import StaticName from "../StaticName";
import * as DeviceApi from "../../api/DeviceApi";

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/DeviceApi");
jest.spyOn(DeviceApi, "updateDeviceName");

describe("<DeviceNameDetail/> component", () => {
  let wrapper;
  const mockDevice = {
    name: "Mock Device",
    id: "Serial Number"
  };
  const defaultState = {
    name: mockDevice.name,
    editing: false
  };

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <DeviceNameDetail deviceName={mockDevice.name} deviceId={mockDevice.id} />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Not editing", () => {
    it("Contains one <StaticName/> component with expected props", () => {
      expect(wrapper.state()).toEqual(defaultState);

      const staticName = wrapper.find(StaticName);
      expect(staticName).toHaveLength(1);

      const props = staticName.first().props();
      expect(props.deviceName).toEqual(mockDevice.name);
      expect(props.startEditing).toEqual(wrapper.instance().startEdit);
    });
  });

  describe("Editing", () => {
    const editingState = {
      name: mockDevice.name,
      editing: true
    };

    beforeEach(() => {
      wrapper.find(StaticName).first().props().startEditing();
    });

    it("Contains one <EditableName/> component with expected props", () => {
      expect(wrapper.state()).toEqual(editingState);

      const editableName = wrapper.find(EditableName);
      expect(editableName).toHaveLength(1);

      const props = editableName.first().props();
      expect(props.deviceName).toEqual(mockDevice.name);
      expect(props.confirmEditing).toEqual(wrapper.instance().confirmEditing);
      expect(props.setName).toEqual(wrapper.instance().setName);
      expect(props.cancelEditing).toEqual(wrapper.instance().cancelEditing);
    });

    describe("Cancel editing", () => {
      it("Changes state and contains a <StaticName/> element", () => {
        wrapper.find(EditableName).first().props().cancelEditing();

        expect(wrapper.state()).toEqual(defaultState);

        const staticName = wrapper.find(StaticName);
        expect(staticName).toHaveLength(1);
        const props = staticName.first().props();
        expect(props.deviceName).toEqual(mockDevice.name);
        expect(props.startEditing).toEqual(wrapper.instance().startEdit);
      });
    });

    describe("Confirm editing", () => {
      it("On success, changes the device name and contains StaticName with new name", () => {
        const newName = "New Name";
        wrapper.find(EditableName).first().props().setName(newName);

        DeviceApi.updateDeviceName.mockResolvedValue();

        const editEvent = {
          preventDefault: jest.fn()
        };
        wrapper.find(EditableName).first().props().confirmEditing(editEvent);

        const staticName = wrapper.find(StaticName);
        expect(staticName).toHaveLength(1);
        const props = staticName.first().props();
        expect(props.deviceName).toEqual(newName);
        expect(props.startEditing).toEqual(wrapper.instance().startEdit);
      });

      it("On failure, returns to the old name and contains <StaticName/>", async () => {
        const newName = "New Name";
        wrapper.find(EditableName).first().props().setName(newName);

        DeviceApi.updateDeviceName.mockRejectedValue();

        const editEvent = {
          preventDefault: jest.fn()
        };
        wrapper.find(EditableName).first().props().confirmEditing(editEvent);
        const flushPromises = () => new Promise(setImmediate);
        await flushPromises();

        const staticName = wrapper.find(StaticName);
        expect(staticName).toHaveLength(1);
        const props = staticName.first().props();
        expect(props.deviceName).toEqual(mockDevice.name);
        expect(props.startEditing).toEqual(wrapper.instance().startEdit);
      });
    });
  });
});
