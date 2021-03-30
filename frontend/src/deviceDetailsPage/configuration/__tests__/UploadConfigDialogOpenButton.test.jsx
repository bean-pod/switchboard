import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, beforeEach, describe, expect } from "@jest/globals";

import { Button } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

import UploadConfigDialogOpenButton from "../UploadConfigDialogOpenButton";

import UploadConfigDialog from "../UploadConfigDialog";
import DeviceInfo from "../../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<UploadConfigDialogOpenButton/> class", () => {
  const mockOpenDialog = jest.fn();
  const mockRefElement = {
    current: {
      openDialog: mockOpenDialog
    }
  };
  const dummyDevice = new DeviceInfo(
    "serial",
    "sometime",
    "public",
    "private",
    "someName",
    "Online",
    "encoder",
    "yabadoo"
  );

  let wrapper;

  beforeEach(() => {
    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });

    wrapper = Enzyme.shallow(
      <UploadConfigDialogOpenButton device={dummyDevice} />
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });

  describe("render() function returns a component that", () => {
    it("Contains 1 <Button/> component with expected props", () => {
      expect(wrapper.find(Button)).toHaveLength(1);

      const expected = {
        variant: "contained",
        color: "primary",
        startIcon: <CloudUpload />,
        onClick: wrapper.instance().openDialog
      };
      const props = wrapper.find(Button).at(0).props();
      expect(props.variant).toBe(expected.variant);
      expect(props.color).toBe(expected.color);
      expect(props.startIcon).toStrictEqual(expected.startIcon);
      expect(props.onClick).toBe(expected.onClick);
    });
    it("Contains 1 <UploadConfigDialog/> component with expected props", () => {
      expect(wrapper.find(UploadConfigDialog)).toHaveLength(1);
      const expected = {
        deviceId: dummyDevice.serialNumber
      };
      const props = wrapper.find(UploadConfigDialog).at(0).props();
      expect(props.deviceId).toBe(expected.deviceId);
    });
  });
  describe("openDialog() function", () => {
    it("calls dialogElement.current.openDialog()", () => {
      wrapper.instance().openDialog();
      expect(mockOpenDialog).toBeCalledTimes(1);
    });
  });
});
