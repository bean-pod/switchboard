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

Enzyme.configure({ adapter: new Adapter() });
jest.mock("../../api/DeviceApi");
jest.spyOn(DeviceApi, "updateDeviceName");

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

    it("call the DeviceApi.updateDeviceName function", ()=>{
      //expect(DeviceApi.updateDeviceName).toBeCalledTimes(1);
    })

    it("On success, changes the device name and contains StaticName with new name", () => {
      const newName = "New Name";
      wrapper.instance().setName(newName);

      DeviceApi.updateDeviceName.mockResolvedValue();

      const editEvent = {
        preventDefault: jest.fn()
      };
      wrapper.instance().confirmEditing(editEvent);

      const staticName = wrapper.find(StaticName);
      expect(staticName).toHaveLength(1);
      const props = staticName.first().props();
      expect(props.deviceName).toEqual(newName);
    });

    it("On failure, returns to the old name and contains <StaticName/>", async () => {
      const newName = "New Name";
      wrapper.instance().setName(newName);

      DeviceApi.updateDeviceName.mockRejectedValue();

      const editEvent = {
        preventDefault: jest.fn()
      };
      wrapper.instance().confirmEditing(editEvent);
      const flushPromises = () => new Promise(setImmediate);
      await flushPromises();

      const staticName = wrapper.find(StaticName);
      expect(staticName).toHaveLength(1);
      const props = staticName.first().props();
      expect(props.deviceName).toEqual(mockDevice.name);
    });
  });
});
