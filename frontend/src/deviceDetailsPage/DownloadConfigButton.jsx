import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";

import DeviceInfo from "../model/DeviceInfo";

export default class DownloadConfigButton extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload() {
    const { device } = this.props;
    const thing = device.configuration;
  }

  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        startIcon={<GetApp />}
        onClick={this.handleDownload}
      >
        Download
      </Button>
    );
  }
}

DownloadConfigButton.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
