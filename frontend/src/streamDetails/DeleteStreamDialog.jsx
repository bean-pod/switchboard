import React from "react";
import PropTypes from "prop-types";

import Dialog from "../general/dialog/Dialog";
import { deleteStream } from "../api/StreamApi";
import { snackbar } from "../general/SnackbarMessage";

export default class DeleteStreamDialog extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.afterDelete = this.afterDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  afterDelete() {
    const { deleteId } = this.props;
    this.dialogElement.current.closeDialog();
    snackbar("success", `Stream ${deleteId} successfully deleted`, "Streams");
  }

  confirmDelete() {
    const { deleteId } = this.props;
    deleteStream(deleteId)
      .then(this.afterDelete)
      .catch(() => {
        snackbar("error", `Failed to delete stream ${deleteId}`);
      });
  }

  // used by Summoner to summon
  openDialog() {
    return this.dialogElement.current.openDialog();
  }

  render() {
    const { deleteId } = this.props;
    const title = "Confirm Delete";
    const message = `Are you sure you want to end stream ${deleteId}?`;

    const actionButton = {
      name: "Confirm",
      onClick: this.confirmDelete
    };

    return (
      <Dialog
        ref={this.dialogElement}
        title={title}
        actionButton={actionButton}
      >
        {message}
      </Dialog>
    );
  }
}

DeleteStreamDialog.propTypes = {
  deleteId: PropTypes.number.isRequired
};
