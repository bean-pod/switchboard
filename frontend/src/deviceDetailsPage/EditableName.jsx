import React from "react";
import PropTypes from "prop-types";
import { Box, IconButton, TextField } from "@material-ui/core";
import { Cancel, Save } from "@material-ui/icons";

export default function EditableName(props) {
  const { confirmEditing, deviceName, setName, cancelEditing } = props;
  return (
    <form className="deviceNameEditForm" onSubmit={confirmEditing}>
      <Box className="flexContents">
        <TextField
          id="deviceName"
          name="deviceName"
          required
          defaultValue={deviceName}
          onChange={(event) => setName(event.target.value)}
        />
        <IconButton id="cancelEditBtn" onClick={cancelEditing}>
          <Cancel />
        </IconButton>

        <IconButton id="confirmEditBtn" type="submit" color="primary">
          <Save />
        </IconButton>
      </Box>
    </form>
  );
}

EditableName.propTypes = {
  confirmEditing: PropTypes.func.isRequired,
  deviceName: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired
};
