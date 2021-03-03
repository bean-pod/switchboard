import React from "react";
import PropTypes from "prop-types";
import { Container, Paper } from "@material-ui/core";

export default function DeviceDetailsNotesPanel(props) {
  const { extras } = props;
  return <Container component={Paper}>{extras}</Container>;
}

DeviceDetailsNotesPanel.propTypes = {
  extras: PropTypes.arrayOf(PropTypes.string).isRequired
};
