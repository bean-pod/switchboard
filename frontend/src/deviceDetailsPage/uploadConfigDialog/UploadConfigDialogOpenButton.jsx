import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

import UploadConfigDialog from "../configuration/UploadConfigDialog";
import DeviceInfo from "../../model/DeviceInfo";

export default class UploadConfigDialogOpenButton extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.openDialog = this.openDialog.bind(this);
  }

  openDialog() {
    this.dialogElement.current.openDialog();
  }

  render() {
    const {
      device: { serialNumber }
    } = this.props;
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUpload />}
          onClick={this.openDialog}
        >
          Upload New
        </Button>

        <UploadConfigDialog ref={this.dialogElement} deviceId={serialNumber} />
      </>
    );
  }
}

UploadConfigDialogOpenButton.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
