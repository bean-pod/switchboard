import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import MuiDialogActions from "@material-ui/core/DialogActions";

export default function DialogButtons(props) {
  const { button1, button2 } = props;

  return (
    <MuiDialogActions>
      {button2 === undefined ? (
        <Button onClick={button1.onClick} color="primary">
          {button1.name}
        </Button>
      ) : (
        <>
          <Button onClick={button1.onClick} color="primary">
            {button1.name}
          </Button>
          <Button onClick={button2.onClick} color="secondary" autoFocus>
            {button2.name}
          </Button>
        </>
      )}
    </MuiDialogActions>
  );
}

DialogButtons.propTypes = {
  button1: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }).isRequired,
  button2: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  })
};

DialogButtons.defaultProps = {
  button2: undefined
};
