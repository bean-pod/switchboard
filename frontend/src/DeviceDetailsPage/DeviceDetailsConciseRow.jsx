import React from "react";
import Proptypes from "prop-types";
import { TableContainer, TableCell, TableRow } from "@material-ui/core";
import ChannelDetailsTable from "../devicelist/ChannelDetailsTable";
import InputChannelInfo from "../model/InputChannelInfo";
import OutputChannelInfo from "../model/OutputChannelInfo";

export default class DeviceDetailsConciseRow extends React.Component {
  getPropertyDisplayName() {
    const { name } = this.props;
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

  render() {
    const { name, value } = this.props;
    return (
      <>
        <TableRow>
          <TableCell>{this.getPropertyDisplayName()}</TableCell>
          {name !== "channels" ? (
            <TableCell align="center">{value}</TableCell>
          ) : (
            <TableCell>
              <TableContainer>
                {value.map((channel, index) => {
                  return (
                    <ChannelDetailsTable
                      channel={channel}
                      key={`chDetails_${index}`}
                    />
                  );
                })}
              </TableContainer>
            </TableCell>
          )}
        </TableRow>
      </>
    );
  }
}

DeviceDetailsConciseRow.propTypes = {
  name: Proptypes.instanceOf(Proptypes.string).isRequired,
  value: Proptypes.arrayOf(
    Proptypes.oneOfType([InputChannelInfo, OutputChannelInfo])
  ).isRequired
};
