import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";

import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteDeviceDialogOpener from "../DeleteDeviceDialogOpener";
import DeleteDeviceDialog from "../DeleteDeviceDialog";
import DeviceInfo from "../../../model/DeviceInfo";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeleteDeviceDialogOpener/> class", () => {
  const dummyDevice = new DeviceInfo();
  let wrapper;

  describe("render() function", () => {
    wrapper = Enzyme.shallow(<DeleteDeviceDialogOpener device={dummyDevice} />);
    it("renders the correct components, with expected props where appropriate", () => {
      expect(wrapper.find(DeleteDeviceDialog)).toHaveLength(1);

      expect(wrapper.find(Button)).toHaveLength(1);

      // test button props
      const buttonProps = wrapper.find(Button).first().props();
      expect(buttonProps.variant).toBe("contained");
      expect(buttonProps.color).toBe("secondary");
      expect(buttonProps.onClick).toBe(wrapper.instance().openDialog);
      const expectedStartIcon = <DeleteIcon />;
      expect(buttonProps.startIcon).toStrictEqual(expectedStartIcon);
    });
  });
  describe("openDialog() function", () => {
    const mockOpenDialog = jest.fn();
    const mockRefElement = {
      current: {
        openDialog: mockOpenDialog
      }
    };
    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });

    wrapper = Enzyme.shallow(<DeleteDeviceDialogOpener device={dummyDevice} />);
    it("calls dialogElement.current.openDialog()", () => {
      wrapper.instance().openDialog();
      expect(mockOpenDialog).toBeCalledTimes(1);
    });
  });
});
