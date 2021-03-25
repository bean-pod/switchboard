import React from "react";
import PropTypes from "prop-types";

import DeviceInfo from "../model/DeviceInfo";

import SimpleTable from "../general/simpleTable/SimpleTable";
import zipProperties from "../general/simpleTable/SimpleTableUtil";

export default function StreamDeviceDetails(props) {
  const { device, channel } = props;

  const propertyNames = ["Name", "Serial Number", "Channel"];
  const properties = [device.name, device.serialNumber, channel];

  const propertyPairs = zipProperties(propertyNames, properties);

  return (
    <>
      <SimpleTable propertyPairs={propertyPairs} />
    </>
  );
}

StreamDeviceDetails.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  channel: PropTypes.number.isRequired
};
