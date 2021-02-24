import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { withRouter } from "react-router-dom";

import DeleteStreamDialog from "./DeleteStreamDialog";

class DeleteStreamDialogSummoner extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
  }

  openDeleteDialog() {
    this.dialogElement.current.openDialog();
  }

  render() {
    const { deleteId, history } = this.props;
    return (
      <>
        <Tooltip title="Delete Stream" aria-label="delete stream">
          <IconButton onClick={this.openDeleteDialog}>
            <Delete />
          </IconButton>
        </Tooltip>
        <DeleteStreamDialog
          ref={this.dialogElement}
          deleteId={deleteId}
          history={history}
        />
      </>
    );
  }
}

export default withRouter(DeleteStreamDialogSummoner);

DeleteStreamDialogSummoner.propTypes = {
  deleteId: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  }).isRequired
};
