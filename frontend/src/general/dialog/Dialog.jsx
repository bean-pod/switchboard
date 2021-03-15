import React from "react";
import PropTypes from "prop-types";

import MuiDialog from "@material-ui/core/Dialog/Dialog";
import { DialogTitle } from "@material-ui/core";
import DialogBody from "./DialogBody";
import DialogSingleButton from "./DialogSingleButton";
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
    const cancelButton = {
      name: "Cancel",
      onClick: this.closeDialog
    };

    const okButton = {
      name: "OK",
      onClick: this.closeDialog
    }

    const { title, actionButton, children, noCancel } = this.props;
    const { open } = this.state;
    return (
      <MuiDialog
        open={open}
        onClose={() => this.closeDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        id="dialog"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogBody>{children}</DialogBody>
        {noCancel ? (
          <DialogSingleButton button={okButton} />
        ) : (
          <DialogButtons button1={cancelButton} button2={actionButton} />
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
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  noCancel: PropTypes.bool
};

Dialog.defaultProps = {
  noCancel: false
};
