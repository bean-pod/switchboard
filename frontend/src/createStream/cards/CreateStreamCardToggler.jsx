import React from "react";
import PropTypes from "prop-types";

import SelectedDeviceCard from "./SelectedDeviceCard";
import UnselectedDeviceCard from "./UnselectedDeviceCard";
import DeviceInfo from "../../model/DeviceInfo";

export default function CreateStreamCardToggler(props) {
  const { title, openDialog, deviceIndex, deviceList, channelIndex } = props;
  if (deviceIndex !== -1 && channelIndex !== -1) {
    return (
      <SelectedDeviceCard
        title={title}
        openDialog={openDialog}
        device={deviceList[deviceIndex]}
        channelId={deviceList[deviceIndex].channels[channelIndex].port}
      />
    );
  }
  return <UnselectedDeviceCard title={title} onClick={openDialog} />;
}

CreateStreamCardToggler.propTypes = {
  title: PropTypes.string.isRequired,
  openDialog: PropTypes.func.isRequired,
  deviceIndex: PropTypes.number.isRequired,
  deviceList: PropTypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired,
  channelIndex: PropTypes.number.isRequired
};
