import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import DeleteStreamDialog from "../DeleteStreamDialog";
import Dialog from "../../general/dialog/Dialog";

import * as StreamApi from "../../api/StreamApi";
import * as SnackbarMessage from "../../general/SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

let stat;
let message;
let pathname;
const snackbar = jest.fn();
jest
  .spyOn(SnackbarMessage, "snackbar")
  .mockImplementation(() => snackbar(stat, message, pathname));

describe("<DeleteStreamDialog/> class", () => {
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
    jest.spyOn(StreamApi, "deleteStream").mockImplementation(() => {
      return Promise.resolve();
    });
    wrapper = Enzyme.shallow(<DeleteStreamDialog deleteId={dummyId} />);
  });
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("render() function", () => {
    it("renders one <Dialog/> Component", () => {
      expect(wrapper.find(Dialog)).toHaveLength(1);
    });
  });
  describe("openDialog() function", () => {
    it("calls the child's openDialog() function", () => {
      wrapper.instance().openDialog();
      expect(mockOpenDialog).toBeCalledTimes(1);
    });
  });
  describe("confirmDelete() function", () => {
    it("calls StreamAPI with the passed ID", () => {
      wrapper.instance().confirmDelete();
      expect(StreamApi.deleteStream).toBeCalledWith(dummyId);
    });
    describe("if stream", () => {
      it("is deleted successfully, it displays a success snackbar", () => {
        StreamApi.deleteStream.mockResolvedValueOnce(
          snackbar(
            "success",
            `Stream ${dummyId} successfully deleted`,
            "Streams"
          )
        );

        wrapper.instance().confirmDelete();

        expect(snackbar).toHaveBeenCalledTimes(1);
        expect(snackbar).toHaveBeenCalledWith(
          "success",
          `Stream ${dummyId} successfully deleted`,
          "Streams"
        );
      });
      it("fails to delete, it displays an error snackbar", async () => {
        StreamApi.deleteStream.mockRejectedValueOnce(
          snackbar("error", `Failed to delete stream ${dummyId}`)
        );

        wrapper.instance().confirmDelete();

        const flushPromises = () => new Promise(setImmediate);
        await flushPromises();

        expect(snackbar).toHaveBeenCalledTimes(1);
        expect(snackbar).toHaveBeenCalledWith(
          "error",
          `Failed to delete stream ${dummyId}`
        );
      });
    });
  });
  describe("afterDelete() function", () => {
    it("closes the dialog", () => {
      wrapper.instance().afterDelete();
      wrapper.instance().forceUpdate();

      expect(mockCloseDialog).toBeCalledTimes(1);
    });
  });
});
