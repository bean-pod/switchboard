import React from "react";
import PropTypes from "prop-types";
import SelectTable from "./SelectTable";
import DeviceInfo from "../../model/DeviceInfo";

export default function SelectChannelTable(props) {
  const { selectedIndex, setIndex, deviceList, deviceIndex } = props;

  console.log(`selectCahnelTable ${deviceIndex}`);
  const channelNames = deviceList[deviceIndex].channels.map(
    (channel) => channel.name
  );
  return (
    <SelectTable
      selectedIndex={selectedIndex}
      setIndex={setIndex}
      items={channelNames}
    />
  );
}

SelectChannelTable.propTypes = {
  selectedIndex: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
  deviceIndex: PropTypes.number.isRequired,
  deviceList: PropTypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired
};
