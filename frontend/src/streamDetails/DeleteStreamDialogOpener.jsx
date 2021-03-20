import React from "react";
import PropTypes from "prop-types";
import { Button, Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { withRouter } from "react-router-dom";

import DeleteStreamDialog from "./DeleteStreamDialog";

class DeleteStreamDialogOpener extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.openDialog = this.openDialog.bind(this);
  }

  openDialog() {
    this.dialogElement.current.openDialog();
  }

  render() {
    const { deleteId } = this.props;
    return (
      <>
        <Tooltip title="Delete Stream" aria-label="delete stream">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={this.openDialog}
          >
            Delete
          </Button>
        </Tooltip>
        <DeleteStreamDialog ref={this.dialogElement} deleteId={deleteId} />
      </>
    );
  }
}

export default withRouter(DeleteStreamDialogOpener);

DeleteStreamDialogOpener.propTypes = {
  deleteId: PropTypes.number.isRequired
};
