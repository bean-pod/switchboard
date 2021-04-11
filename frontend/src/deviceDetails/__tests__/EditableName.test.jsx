import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { Box, IconButton, TextField } from "@material-ui/core";
import { Cancel, Save } from "@material-ui/icons";

import EditableName from "../EditableName";

Enzyme.configure({ adapter: new Adapter() });

describe("<EditableName/> functional Component", () => {
  let wrapper;
  const mockConfirm = jest.fn();
  const mockSetName = jest.fn();
  const mockCancel = jest.fn();
  const dummyName = "someName";
  beforeEach(() => {
    wrapper = Enzyme.shallow(
      <EditableName
        confirmEditing={mockConfirm}
        deviceName={dummyName}
        setName={mockSetName}
        cancelEditing={mockCancel}
      />
    );
  });
  describe("returns a component that", () => {
    it("Contains 1 <Form/> component with expected props", () => {
      expect(wrapper.find(".deviceNameEditForm")).toHaveLength(1);
      const formProps = wrapper.find(".deviceNameEditForm").first().props();
      expect(formProps.onSubmit).toBe(mockConfirm);
    });
    it("Contains 1 <Box/> component with expected props", () => {
      expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("Contains 1 <TextField/> component with expected props", () => {
      expect(wrapper.find(TextField)).toHaveLength(1);
      const textFieldProps = wrapper.find(TextField).first().props();

      expect(textFieldProps.id).toBe("deviceName");
      expect(textFieldProps.name).toBe("deviceName");
      expect(textFieldProps.required).toBe(true);
      expect(textFieldProps.defaultValue).toBe(dummyName);
    });
    it("Contains 2 <IconButton/> components", () => {
      expect(wrapper.find(IconButton)).toHaveLength(2);
    });
    it("First <IconButton/> component with expected props", () => {
      const iconButtonProps = wrapper.find(IconButton).first().props();

      expect(iconButtonProps.onClick).toBe(mockCancel);
    });
    it("Second <IconButton/> component with expected props", () => {
      const iconButtonProps = wrapper.find(IconButton).last().props();

      expect(iconButtonProps.type).toBe("submit");
      expect(iconButtonProps.color).toBe("primary");
    });
    it("Contains 1 <Cancel/> component", () => {
      expect(wrapper.find(Cancel)).toHaveLength(1);
    });
    it("Contains 1 <Save/> component", () => {
      expect(wrapper.find(Save)).toHaveLength(1);
    });
  });

  it("<TextField/> onChange should call passed setName function", () => {
    const textFieldProps = wrapper.find(TextField).first().props();
    const targetValue = "new Name";
    const event = {
      target: {
        value: targetValue
      }
    };

    textFieldProps.onChange(event);
    expect(mockSetName).toBeCalledWith(targetValue);
  });
});
