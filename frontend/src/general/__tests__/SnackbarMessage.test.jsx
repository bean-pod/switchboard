import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest
} from "@jest/globals";
import { Snackbar, SnackbarContent, Box } from "@material-ui/core";
import { CheckCircle, Error } from "@material-ui/icons";
import SnackbarMessage from "../SnackbarMessage";

Enzyme.configure({ adapter: new Adapter() });

describe("<SnackbarMessage /> Class Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = Enzyme.shallow(<SnackbarMessage />);
  });

  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  describe("render() function", () => {
    describe("Returns a component that", () => {
      it("Contains 1 <Snackbar/> component with the expected props ", () => {
        const snackbarComponent = wrapper.find(Snackbar);
        expect(snackbarComponent).toHaveLength(1);

        const snackbarComponentProps = snackbarComponent.props();
        expect(snackbarComponentProps.contentprops).toEqual({
          "aria-describedby": "message-id"
        });
        expect(snackbarComponentProps.anchorOrigin).toEqual({
          vertical: "top",
          horizontal: "right"
        });
        expect(snackbarComponentProps.open).toBe(wrapper.state().open);
        expect(snackbarComponentProps.autoHideDuration).toEqual(3000);
        expect(snackbarComponentProps.onClose).toBe(
          wrapper.instance().handleClose
        );

        expect(wrapper.find(SnackbarContent)).toHaveLength(1);
      });

      describe("Contains 1 <SnackbarContent/> component where", () => {
        const statusColors = {
          green: "#4caf50",
          red: "#f44336"
        };
        describe("If status is success,", () => {
          it("the snackbar has a green background", () => {
            wrapper.setState({ status: "success" });
            expect(wrapper.find(SnackbarContent).props().style).toEqual({
              backgroundColor: statusColors.green
            });
          });
          it("contains a message prop with a <CheckCircle/> component", () => {
            wrapper.setState({ status: "success" });
            expect(wrapper.find(SnackbarContent).props().message).toEqual(
              <Box id="message-id" className="snackMessage">
                <CheckCircle className="iconPadding" />
                {wrapper.state().message}
              </Box>
            );
          });
        });
        describe("If status is not success,", () => {
          it("the snackbar has a red background", () => {
            wrapper.setState({ status: "error" });
            expect(wrapper.find(SnackbarContent).props().style).toEqual({
              backgroundColor: statusColors.red
            });
          });
          it("contains a message prop with a <Error/> component", () => {
            wrapper.setState({ status: "error" });
            expect(wrapper.find(SnackbarContent).props().message).toEqual(
              <Box id="message-id" className="snackMessage">
                <Error className="iconPadding" />
                {wrapper.state().message}
              </Box>
            );
          });
        });
      });
    });
  });

  describe("openSnackbar() function", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    const dummySuccessValues = {
      status: "success",
      message: "test"
    };
    const dummyErrorValues = {
      status: "error",
      message: "test"
    };
    it("success snackbar if state status is success", () => {
      wrapper
        .instance()
        .openSnackbar(dummySuccessValues.status, dummySuccessValues.message);

      expect(wrapper.state().status).toEqual(dummySuccessValues.status);
      expect(wrapper.state().message).toEqual(dummySuccessValues.message);
      expect(wrapper.state().open).toBe(true);
    });
    it("error snackbar if state status is not success", () => {
      wrapper
        .instance()
        .openSnackbar(dummyErrorValues.status, dummyErrorValues.message);

      expect(wrapper.state().status).toEqual(dummyErrorValues.status);
      expect(wrapper.state().message).toEqual(dummyErrorValues.message);
      expect(wrapper.state().open).toBe(true);
    });
  });

  describe("handleClose() function", () => {
    it("if reason is clickaway, state open should remain true", () => {
      wrapper.setState({ open: true });
      expect(wrapper.state().open).toBe(true);

      wrapper.instance().handleClose(null, "clickaway");

      expect(wrapper.state().open).toBe(true);
    });
    it("if reason is not clickaway, state open should be set to false", () => {
      wrapper.setState({ open: true });
      expect(wrapper.state().open).toBe(true);

      wrapper.instance().handleClose(null, null);

      expect(wrapper.state().open).toBe(false);
    });
  });
});
