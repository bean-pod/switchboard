import React from "react";
import PropTypes from "prop-types";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

export default function DialogTitle(props) {
  const { children } = props;
  return (
    <MuiDialogTitle id="delete-stream-dialog-title">{children}</MuiDialogTitle>
  );
}

DialogTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string
  ]).isRequired
};
