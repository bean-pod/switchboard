import React from "react";
import PropTypes from "prop-types";
import Dialog from "../dialog/Dialog";

export default class FormFailedDialog extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    return this.dialogElement.current.openDialog();
  }

  closeDialog() {
    return this.dialogElement.current.closeDialog();
  }

  render() {
    const { title, message, closeFn } = this.props;

    const actionButton = {
      name: "OK",
      onClick: closeFn
    };

    return (
      <Dialog
        ref={this.dialogElement}
        title={title}
        actionButton={actionButton}
        noCancel
      >
        {message}
      </Dialog>
    );
  }
}

FormFailedDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};
