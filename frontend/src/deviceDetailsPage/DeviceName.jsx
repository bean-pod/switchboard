import React from "react";
import PropTypes from "prop-types";
import * as DeviceApi from "../api/DeviceApi";
import EditableName from "./EditableName";
import StaticName from "./StaticName";
import { snackbar } from "../general/SnackbarMessage";

export default class DeviceName extends React.Component {
  constructor(props) {
    super(props);
    this.deviceName = props.deviceName;
    this.deviceId = props.deviceId;
    this.state = {
      editing: false,
      name: this.deviceName
    };

    this.startEdit = this.startEdit.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.confirmEditing = this.confirmEditing.bind(this);
    this.setName = this.setName.bind(this);
  }

  setName(updatedName) {
    this.setState({ name: updatedName });
  }

  startEdit() {
    this.setState({ editing: true });
  }

  cancelEditing() {
    this.setState({ name: this.deviceName });
    this.setState({ editing: false });
  }

  confirmEditing(event) {
    // api call
    event.preventDefault();
    const { name: newName } = this.state;
    const oldName = this.deviceName;
    this.deviceName = newName;
    this.setState({ editing: false });

    DeviceApi.updateDeviceName(this.deviceId, newName)
      .then(() => {
        snackbar(
          "success",
          `Device successfully renamed to ${newName}`,
          `Devices/Details/${this.deviceId}`
        );
      })
      .catch(() => {
        // If update was unsuccessful, return to the old name
        this.deviceName = oldName;
        this.forceUpdate();
        snackbar("error", `Failed to rename device`);
      });
  }

  render() {
    const { editing } = this.state;
    return (
      <>
        {editing ? (
          <EditableName
            confirmEditing={this.confirmEditing}
            deviceName={this.deviceName}
            setName={this.setName}
            cancelEditing={this.cancelEditing}
          />
        ) : (
          <StaticName
            deviceName={this.deviceName}
            startEditing={this.startEdit}
          />
        )}
      </>
    );
  }
}

DeviceName.propTypes = {
  deviceName: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
};
