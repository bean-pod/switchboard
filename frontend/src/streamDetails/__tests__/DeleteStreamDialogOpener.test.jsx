import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";

import { Button, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteStreamDialogOpener from "../DeleteStreamDialogOpener";
import DeleteStreamDialog from "../DeleteStreamDialog";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeleteStreamDialogOpener/> class", () => {
  const dummyId = 666;
  const dummyHistory = {
    push: () => {},
    go: () => {}
  };
  let wrapper;

  describe("render() function", () => {
    wrapper = Enzyme.shallow(
      <DeleteStreamDialogOpener.WrappedComponent
        deleteId={dummyId}
        history={dummyHistory}
      />
    );
    it("renders the correct components, with expected props where appropriate", () => {
      expect(wrapper.find(Tooltip)).toHaveLength(1);
      expect(wrapper.find(DeleteStreamDialog)).toHaveLength(1);

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

    wrapper = Enzyme.shallow(
      <DeleteStreamDialogOpener.WrappedComponent
        deleteId={dummyId}
        history={dummyHistory}
      />
    );
    it("calls dialogElement.current.openDialog()", () => {
      wrapper.instance().openDialog();
      expect(mockOpenDialog).toBeCalledTimes(1);
    });
  });
});
