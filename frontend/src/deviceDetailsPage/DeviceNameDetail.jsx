import React from "react";
import PropTypes from "prop-types";
import * as DeviceApi from "../api/DeviceApi";
import EditableName from "./EditableName";
import StaticName from "./StaticName";

export default class DeviceNameDetail extends React.Component {
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

    DeviceApi.updateDeviceName(this.deviceId, newName).catch(() => {
      // If update was unsuccessful, return to the old name
      this.deviceName = oldName;
      this.forceUpdate();
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

DeviceNameDetail.propTypes = {
  deviceName: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
};
