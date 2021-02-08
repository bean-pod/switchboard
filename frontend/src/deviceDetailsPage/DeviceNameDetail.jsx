import React from "react";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

export default function DeviceNameDetail(props) {
  const { deviceName } = props;
  const [editing, setEditing] = React.useState(false);

  const startEdit = () => {
    return setEditing(true);
  };

  const cancelEditing = () => {
    return setEditing(false);
  };

  const confirmEditing = () => {
    // api call
    // history (refresh)
    return setEditing(false);
  };

  function renderStaticName() {
    return (
      <>
        <Box className="flexContents">
          <div className="title">{deviceName}</div>
          <Box padding={4} paddingLeft={1} paddingBottom={0}>
            <Button>
              <EditIcon color="action" onClick={startEdit} />
            </Button>
          </Box>
        </Box>
      </>
    );
  }

  function renderEditName() {
    return (
      <>
        <Box className="flexContents">
          <TextField
            id="editDeviceNameField"
            required
            defaultValue={deviceName}
            label="Device Name"
          />
          <Box padding={4} paddingLeft={1}>
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
              onClick={confirmEditing}
              color="primary"
              variant="contained"
              disableElevation
            >
              Confirm
            </Button>
          </Box>
        </Box>
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
  deviceName: PropTypes.string.isRequired
};
