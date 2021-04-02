import React from "react";
import { Snackbar, SnackbarContent, IconButton, Box } from "@material-ui/core";
import { CheckCircle, Error, Close } from "@material-ui/icons";

let openSnackbar;

export default class SnackbarMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      status: "",
      message: ""
    };
    this.openSnackbar = this.openSnackbar.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    openSnackbar = this.openSnackbar;
  }

  handleClose(event, reason) {
    if (reason !== "clickaway") {
      return;
    }

    this.setState({
      open: false
    });
  }

  openSnackbar(stat, msg) {
    this.setState({
      open: true,
      status: stat,
      message: msg
    });
  }

  render() {
    const { open, status, message } = this.state;
    const isSuccess = status === "success";
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
          autoHideDuration={3000}
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

export function snackbar(status, message) {
  openSnackbar(status, message);
}
