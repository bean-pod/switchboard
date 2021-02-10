import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, Button, TextField } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

export default function DeviceNameDetail(props) {
  const { deviceName, deviceId } = props;
  const [editing, setEditing] = React.useState(false);
  const history = useHistory();

  const startEdit = () => {
    return setEditing(true);
  };

  const cancelEditing = () => {
    return setEditing(false);
  };

  const confirmEditing = () => {
    // api call
    // history (refresh)
    history.go(0);
    return setEditing(false);
  };

  function renderStaticName() {
    return (
      <>
        <Box className="flexContents">
          <div className="title">{deviceName}</div>
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
              defaultValue={deviceName}
              label="Device Name"
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
                // onClick={confirmEditing}
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
