import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog/Dialog";
import SwipeableViews from "react-swipeable-views";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { Button, MobileStepper } from "@material-ui/core";
import SelectDeviceSwipeableSteps from "./SwipeableSteps/SelectDeviceSwipeableSteps";

export default class SelectDeviceDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    return this.setState({ open: true });
  }

  closeDialog() {
    return this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const {
      deviceList,
      deviceIndex,
      setDeviceIndex,
      channelIndex,
      setChannelIndex
    } = this.props;

    return (
      <Dialog
        open={open}
        onClose={() => this.closeDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        id="dialog"
      >
        <SelectDeviceSwipeableSteps
          handleClose={this.closeDialog}
          deviceList={deviceList}
          deviceIndex={deviceIndex}
          setDeviceIndex={setDeviceIndex}
          channelIndex={channelIndex}
          setChannelIndex={setChannelIndex}
        />
      </Dialog>
    );
  }
}

SelectDeviceDialog.propTypes = {
  deviceList: Proptypes.arrayOf(
      PropTypes.instanceOf(DeviceInfo)
  ).isRequired,
  deviceIndex: PropTypes.number.isRequired,
  setDeviceIndex: PropTypes.func.isRequired,
  channelIndex: PropTypes.number.isRequired,
  setChannelIndex: PropTypes.func.isRequired,
};
