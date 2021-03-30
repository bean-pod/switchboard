import React from "react";
import PropTypes from "prop-types";
import { Input } from "@material-ui/core";

import Dialog from "../../general/dialog/Dialog";

import { uploadConfiguration } from "../../api/DeviceApi";

export default class UploadConfigDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    };

    this.dialogElement = React.createRef();
    this.openDialog = this.openDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.afterUpload = this.afterUpload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  handleChange(event) {
    this.setState({
      file: event.target.files[0]
    });
  }

  handleUpload() {
    const { deviceId } = this.props;
    const { file } = this.state;
    uploadConfiguration(deviceId, file)
      .then(() => {
        this.afterUpload();
      })
  }

  afterUpload() {
    this.dialogElement.current.closeDialog();
  }

  // used by Summoner to summon
  openDialog() {
    return this.dialogElement.current.openDialog();
  }

  render() {
    const title = "Upload a file";
    const actionButton = {
      name: "Upload",
      onClick: this.handleUpload
    };
    return (
      <Dialog
        ref={this.dialogElement}
        title={title}
        actionButton={actionButton}
      >
        <Input
          type="file"
          name="file"
          disableUnderline
          onChange={this.handleChange}
        />
      </Dialog>
    );
  }
}

UploadConfigDialog.propTypes = {
  deviceId: PropTypes.string.isRequired
};
