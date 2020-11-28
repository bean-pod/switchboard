import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import DeviceInfo from "../model/DeviceInfo";

export default function DeviceDetailsNotesPanel() {
  const { extras } = props.device;
  return <Container>{extras}</Container>;
}

DeviceDetailsNotesPanel.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
