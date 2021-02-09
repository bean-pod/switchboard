import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

export default function LoginFailedDialog(props) {
  const { open, setOpen } = props;

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle id="login-failed-dialog-title">Login Failed</DialogTitle>
        <DialogContent>
          <DialogContentText id="login-failed-dialog-description">
            Incorrect username and/or password. Please enter the correct
            credentials and try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

LoginFailedDialog.propTypes = {
  open: PropTypes.objectOf(PropTypes.bool).isRequired,
  setOpen: PropTypes.objectOf(PropTypes.func).isRequired
};
