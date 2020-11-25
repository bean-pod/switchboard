import React from "react";
import PropTypes from "prop-types";
import { Container } from "@material-ui/core";
import DeviceInfo from "../model/DeviceInfo";

export default class DeviceDetailsNotesPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Container>{this.props.device.extras}</Container>;
  }
}

DeviceDetailsNotesPanel.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
