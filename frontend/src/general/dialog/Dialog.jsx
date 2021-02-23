import React from "react";
import PropTypes from "prop-types";

import MuiDialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "./DialogTitle";
import DialogBody from "./DialogBody";
import DialogButtons from "./DialogButtons";

export default function Dialog(props) {
  const { title, button1, button2, children } = props;
  return (
    <MuiDialog>
      <DialogTitle>{title}</DialogTitle>
      <DialogBody>{children}</DialogBody>
      <DialogButtons button1={button1} button2={button2} />
    </MuiDialog>
  );
}

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  button1: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }).isRequired,
  button2: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
