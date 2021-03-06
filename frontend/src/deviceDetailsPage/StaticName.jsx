import React from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

export default function StaticName(props) {
  const { deviceName, startEditing } = props;
  return (
    <>
      {deviceName}
      <div className="alignRightFloat">
        <IconButton
          id="editBtn"
          size="small"
          color="action"
          onClick={startEditing}
        >
          <Edit />
        </IconButton>
      </div>
    </>
  );
}

StaticName.propTypes = {
  deviceName: PropTypes.string.isRequired,
  startEditing: PropTypes.func.isRequired
};
