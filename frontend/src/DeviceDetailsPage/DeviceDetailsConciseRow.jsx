import React from "react";
import { TableContainer, Paper, TableCell, TableRow } from "@material-ui/core";
import ChannelDetailsTable from "../devicelist/ChannelDetailsTable";

export default class DeviceDetailsConciseRow extends React.Component {
  constructor(props) {
    super(props);
    // some prop verification later
  }

  getPropertyDisplayName() {
    switch (this.props.name) {
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

  render() {
    return (
      <>
        <TableRow>
          <TableCell>{this.getPropertyDisplayName()}</TableCell>
          {this.props.name !== "channels" ? (
            <TableCell align="center">{this.props.value}</TableCell>
          ) : (
            <TableCell>
              <TableContainer>
                {this.props.value.map((channel) => {
                  return <ChannelDetailsTable channel={channel} />;
                })}
              </TableContainer>
            </TableCell>
          )}
        </TableRow>
      </>
    );
  }
}
