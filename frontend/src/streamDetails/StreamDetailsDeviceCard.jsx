import React from "react";
import PropTypes from "prop-types";

import DeviceInfo from "../model/DeviceInfo";
import ButtonInfo from "../general/dashboard/ButtonInfo";
import StreamDeviceCard from "../general/StreamDeviceCard";

export default function StreamDetailsDeviceCard(props) {
  const { cardTitle, device, channel } = props;
  const button = new ButtonInfo(
    `/Devices/Details/${device.serialNumber}`,
    device,
    "View Device"
  );

  return (
    <StreamDeviceCard
      title={cardTitle}
      button={button}
      device={device}
      channel={channel}
    />
  );
}

StreamDetailsDeviceCard.propTypes = {
  cardTitle: PropTypes.string.isRequired,
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  channel: PropTypes.number.isRequired
};
