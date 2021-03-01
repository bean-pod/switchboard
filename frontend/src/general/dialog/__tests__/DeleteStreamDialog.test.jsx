import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { beforeEach, describe, expect, jest } from "@jest/globals";
import DeleteStreamDialog from "../DeleteStreamDialog";
import Dialog from "../Dialog";

import * as StreamApi from "../../../api/StreamApi";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeleteStreamDialog/> class", () => {
  let wrapper;

  const mockPush = jest.fn();
  const mockGo = jest.fn();
  const dummyHistory = {
    push: mockPush,
    go: mockGo
  };
  const mockOpenDialog = jest.fn();
  const mockCloseDialog = jest.fn();
  const mockRefElement= {
      current: {
        openDialog: mockOpenDialog,
        closeDialog: mockCloseDialog
      }
    };
  const dummyId = "dummyId";
  beforeEach(() => {

    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });
    jest.spyOn(StreamApi, "deleteStream").mockImplementation(() => {
      return Promise.resolve();
    });
    wrapper = Enzyme.shallow(
      <DeleteStreamDialog deleteId={dummyId} history={dummyHistory} />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
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
  });
  describe("afterDelete() function", () => {
    it("calls the correct functions", () => {
      const expectedPushArg = "/Streaming";
      const expectedGoArg = 0;

      wrapper.instance().afterDelete();
      wrapper.instance().forceUpdate();

      expect(mockCloseDialog).toBeCalledTimes(1);
      expect(mockPush).toBeCalledTimes(1);
      expect(mockPush).toBeCalledWith(expectedPushArg);

      expect(mockGo).toBeCalledTimes(1);
      expect(mockGo).toBeCalledWith(expectedGoArg);
    });
  });
});
