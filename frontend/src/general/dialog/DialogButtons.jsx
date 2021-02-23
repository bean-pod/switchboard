import React from "react";
import { MuiDialogActions, Button } from "@material-ui/core";

export default function DialogButtons(props) {
    const { name1, onClick1, name2, onClick2 } = props;

  return (
    <MuiDialogActions>
      <Button onClick={onClick1} color="primary">
        {name1}
      </Button>
      <Button onClick={onClick2} color="secondary" autoFocus>
        {name2}
      </Button>
    </MuiDialogActions>
  );
}
