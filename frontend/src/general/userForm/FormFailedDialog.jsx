import React from "react";
import PropTypes from "prop-types";
import Dialog from "../dialog/Dialog";

export default class FormFailedDialog extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.openDialog = this.openDialog.bind(this);
  }

  openDialog() {
    return this.dialogElement.current.openDialog();
  }

  render() {
    const { title, message } = this.props;

    return (
      <Dialog
        ref={this.dialogElement}
        title={title}
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
