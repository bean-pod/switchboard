import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

import TitleButtons from "./TitleButtons";

export default function Title(props) {
  const { title, deviceList } = props;
  return (
    <Box className="flexContents headerAreaUnderline">
      <div className="title">{title}</div>
      {deviceList ? <TitleButtons /> : <></>}
    </Box>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  deviceList: PropTypes.bool.isRequired
};
