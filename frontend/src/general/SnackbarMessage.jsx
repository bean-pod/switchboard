import React from "react";
import { Snackbar, SnackbarContent, IconButton, Box } from "@material-ui/core";
import { CheckCircle, Error, Close } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function SnackbarMessage(props) {
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const { status, msg } = props;

  React.useEffect(() => {
    setOpen(true);
    if (status === "success") {
      setIsSuccess(true);
    }
  }, [status, msg]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
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
            <Box id='message-id' style={{ display: "flex", alignItems: "center" }}>
              {status === "success" ? 
                <CheckCircle style={{ margin: "0.6rem" }} /> : 
                <Error style={{ margin: "0.6rem" }} />}
              {msg || `Form submission status: ${status}`}
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
SnackbarMessage.propTypes = {
  status: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired
};
