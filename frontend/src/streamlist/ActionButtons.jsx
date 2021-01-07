import React from "react";
import { IconButton } from "@material-ui/core";
import { Block, Pause, Sync } from "@material-ui/icons";

import AlertDialog from "../general/ConfirmDeleteDialog";

export default function ActionButtons() {
  const [open, setOpen] = React.useState(false);
  const openDeleteDialog = () => setOpen(true);
  const cancelDelete = () => setOpen(false);
  const confirmDelete = () => setOpen(false); // call hook here, actually

  return (
    <>
      <div align="center">
        <IconButton>
          <Sync />
        </IconButton>
        <IconButton>
          <Pause />
        </IconButton>
        <IconButton onClick={openDeleteDialog}>
          <Block />
        </IconButton>
        <AlertDialog
          open={open}
          onCancel={cancelDelete}
          onDelete={confirmDelete}
          message="end this stream"
        />
      </div>
    </>
  );
}
