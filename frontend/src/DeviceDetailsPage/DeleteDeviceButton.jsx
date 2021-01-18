import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import * as DeviceApi from "../api/DeviceApi";

export default function DeleteDeviceButton(props) {
  const { deviceType, deleteId } = props;
  const [open, setOpen] = React.useState(false);
  const openDeleteDialog = () => {
    return setOpen(true);
  };
  const cancelDelete = () => {
    return setOpen(false);
  };
  const confirmDelete = () => {
    if (deviceType === "encoder") {
      DeviceApi.deleteSender(deleteId);
    } else {
      DeviceApi.deleteReceiver(deleteId);
    }
    return setOpen(false);
  };

  return (
    <>
      <Button id="deleteBtn" variant="outlined" onClick={openDeleteDialog}>
        Delete
      </Button>
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
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteDeviceButton.propTypes = {
  deviceType: PropTypes.string.isRequired,
  deleteId: PropTypes.string.isRequired
};
