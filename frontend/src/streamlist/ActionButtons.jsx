import React from "react";
import { IconButton } from "@material-ui/core";
import { Block, Pause, Sync } from "@material-ui/icons";

import ConfirmDeleteDialog from "../general/ConfirmDeleteDialog";

export default function ActionButtons() {
  const [open, setOpen] = React.useState(false);
  const openDeleteDialog = () => setOpen(true); // problem is here with how we're defining these methods
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
        <ConfirmDeleteDialog
          open={open}
          onCancel={cancelDelete}
          onDelete={confirmDelete}
          message="end this stream"
        />
      </div>
    </>
  );
}
