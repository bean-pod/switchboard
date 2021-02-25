import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect, jest } from "@jest/globals";
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
  const dummyId = "dummyId";
  describe("render() function", () => {
    wrapper = Enzyme.shallow(
      <DeleteStreamDialog deleteId={dummyId} history={dummyHistory} />
    );
    it("renders one <Dialog/> Component", () => {
      expect(wrapper.find(Dialog)).toHaveLength(1);
    });
  });
  describe("openDialog() function", () => {

   wrapper = Enzyme.shallow(
      <DeleteStreamDialog deleteId={dummyId} history={dummyHistory} />
    );
    it("calls the child's openDialog() function", () => {
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
        <DeleteStreamDialog deleteId={dummyId} history={dummyHistory} />
      );
  
      it("calls dialogElement.current.openDialog()", () => {
        wrapper.instance().openDialog();
  
        expect(mockOpenDialog).toBeCalledTimes(1);
      });

    });
  });
  describe("confirmDelete() function", () => {
    wrapper = Enzyme.shallow(
      <DeleteStreamDialog deleteId={dummyId} history={dummyHistory} />
    );
    it("calls StreamAPI with the passed ID", () => {
      jest.spyOn(StreamApi, "deleteStream");
      wrapper.instance().confirmDelete();
      expect(StreamApi.deleteStream).toBeCalledWith(
        dummyId,
        wrapper.instance().afterDelete
      );
    });
  });
  describe.only("afterDelete() function", () => {
    const dummyId = "dummyId";

    const mockCloseDialog = jest.fn();
    const mockRefElement = {
      current: {
        closeDialog: mockCloseDialog
      }
    };
    jest.spyOn(React, "createRef").mockImplementation(() => {
      return mockRefElement;
    });

    wrapper = Enzyme.shallow(
      <DeleteStreamDialog deleteId={dummyId} history={dummyHistory} />
    );

    it("calls dialogElement.current.closeDialog()", () => {
      wrapper.instance().afterDelete();
      wrapper.instance().forceUpdate();

      expect(mockCloseDialog).toBeCalledTimes(1);
    });

    const expectedPushArg = "/Streaming";
    it(`history.push() to be called once with ${expectedPushArg}`, () => {
      wrapper.instance().afterDelete();
      wrapper.instance().forceUpdate();
      expect(mockPush).toBeCalledTimes(1);
      expect(mockPush).toBeCalledWith(expectedPushArg);
    });

    const expectedGoArg = 0;
    it(`history.go() to be called with ${expectedGoArg}`, () => {
      wrapper.instance().afterDelete();
      wrapper.instance().forceUpdate();
      expect(mockGo).toBeCalledTimes(1);
      expect(mockGo).toBeCalledWith(expectedGoArg);
    });
  });
});
