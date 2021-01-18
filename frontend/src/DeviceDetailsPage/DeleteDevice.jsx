import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import * as StreamApi from "../api/StreamApi";

export default function DeleteDevice(props) {
  const { deviceType, deleteId } = props;
  const [open, setOpen] = React.useState(false);
  const openDeleteDialog = () => {
    return setOpen(true);
  };
  const cancelDelete = () => {
    return setOpen(false);
  };
  const confirmDelete = () => {
    // device api call
    return setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={openDeleteDialog}>Delete</Button>
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
            {`Are you sure you want to delete this device?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteDevice.propTypes = {
  deviceType: PropTypes.instanceOf(DeviceInfo).isRequired,
  deleteId: PropTypes.number.isRequired
};
