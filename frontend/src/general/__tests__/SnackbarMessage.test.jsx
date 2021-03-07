import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SnackbarMessage from "../SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

const mockHistoryPush = jest.fn();
const mockHistoryGo = jest.fn();
const mockHistory = {
  location: { pathname: null },
  push: mockHistoryPush,
  go: mockHistoryGo
};

jest.mock("react-router-dom", () => ({
  useHistory: () => {
    return mockHistory;
  }
}));

const setOpen = jest.fn();
const setIsSuccess = jest.fn();
const setStatus = jest.fn();
const setMessage = jest.fn();
const setPathname = jest.fn();

const openSnackbar = jest.spyOn(React, "useState");
openSnackbar.mockImplementation(
  (open) => [open, setOpen],
  (isSuccess) => [isSuccess, setIsSuccess],
  (message) => [message, setMessage],
  (pathname) => [pathname, setPathname]
);

const handleClose = jest.spyOn(React, "useState");
handleClose.mockImplementation(
  (open) => [open, setOpen],
  (isSuccess) => [isSuccess, setIsSuccess],
  (status) => [status, setStatus],
  (message) => [message, setMessage],
  (pathname) => [pathname, setPathname]
);

describe("<Snackbar /> Class Component", () => {
  let wrapper;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("render() function", () => {
    wrapper = Enzyme.shallow(<SnackbarMessage />);
    describe("returns a component that", () => {
      it("Contains 1 <Snackbar/> component", () => {
        expect(wrapper.find(Snackbar)).toHaveLength(1);
      });
      it("Contains 1 <SnackbarContent/> component", () => {
        expect(wrapper.find(SnackbarContent)).toHaveLength(1);
      });
    });
  });

  /* describe("openSnackbar()", () => {
    wrapper = Enzyme.shallow(<SnackbarMessage />);
    it("if success, should set the states open and isSuccess to true - and status, message, and pathname to the passed values", () => {
      wrapper.instance().openSnackbar("success", "test", "test"); // doesn't work because can't use instance() with functional components
      expect(setOpen).toBeTruthy();
      expect(setIsSuccess).toBeTruthy();
      expect(setStatus).toBeTruthy();
      expect(setMessage).toBeTruthy();
      expect(setPathname).toBeTruthy();
    });
    it("else, should set the states open and isSuccess to false - and status, message, and pathname to the passed values", () => {
      wrapper.instance().openSnackbar("error", "test", "test"); // doesn't work because can't use instance() with functional components
      expect(setOpen).toBeTruthy();
      expect(setIsSuccess).toBeFalsy();
      expect(setStatus).toBeTruthy();
      expect(setMessage).toBeTruthy();
      expect(setPathname).toBeTruthy();
    });
  });

  describe("refresh()", () => {
    wrapper = Enzyme.shallow(<SnackbarMessage />);
    it("if pathname is current page, then history.go(0)", () => {
      const pathname = "test";
      expect(wrapper.state().pathname).toStrictEqual(pathname);
      wrapper.instance().refresh(); // doesn't work because can't use instance() with functional components
      expect(useHistory.go).toHaveBeenCalledTimes(1);
    });
    it("if pathname is another page, then history.push(/pathname)", () => {
      const pathname = "null";
      expect(wrapper.state().pathname).toStrictEqual(pathname);
      wrapper.instance().refresh(); // doesn't work because can't use instance() with functional components
      expect(useHistory.push).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleClose()", () => {
    wrapper = Enzyme.shallow(<SnackbarMessage />);
    it("should set open and isSuccess to false and status, message and pathname to empty strings", () => {
      wrapper.instance().handleClose(null, null); // doesn't work because can't use instance() with functional components
      expect(wrapper.instance().refresh).toHaveBeenCalledTimes(1);
      expect(setOpen).toBeTruthy();
      expect(setIsSuccess).toBeTruthy();
      expect(setStatus).toBeTruthy();
      expect(setMessage).toBeTruthy();
      expect(setPathname).toBeTruthy();
    });
  }); */
});
