import React from "react";
import PropTypes from "prop-types";
import SelectTable from "./SelectTable";
import DeviceInfo from "../../model/DeviceInfo";

export default function SelectChannelTable(props) {
  const {
    selectedIndex,
    setIndex,
    device: { channels }
  } = props;

  const channelNames = channels.map((channel) => channel.name);
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
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
