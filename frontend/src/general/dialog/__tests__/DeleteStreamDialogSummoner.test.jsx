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
  const wrapper = Enzyme.shallow(
    <DeleteStreamDialogSummoner.WrappedComponent
      deleteId={dummyId}
      history={dummyHistory}
    />
  );

  describe("render() function", () => {
    it("renders one <Tooltip/> Component", () => {
      expect(wrapper.find(Tooltip)).toHaveLength(1);
    });
    it("renders one <IconButton/> Component", () => {
      expect(wrapper.find(IconButton)).toHaveLength(1);
    });
    it("renders one <Delete/> icon Component", () => {
      expect(wrapper.find(Delete)).toHaveLength(1);
    });
    it("renders one <DeleteStreamDialog/> Component", () => {
      expect(wrapper.find(DeleteStreamDialog)).toHaveLength(1);
    });
  });
  describe("openDialog() function", () => {
    it("calls the child's openDialog() function", () => {
      // mock the dialogElement.current.closeDialog
      // Call the function
      // check if function has been called
    });
  });
});
