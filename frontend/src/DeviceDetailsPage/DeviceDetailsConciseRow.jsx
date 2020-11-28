import React from "react";
import Proptypes from "prop-types";
import { TableContainer, TableCell, TableRow } from "@material-ui/core";
import ChannelDetailsTable from "../devicelist/ChannelDetailsTable";
import InputChannelInfo from "../model/InputChannelInfo";
import OutputChannelInfo from "../model/OutputChannelInfo";

export default class DeviceDetailsConciseRow extends React.Component {
  static getPropertyDisplayName(name) {
    switch (name) {
      case "serialNumber":
        return "Serial Number";
      case "lastCommunication":
        return "Last Communication";
      case "ip":
        return "IP Address";
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

  createInnerTable(value) {
    return (
      <TableContainer>
        {value.map((channel) => {
          return (
            <ChannelDetailsTable
              channel={channel}
              key={`chDetails_${channel.id}`}
            />
          );
        })}
      </TableContainer>
    );
  }

  render() {
    const { name, value } = this.props;
    return (
      <>
        <TableRow>
          <TableCell>
            {DeviceDetailsConciseRow.getPropertyDisplayName(name)}
          </TableCell>
          {name !== "channels" ? (
            <TableCell align="center">{value}</TableCell>
          ) : (
            <TableCell>{this.createInnerTable(value)}</TableCell>
          )}
        </TableRow>
      </>
    );
  }
}

DeviceDetailsConciseRow.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.arrayOf(
    Proptypes.oneOfType([InputChannelInfo, OutputChannelInfo])
  ).isRequired
};
