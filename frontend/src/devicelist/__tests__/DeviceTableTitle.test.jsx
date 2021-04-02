import React from "react";
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
import { MenuItem, Select } from "@material-ui/core";

import DeviceTableTitle from "../DeviceTableTitle";
import StyledInput from "../StyledInput";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeviceTableTitle/> class component", () => {
  let wrapper;
  const dummyIndex = 4;
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <DeviceTableTitle index={dummyIndex} handleChange={mockHandleChange} />
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });
  describe("render() function", () => {
    describe("returns a component that", () => {
      it("Contains 1 <Select/> component with expected props", () => {
        const component = wrapper.find(Select);
        expect(component).toHaveLength(1);

        const props = component.at(0).props();
        const expected = {
          id: "device-table-title-select",
          value: dummyIndex,
          onChange: wrapper.instance().handleChange,
          input: <StyledInput />
        };
        expect(props.id).toBe(expected.id);
        expect(props.value).toBe(expected.value);
        expect(props.onChange).toBe(expected.onChange);
        expect(props.input).toStrictEqual(expected.input);
      });
      it("Contains 3 <MenuItem/> components", () => {
        const component = wrapper.find(MenuItem);
        expect(component).toHaveLength(3);
      });
      it("<MenuItem/> 0 has expected props", () => {
        const component = wrapper.find(MenuItem);

        const props = component.at(0).props();
        const expected = {
          value: 0,
          text: "All Devices"
        };
        expect(props.value).toBe(expected.value);
        expect(props.children).toBe(expected.text);
      });
      it("<MenuItem/> 1 has expected props", () => {
        const component = wrapper.find(MenuItem);

        const props = component.at(1).props();
        const expected = {
          value: 1,
          text: "Senders"
        };
        expect(props.value).toBe(expected.value);
        expect(props.children).toBe(expected.text);
      });
      it("<MenuItem/> 2 has expected props", () => {
        const component = wrapper.find(MenuItem);

        const props = component.at(2).props();
        const expected = {
          value: 2,
          text: "Receivers"
        };
        expect(props.value).toBe(expected.value);
        expect(props.children).toBe(expected.text);
      });
    });
  });

  describe("handleChange() function", () => {
    it("calls passed handleChange callback with expected args", () => {
      const expectedArg = 4;
      const dummyEvent = {
        target: {
          value: expectedArg
        }
      };
      wrapper.instance().handleChange(dummyEvent);
      expect(mockHandleChange).toBeCalledWith(expectedArg);
    });
  });
});
