import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import * as DeviceApi from "../api/DeviceApi";

export default function DeviceNameDetail(props) {
  const { deviceName, deviceId } = props;
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState(deviceName);
  const history = useHistory();

  const startEdit = () => {
    return setEditing(true);
  };

  const cancelEditing = () => {
    return setEditing(false);
  };

  const confirmEditing = () => {
    // api call
    DeviceApi.updateDeviceName(deviceId, name);
    // history (refresh)
    history.go(0);
    return setEditing(false);
  };

  function renderStaticName() {
    return (
      <>
        <Box className="flexContents">
          <div className="title">{name}</div>
          <Box padding={4} paddingLeft={1} paddingBottom={0}>
            <Button>
              <EditIcon id="editBtn" color="action" onClick={startEdit} />
            </Button>
          </Box>
        </Box>
      </>
    );
  }

  function renderEditName() {
    return (
      <>
        <form className="deviceNameEditForm" onSubmit={confirmEditing}>
          <Box className="flexContents">
            <TextField
              id="deviceName"
              name="deviceName"
              required
              defaultValue={name}
              label="Device Name"
              onChange={(event) => setName(event.target.value)}
            />
            <Box padding={4} paddingLeft={1} paddingRight={1}>
              <Button
                id="cancelEditBtn"
                onClick={cancelEditing}
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

  return (
    <>
      <div>{editing ? renderEditName() : renderStaticName()}</div>
    </>
  );
}

DeviceNameDetail.propTypes = {
  deviceName: PropTypes.string.isRequired,
  deviceId: PropTypes.string.isRequired
};
