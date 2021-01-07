import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";

export default function ConfirmDeleteDialog(props) {
  const { open, onCancel, onConfirm, message } = props;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm Action</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to
          {message}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDeleteDialog.propTypes = {
  open: PropTypes.objectOf(PropTypes.bool).isRequired,
  onCancel: PropTypes.objectOf(PropTypes.func).isRequired,
  onConfirm: PropTypes.objectOf(PropTypes.func).isRequired,
  message: PropTypes.objectOf(PropTypes.string).isRequired
};
