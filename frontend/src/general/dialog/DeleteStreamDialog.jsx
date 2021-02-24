import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import Dialog from "./Dialog";
import * as StreamApi from "../../api/StreamApi";

export default class DeleteStreamDialog extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.useRef();
    this.confirmDelete = this.confirmDelete.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  confirmDelete() {
    const history = useHistory();
    StreamApi.deleteStream(this.deleteId, () => {
      history.push("/Streaming");
      history.go(0);
    });
    return this.dialogElement.current.closeDialog();
  }

  openDialog() {
    return this.dialogElement.current.openDialog();
  }

  render() {
    const { deleteId } = this.props;
    const message = `Are you sure you want to end stream ${deleteId}?`;

    return <Dialog ref={this.dialogElement}>{message}</Dialog>;
  }
}

DeleteStreamDialog.propTypes = {
  deleteId: PropTypes.number.isRequired
};
