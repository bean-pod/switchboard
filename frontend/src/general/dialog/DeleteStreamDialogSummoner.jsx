import React from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import DeleteStreamDialog from "./DeleteStreamDialog";

export default class DeleteStreamDialogSummoner extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.openDeleteDialog = this.openDeleteDialog.bind(this);
  }

  openDeleteDialog() {
    this.dialogElement.current.openDialog();
  }

  render() {
    const { deleteId } = this.props;
    return (
      <>
        <Tooltip title="Delete Stream" aria-label="delete stream">
          <IconButton onClick={this.openDeleteDialog}>
            <Delete />
          </IconButton>
        </Tooltip>
        <DeleteStreamDialog ref={this.dialogElement} deleteId={deleteId} />
      </>
    );
  }
}

DeleteStreamDialogSummoner.propTypes = {
  deleteId: PropTypes.string.isRequired
};
