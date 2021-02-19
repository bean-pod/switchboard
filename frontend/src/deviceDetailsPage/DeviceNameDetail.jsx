import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import * as DeviceApi from "../api/DeviceApi";

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
  // const history = useHistory();

  setName(updatedName) {
    this.setState({ name: updatedName });
  }

  startEdit() {
    this.setState({ editing: true });
  }

  cancelEditing() {
    this.setState({ editing: false });
  }

  confirmEditing() {
    // api call
    const { updatedName } = this.state.name;
    DeviceApi.updateDeviceName(this.deviceId, updatedName);
    // history (refresh)
    // history.go(0);
    window.location.reload();
    this.setState({ editing: false });
  }

  renderStaticName() {
    return (
      <>
        <Box className="flexContents">
          <div className="title">{this.deviceName}</div>
          <Box padding={4} paddingLeft={1} paddingBottom={0}>
            <Button>
              <EditIcon id="editBtn" color="action" onClick={this.startEdit} />
            </Button>
          </Box>
        </Box>
      </>
    );
  }

  renderEditName() {
    return (
      <>
        <form className="deviceNameEditForm" onSubmit={this.confirmEditing}>
          <Box className="flexContents">
            <TextField
              id="deviceName"
              name="deviceName"
              required
              defaultValue={this.deviceName}
              label="Device Name"
              onChange={(event) => this.setName(event.target.value)}
            />
            <Box padding={4} paddingLeft={1} paddingRight={1}>
              <Button
                id="cancelEditBtn"
                onClick={this.cancelEditing}
                variant="contained"
                disableElevation
              >
                Cancel
              </Button>
            </Box>
            <Box padding={4} paddingLeft={0}>
              <Button
                id="confirmEditBtn"
                type="submit"
                color="primary"
                variant="contained"
                disableElevation
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </form>
      </>
    );
  }

  render() {
    return (
      <>
        <div>
          {this.state.editing ? this.renderEditName() : this.renderStaticName()}
        </div>
      </>
    );
  }
}

DeviceNameDetail.propTypes = {
  deviceName: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
};
