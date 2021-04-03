import React from "react";
import PropTypes from "prop-types";

import DeviceInfo from "../model/DeviceInfo";
import SelectedDeviceCard from "./SelectedDeviceCard";
import UnselectedDeviceCard from "./UnselectedDeviceCard";

export default function CreateStreamCardToggler(props) {
  const { title, openDialog, device, channelIndex } = props;
  if (deviceIndex != -1) {
    return (
      <SelectedDeviceCard
        title={title}
        openDialog={openDialog}
        device={device}
        channelId={device.channels[channelIndex]}
      />
    );
  }
  return <UnselectedDeviceCard title={title} onClick={openDialog} />;
}

CreateStreamCardToggler.propTypes = {
  title: PropTypes.string.isRequired,
  openDialog: PropTypes.func.isRequired,
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  channelIndex: PropTypes.number.isRequired
};
