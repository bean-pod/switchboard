import React from "react";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogContentText from "@material-ui/core/DialogContentText";

export default function DialogBody(props) {
  const { children } = props;
  return (
    <MuiDialogContent>
      <MuiDialogContentText id="dialog-description">
        {children}
      </MuiDialogContentText>
    </MuiDialogContent>
  );
}
