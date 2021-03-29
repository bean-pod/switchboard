import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

import TitleButtons from "./TitleButtons";

export default function Title(props) {
  const { title, buttonType } = props;
  return (
    <Box className="flexContents headerAreaUnderline">
      <div className="title">{title}</div>
      {buttonType ? <TitleButtons type={buttonType} /> : <></>}
    </Box>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired
};
