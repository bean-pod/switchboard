import React from "react";
import Proptypes from "prop-types";

import { TableContainer, TableCell, TableRow } from "@material-ui/core";
import ChannelDetailsTable from "../../devicelist/ChannelDetailsTable";
import InputChannelInfo from "../../model/InputChannelInfo";
import OutputChannelInfo from "../../model/OutputChannelInfo";
import StatusIndicator from "../../general/StatusIndicator";
import DeviceName from "../DeviceName";
import DeviceInfo from "../../model/DeviceInfo";

export default class DeviceInfoRow extends React.Component {
  constructor(props) {
    super(props);
    this.getPropertyDisplayName = this.getPropertyDisplayName.bind(this);
    this.createInnerTable = this.createInnerTable.bind(this);
    this.createTableCellContents = this.createTableCellContents.bind(this);
  }

  getPropertyDisplayName() {
    const { name } = this.props;
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

  createInnerTable() {
    const { value } = this.props;
    return (
      <TableContainer>
        <ChannelDetailsTable channels={value} />
      </TableContainer>
    );
  }

  createTableCellContents() {
    const {
      name,
      value,
      device: { serialNumber }
    } = this.props;
    switch (name) {
      case "channels":
        return this.createInnerTable();
      case "status":
        return <StatusIndicator status={value} />;
      case "name":
        return <DeviceName deviceName={value} deviceId={serialNumber} />;
      default:
        return value;
    }
  }

  render() {
    return (
      <TableRow>
        <TableCell>{this.getPropertyDisplayName()}</TableCell>
        <TableCell align="center">{this.createTableCellContents()}</TableCell>
      </TableRow>
    );
  }
}

DeviceInfoRow.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.oneOfType([
    Proptypes.string,
    Proptypes.arrayOf(
      Proptypes.oneOfType([InputChannelInfo, OutputChannelInfo])
    )
  ]).isRequired,
  device: Proptypes.instanceOf(DeviceInfo).isRequired
};
