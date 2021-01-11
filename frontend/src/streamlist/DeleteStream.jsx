import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as StreamApi from "../api/StreamApi";

export default function DeleteStream(props) {
  const { deleteId } = props;
  const [open, setOpen] = React.useState(false);
  const openDeleteDialog = () => {
    return setOpen(true);
  };
  const cancelDelete = () => {
    return setOpen(false);
  };
  const confirmDelete = () => {
    StreamApi.deleteStream(deleteId);
    return setOpen(false);
  };

  return (
    <>
      <IconButton onClick={openDeleteDialog}>
        <Delete />
      </IconButton>
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
            {`Are you sure you want to end stream ${deleteId}?`}
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

DeleteStream.propTypes = {
  deleteId: PropTypes.objectOf(PropTypes.number).isRequired
};
