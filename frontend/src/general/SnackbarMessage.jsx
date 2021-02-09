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
import PropTypes from "prop-types";

export default function SnackbarMessage(props) {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const { status, msg, pathname } = props;

  const history = useHistory();

  React.useEffect(() => {
    setOpen(true);
    if (status === "success") {
      setIsSuccess(true);
    }
  }, [status]);

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
              {msg || `Form submission status: ${status}`}
            </Box>
          )}
          action={[
            <Button
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={refresh}
            >
              Refresh
            </Button>,
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
SnackbarMessage.propTypes = {
  status: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired
};
