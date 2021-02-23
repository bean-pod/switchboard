import React from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

export default function DialogTitle(props) {
  const { children } = props;
  return (
    <MuiDialogTitle id="delete-stream-dialog-title">{children}</MuiDialogTitle>
  );
}
