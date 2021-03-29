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

const mockHistoryPush = jest.fn();
const mockHistoryGo = jest.fn();

describe("<SnackbarMessage /> Class Component", () => {
  let wrapper;
  let mockLocation;
  let mockHistory;

  beforeEach(() => {
    mockHistory = {
      push: mockHistoryPush,
      go: mockHistoryGo
    };
    mockLocation = {
      pathname: "test"
    };
    wrapper = Enzyme.shallow(
      <SnackbarMessage.WrappedComponent
        history={mockHistory}
        location={mockLocation}
      />
    );
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
          describe("where if isSuccess", () => {
            it("is true, the backgroundColor should be green", () => {
              wrapper.setState({ isSuccess: true });
              expect(wrapper.find(SnackbarContent).props().style).toEqual({
                backgroundColor: statusColors.green
              });
            });

            it("is false, the backgroundColor should be red", () => {
              wrapper.setState({ isSuccess: false });
              expect(wrapper.find(SnackbarContent).props().style).toEqual({
                backgroundColor: statusColors.red
              });
            });
          });
        });
        describe("and has a  message prop", () => {
          describe("where if isSuccess", () => {
            it("is true, it should have a <CheckCircle/> icon component", () => {
              wrapper.setState({ isSuccess: true });
              expect(wrapper.find(SnackbarContent).props().message).toEqual(
                <Box id="message-id" className="snackMessage">
                  <CheckCircle className="iconPadding" />
                  {wrapper.state().message ||
                    `Form submission status: ${wrapper.state().status}`}
                </Box>
              );
            });

            it("is false, it should have an <Error/> icon component", () => {
              wrapper.setState({ isSuccess: false });
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

  describe("State setter functions", () => {
    const initialValues = {
      status: "initial",
      message: "initial",
      pathname: "initial"
    };
    const testValues = {
      status: "success",
      message: "test",
      pathname: "test"
    };
    describe("setOpen() function", () => {
      it("if passed true, it will set state open to true", () => {
        wrapper.setState({ open: false });
        expect(wrapper.state().open).toBe(false);

        wrapper.instance().setOpen(true);

        expect(wrapper.state().open).toBe(true);
      });

      it("if passed false, it will set state open to false", () => {
        wrapper.setState({ open: true });
        expect(wrapper.state().open).toBe(true);

        wrapper.instance().setOpen(false);

        expect(wrapper.state().open).toBe(false);
      });
    });

    it("setStatus() sets the state status", () => {
      wrapper.setState({ status: initialValues.status });
      expect(wrapper.state().status).toEqual(initialValues.status);

      wrapper.instance().setStatus(testValues.status);

      expect(wrapper.state().status).toEqual(testValues.status);
    });

    describe("setIsSuccess() function", () => {
      it("if passed true, it will set state isSuccess to true", () => {
        wrapper.setState({ isSuccess: false });
        expect(wrapper.state().isSuccess).toBe(false);

        wrapper.instance().setIsSuccess(true);

        expect(wrapper.state().isSuccess).toBe(true);
      });

      it("if passed false, it will set state isSuccess to false", () => {
        wrapper.setState({ isSuccess: true });
        expect(wrapper.state().isSuccess).toBe(true);

        wrapper.instance().setIsSuccess(false);

        expect(wrapper.state().isSuccess).toBe(false);
      });
    });

    it("setMessage() sets the state message", () => {
      wrapper.setState({ message: initialValues.message });
      expect(wrapper.state().message).toEqual(initialValues.message);

      wrapper.instance().setMessage(testValues.message);

      expect(wrapper.state().message).toEqual(testValues.message);
    });

    it("setPathname() sets the state pathname and returns the passed pathname", () => {
      wrapper.setState({ pathname: initialValues.pathname });
      expect(wrapper.state().pathname).toEqual(initialValues.pathname);

      const currentPathname = wrapper
        .instance()
        .setPathname(testValues.pathname);

      expect(wrapper.state().pathname).toEqual(testValues.pathname);
      expect(currentPathname).toEqual(testValues.pathname);
    });

    describe("addSnackbarProperties()", () => {
      describe("sets states status, message to the passed values", () => {
        it("and if state status is success, should set state isSuccess to true", () => {
          wrapper.instance().addSnackbarProperties("success", "test");

          expect(wrapper.state().status).toEqual("success");
          expect(wrapper.state().isSuccess).toEqual(true);
          expect(wrapper.state().message).toEqual("test");
        });

        it("else, should set state isSuccess to false", () => {
          wrapper.instance().addSnackbarProperties("error", "test");

          expect(wrapper.state().status).toEqual("error");
          expect(wrapper.state().isSuccess).toEqual(false);
          expect(wrapper.state().message).toEqual("test");
        });
      });
    });
  });

  describe("openSnackbar() function", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.spyOn(wrapper.instance(), "refresh");
    });
    afterEach(() => {
      jest.clearAllMocks();
      jest.clearAllTimers();
    });
    const dummySuccessValues = {
      status: "success",
      message: "test",
      pathname: "test"
    };
    const dummyErrorValues = {
      status: "error",
      message: "test",
      pathname: "test"
    };
    it("success snackbar with no pathname passed", () => {
      wrapper
        .instance()
        .openSnackbar(
          dummySuccessValues.status,
          dummySuccessValues.message,
          ""
        );

      expect(wrapper.state().pathname).toEqual("");
      expect(wrapper.state().status).toEqual(dummySuccessValues.status);
      expect(wrapper.state().isSuccess).toEqual(true);
      expect(wrapper.state().message).toEqual(dummySuccessValues.message);
      expect(wrapper.state().open).toBe(true);
    });
    it("success snackbar with pathname passed", () => {
      wrapper
        .instance()
        .openSnackbar(
          dummySuccessValues.status,
          dummySuccessValues.message,
          dummySuccessValues.pathname
        );

      expect(wrapper.state().pathname).toEqual(dummySuccessValues.pathname);
      expect(wrapper.instance().refresh).toHaveBeenCalled();

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);
      jest.runAllTimers();

      expect(wrapper.state().status).toEqual(dummySuccessValues.status);
      expect(wrapper.state().isSuccess).toEqual(true);
      expect(wrapper.state().message).toEqual(dummySuccessValues.message);
      expect(wrapper.state().open).toBe(true);
    });
    it("error snackbar with no pathname passed", () => {
      wrapper
        .instance()
        .openSnackbar(dummyErrorValues.status, dummyErrorValues.message, "");

      expect(wrapper.state().status).toEqual(dummyErrorValues.status);
      expect(wrapper.state().isSuccess).toEqual(false);
      expect(wrapper.state().message).toEqual(dummyErrorValues.message);
      expect(wrapper.state().open).toBe(true);
    });
    it("error snackbar with pathname passed", () => {
      wrapper
        .instance()
        .openSnackbar(
          dummyErrorValues.status,
          dummyErrorValues.message,
          dummyErrorValues.pathname
        );

      expect(wrapper.state().pathname).toEqual(dummyErrorValues.pathname);
      expect(wrapper.instance().refresh).toHaveBeenCalled();

      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 300);
      jest.runAllTimers();

      expect(wrapper.state().pathname).toEqual(dummyErrorValues.pathname);
      expect(wrapper.state().status).toEqual(dummyErrorValues.status);
      expect(wrapper.state().isSuccess).toEqual(false);
      expect(wrapper.state().message).toEqual(dummyErrorValues.message);
      expect(wrapper.state().open).toBe(true);
    });
  });

  describe("refresh() function", () => {
    it("if state pathname is current page, then history.go(0) is called", () => {
      wrapper.setState({ pathname: mockLocation.pathname });
      expect(wrapper.state().pathname).toEqual(mockLocation.pathname);

      wrapper.instance().refresh();

      expect(mockHistoryGo).toHaveBeenCalledWith(0);
    });

    it("if state pathname is another page, then history.push(/pathname) is called", () => {
      const dummyOtherPath = "other";
      wrapper.setState({ pathname: dummyOtherPath });
      expect(wrapper.state().pathname).not.toEqual(mockLocation.pathname);

      wrapper.instance().refresh();

      expect(mockHistoryPush).toHaveBeenCalledWith(`/${dummyOtherPath}`);
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
