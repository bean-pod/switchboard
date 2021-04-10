import React from "react";
import PropTypes from "prop-types";

import MuiDialog from "@material-ui/core/Dialog/Dialog";
import { DialogTitle } from "@material-ui/core";
import DialogBody from "./DialogBody";
import DialogButtons from "./DialogButtons";

export default class Dialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    return this.setState({ open: true });
  }

  closeDialog() {
    return this.setState({ open: false });
  }

  render() {
    const { title, actionButton, children, isError } = this.props;
    const { open } = this.state;

    const button = {
      name: actionButton ? "Cancel" : "OK",
      onClick: this.closeDialog
    };

    return (
      <MuiDialog
        open={open}
        onClose={() => this.closeDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        id="dialog"
      >
        <DialogTitle className={isError ? "warningText" : undefined}>
          {title}
        </DialogTitle>
        <DialogBody>{children}</DialogBody>
        {actionButton ? (
          <DialogButtons button1={button} button2={actionButton} />
        ) : (
          <DialogButtons button1={button} />
        )}
      </MuiDialog>
    );
  }
}

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  actionButton: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isError: PropTypes.bool
};

Dialog.defaultProps = {
  isError: false,
  actionButton: undefined
};
