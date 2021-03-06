import React from "react";
import Proptypes from "prop-types";

import { TableContainer, TableCell, TableRow } from "@material-ui/core";
import ChannelDetailsTable from "../devicelist/ChannelDetailsTable";
import InputChannelInfo from "../model/InputChannelInfo";
import OutputChannelInfo from "../model/OutputChannelInfo";
import StatusIndicator from "../general/StatusIndicator";
import DeviceNameDetail from "./DeviceNameDetail";
import DeviceInfo from "../model/DeviceInfo";

export default class DeviceDetailsConciseRow extends React.Component {
  static getPropertyDisplayName(name) {
    switch (name) {
      case "serialNumber":
        return "Serial Number";
      case "lastCommunication":
        return "Last Communication";
      case "privateIp":
        return "Private IP Address";
      case "publicIp":
        return "Public IP Address";
      case "name":
        return "Name";
      case "status":
        return "Status";
      case "channels":
        return "Channels";
      default:
        return "Additional Info";
    }
  }

  static createInnerTable(value) {
    return (
      <TableContainer>
        <ChannelDetailsTable channels={value} />
      </TableContainer>
    );
  }

  static createTableCellContents(name, value, device) {
    switch (name) {
      case "channels":
        return DeviceDetailsConciseRow.createInnerTable(value);
      case "status":
        return <StatusIndicator status={value} />;
      case "name":
        return (
          <DeviceNameDetail deviceName={value} deviceId={device.serialNumber} />
        );
      default:
        return value;
    }
  }

  render() {
    const { name, value, device } = this.props;
    return (
      <TableRow>
        <TableCell>
          {DeviceDetailsConciseRow.getPropertyDisplayName(name)}
        </TableCell>
        <TableCell align="center">
          {DeviceDetailsConciseRow.createTableCellContents(name, value, device)}
        </TableCell>
      </TableRow>
    );
  }
}

DeviceDetailsConciseRow.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.oneOfType([
    Proptypes.string,
    Proptypes.arrayOf(
      Proptypes.oneOfType([InputChannelInfo, OutputChannelInfo])
    )
  ]).isRequired,
  device: Proptypes.instanceOf(DeviceInfo).isRequired
};
