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
    const { errorMessage } = this.props;

    return (
      <Dialog ref={this.dialogElement} title="Failed to create user" isError>
        {errorMessage}
      </Dialog>
    );
  }
}

FormFailedDialog.propTypes = {
  errorMessage: PropTypes.string.isRequired
};
