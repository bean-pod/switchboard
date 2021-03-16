import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, jest } from "@jest/globals";
import FormFailedDialog from "../FormFailedDialog";
import Dialog from "../../dialog/Dialog";

Enzyme.configure({ adapter: new Adapter() });

describe("<FormFailedDialog/> class", () => {
  let wrapper;

  const dummyValues = {
    title: "test",
    message: "test"
  };

  const mockOpenDialog = jest.fn();
  const mockRefElement = {
    current: {
      openDialog: mockOpenDialog
    }
  };
  beforeEach(() => {
    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });
    wrapper = Enzyme.shallow(
      <FormFailedDialog title={dummyValues.title} errorMessage={dummyValues.message} />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("render() function", () => {
    it("renders one <Dialog/> Component with the expected props", () => {
      expect(wrapper.find(Dialog)).toHaveLength(1);
      const formDialogProps = wrapper.find(Dialog).props();
      expect(formDialogProps.title).toEqual(dummyValues.title);
      expect(formDialogProps.noCancel).toBe(true);
    });
  });
  describe("openDialog() function", () => {
    it("calls the child's openDialog() function", () => {
      wrapper.instance().openDialog();
      expect(mockOpenDialog).toBeCalledTimes(1);
    });
  });
});
