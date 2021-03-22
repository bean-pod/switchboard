import React from "react";
import PropTypes from "prop-types";

import DeviceInfoTable from "./DeviceDetailsTable";
import DeviceInfo from "../model/DeviceInfo";

export default function DeviceDetailsInfoTable(props) {
  const { device } = props;
  const properties = [
    "name",
    "serialNumber",
    "status",
    "publicIp",
    "privateIp"
  ];
  return <DeviceInfoTable device={device} properties={properties} />;
}

DeviceDetailsInfoTable.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
