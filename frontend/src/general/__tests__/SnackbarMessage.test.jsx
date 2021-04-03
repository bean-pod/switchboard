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
    describe("returns a component that", () => {
      it("Contains 1 <Snackbar/> component with the expected props and 1 <SnackbarContent/> component", () => {
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

      describe("The <SnackbarContent/> component", () => {
        describe("has a style prop", () => {
          const statusColors = {
            green: "#4caf50",
            red: "#f44336"
          };
          describe("where if status", () => {
            it("is success, the backgroundColor should be green", () => {
              wrapper.setState({ status: "success" });
              expect(wrapper.find(SnackbarContent).props().style).toEqual({
                backgroundColor: statusColors.green
              });
            });

            it("is anything else, the backgroundColor should be red", () => {
              wrapper.setState({ status: "error" });
              expect(wrapper.find(SnackbarContent).props().style).toEqual({
                backgroundColor: statusColors.red
              });
            });
          });
        });
        describe("and has a  message prop", () => {
          describe("where if status", () => {
            it("is success, it should have a <CheckCircle/> icon component", () => {
              wrapper.setState({ status: "success" });
              expect(wrapper.find(SnackbarContent).props().message).toEqual(
                <Box id="message-id" className="snackMessage">
                  <CheckCircle className="iconPadding" />
                  {wrapper.state().message ||
                    `Form submission status: ${wrapper.state().status}`}
                </Box>
              );
            });

            it("is anything else, it should have an <Error/> icon component", () => {
              wrapper.setState({ status: "error" });
              expect(wrapper.find(SnackbarContent).props().message).toEqual(
                <Box id="message-id" className="snackMessage">
                  <Error className="iconPadding" />
                  {wrapper.state().message ||
                    `Form submission status: ${wrapper.state().status}`}
                </Box>
              );
            });
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
    it("success snackbar with no pathname passed", () => {
      wrapper
        .instance()
        .openSnackbar(dummySuccessValues.status, dummySuccessValues.message);

      expect(wrapper.state().status).toEqual(dummySuccessValues.status);
      expect(wrapper.state().message).toEqual(dummySuccessValues.message);
      expect(wrapper.state().open).toBe(true);
    });
    it("error snackbar with no pathname passed", () => {
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
    it("else, state open should be set to false", () => {
      wrapper.setState({ open: true });
      expect(wrapper.state().open).toBe(true);

      wrapper.instance().handleClose(null, null);

      expect(wrapper.state().open).toBe(false);
    });
  });
});
