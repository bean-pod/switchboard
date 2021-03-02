import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";

import { IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import DeleteStreamDialogSummoner from "../DeleteStreamDialogSummoner";
import DeleteStreamDialog from "../DeleteStreamDialog";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeleteStreamDialogSummoner/> class", () => {
  const dummyId = "dummyId";
  const dummyHistory = {
    push: () => {},
    go: () => {}
  };
  let wrapper;

  describe("render() function", () => {
    wrapper = Enzyme.shallow(
      <DeleteStreamDialogSummoner.WrappedComponent
        deleteId={dummyId}
        history={dummyHistory}
      />
    );
    it("renders the correct components", () => {
      expect(wrapper.find(Tooltip)).toHaveLength(1);
      expect(wrapper.find(IconButton)).toHaveLength(1);
      expect(wrapper.find(Delete)).toHaveLength(1);
      expect(wrapper.find(DeleteStreamDialog)).toHaveLength(1);
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
      <DeleteStreamDialogSummoner.WrappedComponent
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
