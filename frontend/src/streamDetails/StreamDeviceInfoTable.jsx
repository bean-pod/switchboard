import React from "react";
import PropTypes from "prop-types";

import DeviceInfoTable from "../deviceDetailsPage/DeviceInfoTable/DeviceInfoTable";
import DeviceInfo from "../model/DeviceInfo";

export default function StreamDeviceInfoTable(props) {
  const { device, channel } = props;

  const properties = ["name", "serialNumber", "channel"];
  return (
    <DeviceInfoTable
      device={device}
      properties={properties}
      activeChannel={channel}
    />
  );
}

StreamDeviceInfoTable.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  channel: PropTypes.number.isRequired
};
