import React from "react";
import { useHistory } from "react-router-dom";
import { Snackbar, SnackbarContent, IconButton, Box } from "@material-ui/core";
import { CheckCircle, Error, Close } from "@material-ui/icons";

let openSnackbarFn;

export default function SnackbarMessage() {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [status, setStatus] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [pathname, setPathname] = React.useState("");

  const history = useHistory();

  function openSnackbar(stat, msg, path) {
    setOpen(true);
    setStatus(stat);
    if (stat === "success") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
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

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    refresh();
  }

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
        data-testid="snackbar-root"
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
