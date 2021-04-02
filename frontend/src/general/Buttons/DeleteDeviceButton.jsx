import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MenuItem } from "@material-ui/core";

import * as DeviceApi from "../../api/DeviceApi";
import { snackbar } from "../SnackbarMessage";

function renderDeleteButton(openDeleteDialog) {
  return (
    <Button
      id="deleteBtn"
      variant="outlined"
      color="secondary"
      onClick={openDeleteDialog}
    >
      Delete
    </Button>
  );
}

function renderDeleteMenuItem(openDeleteDialog) {
  return (
    <MenuItem onClick={openDeleteDialog}>
      <span className="warningText">Delete</span>
    </MenuItem>
  );
}

export default function DeleteDeviceButton(props) {
  const { button, deleteId } = props;
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const openDeleteDialog = () => {
    return setOpen(true);
  };
  const cancelDelete = () => {
    return setOpen(false);
  };
 
  const confirmDelete = () => {
    DeviceApi.deleteDevice(deleteId)
      .then(() => {
        if (history.location.pathname.endsWith("Devices")) {
          history.go(0);
        } else {
          history.push("/Devices");
        }
        snackbar("success", `Device deleted! (Serial Number: ${deleteId})`);
      })
      .catch(() => {
        snackbar(
          "error",
          `Could not delete device (Serial Number: ${deleteId})`
        );
      });
    return setOpen(false);
  };

  return (
    <>
      {button
        ? renderDeleteButton(openDeleteDialog)
        : renderDeleteMenuItem(openDeleteDialog)}
      <Dialog
        open={open}
        onClose={cancelDelete}
        aria-labelledby="delete-stream-dialog-title"
        aria-describedby="delete-stream-dialog-description"
        id="delete-stream-dialog"
      >
        <DialogTitle id="delete-stream-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-stream-dialog-description">
            Are you sure you want to delete this device?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button id="cancelDeleteBtn" onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            id="confirmDeleteBtn"
            onClick={confirmDelete}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteDeviceButton.propTypes = {
  button: PropTypes.bool.isRequired,
  deleteId: PropTypes.string.isRequired
};
