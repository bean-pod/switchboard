import React from "react";
import { useHistory } from "react-router-dom";
import {
  Snackbar,
  SnackbarContent,
  IconButton,
  Button,
  Box
} from "@material-ui/core";
import { CheckCircle, Error, Close } from "@material-ui/icons";

let openSnackbarFn = function () {};

export default function SnackbarMessage() {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [pathname, setPathname] = React.useState("");

  const history = useHistory();

  function openSnackbar(stat, msg, path) {
    setOpen(true);
    if (stat === "success") {
      setIsSuccess(true);
    }
    setMessage(msg);
    setPathname(path);
  }

  React.useEffect(() => {
    openSnackbarFn = openSnackbar;
  }, []);

  function refresh() {
    if (history.location.pathname.endsWith(pathname)) {
      history.go(0);
    } else {
      history.push(`/${pathname}`);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setStatus("");
    setMessage("");
    setPathname("");
    refresh();
  };

  return (
    <>
      <Snackbar
        status={status}
        contentprops={{
          "aria-describedby": "message-id"
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{
            backgroundColor: isSuccess ? "#4caf50" : "#f44336"
          }}
          // prettier-ignore
          message={(
            <Box id='message-id' className="snackMessage">
              {status === "success" ? 
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
              onClick={handleClose}
            >
              <Close />
            </IconButton>
          ]}
        />
      </Snackbar>
    </>
  );
}

export function snackbar(status, message, pathname) {
  openSnackbarFn(status, message, pathname);
}
