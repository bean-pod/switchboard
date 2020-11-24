import { Container } from "@material-ui/core";
import React from "react";

export default class DeviceDetailsNotesPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Container>{this.props.device.extras}</Container>;
  }
}
