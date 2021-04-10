import React from "react";
import PropTypes from "prop-types";
import SelectTable from "./SelectTable";
import DeviceInfo from "../../model/DeviceInfo";

export default function SelectDeviceTable(props) {
  const { selectedIndex, setIndex, deviceList } = props;

  const deviceNames = deviceList.map((device) => device.name);
  return (
    <SelectTable
      selectedIndex={selectedIndex}
      setIndex={setIndex}
      items={deviceNames}
    />
  );
}

SelectDeviceTable.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  deviceList: PropTypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired
};
