import React from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

function renderStaticName(name, setEdit) {
  return (
    <>
      <div className="title">{name}</div>
      <Box padding={4} paddingLeft={1} paddingBottom={0}>
        <Button>
          <EditIcon color="action" onClick={setEdit(true)} />
        </Button>
      </Box>
    </>
  );
}

function renderEditName(name, setEdit) {
  // const confirmEdit = () => {};
  // const cancelEdit = () => {};
  return <>tee hee set edit stuff here wink</>;
}

export default function DeviceNameDetail(props) {
  const { deviceName } = props;
  const [editing, setEdit] = React.useState(false);
  return (
    <>
      {editing
        ? renderStaticName(deviceName, setEdit)
        : renderEditName(deviceName, setEdit)}
      <br />
      editing is:
      {edit}
    </>
  );
}

DeviceNameDetail.propTypes = {
  deviceName: PropTypes.string.isRequired
};
