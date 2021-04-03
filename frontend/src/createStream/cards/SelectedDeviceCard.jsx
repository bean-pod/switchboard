import React from "react";
import PropTypes from "prop-types";

import DeviceInfo from "../model/DeviceInfo";
import ButtonInfo from "../../general/dashboard/ButtonInfo";
import StreamDeviceCard from "../../general/StreamDeviceCard";

export default function SelectedDeviceCard(props) {
  const { title, openDialog, device, channelId } = props;
  const button = new ButtonInfo("", { device }, "Edit", openDialog);

  return (
    <StreamDeviceCard
      title={title}
      button={button}
      device={device}
      channel={channelId}
    />
  );
}

SelectedDeviceCard.propTypes = {
  title: PropTypes.string.isRequired,
  openDialog: PropTypes.func.isRequired,
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  channelId: PropTypes.number.isRequired
};
