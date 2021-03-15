import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";

export default function DialogSingleButton(props) {
  const { button } = props;

  return (
    <MuiDialogActions>
      <Button onClick={button.onClick} autoFocus>
        {button.name}
      </Button>
    </MuiDialogActions>
  );
}

DialogButtons.propTypes = {
  button: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }).isRequired
};
