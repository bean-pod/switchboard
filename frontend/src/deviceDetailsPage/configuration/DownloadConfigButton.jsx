import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";

import DeviceInfo from "../../model/DeviceInfo";

export default class DownloadConfigButton extends React.Component {
  constructor(props) {
    super(props);

    this.dialogElement = React.createRef();
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload() {
    const { device } = this.props;
    if (!device.extras) return;
    const filename = `${device.serialNumber}.config`;
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${atob(device.extras)}`
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  render() {
    const { device } = this.props;
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={this.handleDownload}
        startIcon={<GetApp />}
        disabled={!device.extras}
      >
        Download
      </Button>
    );
  }
}

DownloadConfigButton.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
