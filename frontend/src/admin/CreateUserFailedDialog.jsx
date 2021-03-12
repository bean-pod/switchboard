import React from "react";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  title: {
    color: "#ef5350"
  }
}));

export default function CreateUserFailedDialog(props) {
  const classes = useStyles();
  const { open, setOpen, message } = props;

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle id="login-failed-dialog-title" className={classes.title}>
          Failed to create a user
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="login-failed-dialog-description">
            {message}
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

CreateUserFailedDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired
};
