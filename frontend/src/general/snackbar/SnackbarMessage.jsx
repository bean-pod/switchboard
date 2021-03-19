import React from "react";
import PropTypes from "prop-types";
import { Snackbar, SnackbarContent, IconButton, Box } from "@material-ui/core";
import { CheckCircle, Error, Close } from "@material-ui/icons";

let openSnackbarFn;

export default class SnackbarMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isSuccess: false, 
      status: "",
      message: "",
      pathname: ""
    };
    this.setOpen = this.setOpen.bind(this);
    this.setIsSuccess = this.setIsSuccess.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.setPathname = this.setPathname.bind(this);
    this.openSnackbar = this.openSnackbar.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    openSnackbarFn = this.openSnackbar;
  }

  setOpen(open) {
    this.setState({
      open
    });
  }

  setStatus(status) {
    this.setState({
      status
    });
  }

  setIsSuccess(isSuccess) {
    this.setState({
      isSuccess
    });
  }

  setMessage(message) {
    this.setState({
      message
    });
  }

  setPathname(pathname) {
    this.setState({
      pathname
    });
  }
  
  refresh() {
    const { history } = this.props;
    const { pathname } = this.state;
    if (history.location.pathname.endsWith(pathname)) {
      history.go(0);
    } else {
      history.push(`/${pathname}`);
    }
  }

  openSnackbar(stat, msg, path) {
    this.setStatus(stat);
    if (stat != "error") {
      this.setIsSuccess(true);
    } else {
      this.setIsSuccess(false);
    }
    this.setMessage(msg);
    this.setPathname(path);
    this.setOpen(true);
  }

  handleClose(event, reason) {
    const { pathname } = this.state;
    if (reason === "clickaway") {
      return;
    }
    this.setOpen(false);
    if (pathname != ""){
      this.refresh();
    }
  }

  render() {
    const { open, isSuccess, status, message } = this.state;
    return (
      <>
        <Snackbar
          contentprops={{
            "aria-describedby": "message-id"
          }}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            style={{
              backgroundColor: isSuccess ? "#4caf50" : "#f44336"
            }}
            // prettier-ignore
            message={(
              <Box id='message-id' className="snackMessage">
                {isSuccess ? 
                  <CheckCircle className="iconPadding" /> : 
                  <Error className="iconPadding" />}
                {message || `Form submission status: ${status}`}
              </Box>
            )}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={this.handleClose}
              >
                <Close />
              </IconButton>
            ]}
          />
        </Snackbar>
      </>
    );
  }
}

SnackbarMessage.propTypes = {
  history: PropTypes.func.isRequired
}

export function snackbar(status, message, pathname = "") {
  openSnackbarFn(status, message, pathname);
}