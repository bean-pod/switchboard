import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { describe, expect } from "@jest/globals";
import DeleteStreamDialog from "../DeleteStreamDialog";
import Dialog from "../Dialog";

Enzyme.configure({ adapter: new Adapter() });

describe("<DeleteStreamDialog/> class", () => {
  const dummyHistory = {
    push: () => {},
    go: () => {}
  };
  const dummyId = "dummyId";
  const wrapper = Enzyme.shallow(
    <DeleteStreamDialog deleteId={dummyId} history={dummyHistory} />
  );

  describe("render() function", () => {
    it("renders one <Dialog/> Component", () => {
      expect(wrapper.find(Dialog)).toHaveLength(1);
    });
  });
  describe("openDialog() function", () => {
    it("calls the child's openDialog() function", () => {
      expect(wrapper.find(Dialog)).toHaveLength(1);
    });
  });
  describe("confirmDelete() function", () => {
    it("calls StreamAPI with the passed ID", () => {
      // mock the stream API
      // Call the function
      // check if stream API has been called with the correct arguments
    });
  });
  describe("afterDelete() function", () => {
    it("calls dialogElement.current.closeDialog()", () => {
      // mock the dialogElement.current.closeDialog
      // Call the function
      // check if function has been called
    });
    it(`history.push() with "/Streaming"`, () => {
      // mock the history.push()
      // Call the function
      // check if function has been called with Streaming
    });
    it(`history.go() with "0"`, () => {
      // mock the history.go()
      // Call the function
      // check if function has been called with 0
    });
  });
});
