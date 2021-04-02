import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, jest } from "@jest/globals";
import { Input } from "@material-ui/core";

import UploadConfigDialog from "../UploadConfigDialog";

import Dialog from "../../../general/dialog/Dialog";
import * as DeviceApi from "../../../api/DeviceApi";

Enzyme.configure({ adapter: new Adapter() });

describe("<UploadConfigDialog/> class", () => {
  let wrapper;

  const mockOpenDialog = jest.fn();
  const mockCloseDialog = jest.fn();
  const mockRefElement = {
    current: {
      openDialog: mockOpenDialog,
      closeDialog: mockCloseDialog
    }
  };

  const dummyId = 666;

  beforeEach(() => {
    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });

    wrapper = Enzyme.shallow(<UploadConfigDialog deviceId={dummyId} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("render() function returns a component that", () => {
    it("Contains one <Dialog/> Component with expected props", () => {
      expect(wrapper.find(Dialog)).toHaveLength(1);
      const expected = {
        title: "Upload a file",
        actionButton: {
          name: "Upload",
          onClick: wrapper.instance().handleUpload
        }
      };
      const props = wrapper.find(Dialog).first().props();
      expect(props.title).toBe(expected.title);
      expect(props.actionButton).toStrictEqual(expected.actionButton);
    });
    it("Contains one <Input/> Component with expected props", () => {
      expect(wrapper.find(Input)).toHaveLength(1);
      const expected = {
        type: "file",
        name: "file",
        disableUnderline: true,
        onChange: wrapper.instance().handleChange
      };
      const props = wrapper.find(Input).first().props();
      expect(props.type).toBe(expected.type);
      expect(props.name).toBe(expected.name);
      expect(props.disableUnderline).toBe(expected.disableUnderline);
      expect(props.onChange).toStrictEqual(expected.onChange);
    });
  });

  describe("handleChange() function", () => {
    it("sets the state of the wrapper", () => {
      const initialState = {
        file: null
      };
      const expected = "hello";
      const dummyEvent = {
        target: {
          files: [expected]
        }
      };
      wrapper.setState(initialState);
      wrapper.instance().handleChange(dummyEvent);
      expect(wrapper.state().file).toStrictEqual(expected);
    });
  });

  describe("handleUpload() function", () => {
    it("calls DeviceAPI.upload with the passed ID", () => {
      jest.spyOn(DeviceApi, "uploadConfiguration").mockImplementation(() => {
        return Promise.resolve();
      });
      const expectedFile = new File([], "testFile");
      const state = {
        file: expectedFile
      };
      wrapper.setState(state);
      wrapper.instance().handleUpload();
      expect(DeviceApi.uploadConfiguration).toBeCalledWith(
        dummyId,
        expectedFile
      );
    });
  });

  describe("afterUpload() function", () => {
    it("closes the dialog", () => {
      wrapper.instance().afterUpload();
      wrapper.instance().forceUpdate();

      expect(mockCloseDialog).toBeCalledTimes(1);
    });
  });

  describe("openDialog() function", () => {
    it("calls the child's openDialog() function", () => {
      wrapper.instance().openDialog();
      expect(mockOpenDialog).toBeCalledTimes(1);
    });
  });
});
