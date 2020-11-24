import React from "react";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";

import { ExpandLess, ExpandMore } from "@material-ui/icons/";

import ActionMenu from "./ActionMenu";
import StatusIndicator from "../StatusIndicator";
import ChannelDetailsTable from "./ChannelDetailsTable";

export default class SingleTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    return (
      <>
        <TableRow key={this.props.deviceDetails.id} className="singleDeviceRow">
          <TableCell
            className="tableCell dropdownButton"
            style={{ width: 1, padding: 0, paddingLeft: 5 }}
          >
            <IconButton
              onClick={() => this.setState({ open: !this.state.open })}
            >
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </TableCell>
          <TableCell className="tableCell">
            {this.props.deviceDetails.name}
          </TableCell>
          <TableCell className="tableCell numeric">
            {this.props.deviceDetails.serialNumber}
          </TableCell>
          <TableCell className="tableCell">
            <StatusIndicator status={this.props.deviceDetails.status} />
          </TableCell>
          <TableCell className="tableCell numeric">
            {this.props.deviceDetails.ip}
          </TableCell>
          <TableCell className="tableCell" align="center">
            <ActionMenu />
          </TableCell>
        </TableRow>
        <TableRow className="deviceDetails">
          <TableCell className="chevronText lightestGrey" colSpan={7}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Box margin={2}>
                <Typography variant="h6">Channels</Typography>
                {this.props.deviceDetails.channels.map((channel) => {
                  return (
                    <ChannelDetailsTable
                      channel={channel}
                      key={`ch_${channel.id}_p${channel.port}`}
                    />
                  );
                })}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
}
