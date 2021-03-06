import React from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Cancel, Save } from "@material-ui/icons";
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
    const { name } = this.state;
    DeviceApi.updateDeviceName(this.deviceId, name).then(() => {
      // check response OK to update deviceName
      this.deviceName = name;
    });

    this.setState({ editing: false });
  }

  renderStaticName() {
    const { name } = this.state;
    return (
      <>
        {name}
        <div className="alignRightFloat">

          <Button>
            <EditIcon id="editBtn" color="action" onClick={this.startEdit} />
          </Button>
        </div>
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
              <IconButton
                id="cancelEditBtn"
                onClick={this.cancelEditing}
                variant="contained"
                disableElevation
              >
                <Cancel />
              </IconButton>
            </Box>
            <Box padding={4} paddingLeft={0}>
              <IconButton
                id="confirmEditBtn"
                type="submit"
                color="primary"
                variant="contained"
                disableElevation
              >
                <Save />
              </IconButton>
            </Box>
          </Box>
        </form>
      </>
    );
  }

  render() {
    const { editing } = this.state;
    return (
      <>
        <div>{editing ? this.renderEditName() : this.renderStaticName()}</div>
      </>
    );
  }
}

DeviceNameDetail.propTypes = {
  deviceName: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
};
