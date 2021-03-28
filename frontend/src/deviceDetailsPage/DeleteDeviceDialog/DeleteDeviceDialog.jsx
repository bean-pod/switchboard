import React from "react";
import PropTypes from "prop-types";

import Dialog from "../../general/dialog/Dialog";
import { deleteDevice } from "../../api/DeviceApi";
import DeviceInfo from "../../model/DeviceInfo";
import { snackbar } from "../../general/SnackbarMessage";

export default class DeleteDeviceDialog extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.afterDelete = this.afterDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.openDialog = this.openDialog.bind(this);
  }

  afterDelete() {
    const {
      device: { serialNumber }
    } = this.props;
    this.dialogElement.current.closeDialog();
    snackbar(
      "success",
      `Device deleted! (Serial Number: ${serialNumber})`,
      "Devices"
    );
  }

  confirmDelete() {
    const {
      device: { serialNumber }
    } = this.props;
    deleteDevice(serialNumber)
      .then(this.afterDelete)
      .catch(() => {
        snackbar(
          "error",
          `Could not delete device (Serial Number: ${serialNumber})`
        );
      });
  }

  // used by Summoner to summon
  openDialog() {
    return this.dialogElement.current.openDialog();
  }

  render() {
    const { device } = this.props;
    const title = "Confirm Delete";
    const message = `Are you sure you want to delete ${device.name}?`;

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

DeleteDeviceDialog.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
