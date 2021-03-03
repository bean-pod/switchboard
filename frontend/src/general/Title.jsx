import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

export default function Title(props) {
  const { title } = props;
  return (
    <Box className="flexContents headerAreaUnderline">
      <div className="title">{title}</div>
    </Box>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired
};
