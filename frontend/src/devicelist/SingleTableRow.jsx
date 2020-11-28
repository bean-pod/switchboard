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

import PropTypes from "prop-types";
import ActionMenu from "./ActionMenu";
import StatusIndicator from "../General/StatusIndicator";
import ChannelDetailsTable from "./ChannelDetailsTable";
import DeviceInfo from "../model/DeviceInfo";

export default class SingleTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  render() {
    const {
      deviceDetails: { id, name, serialNumber, status, ip, channels }
    } = this.props;
    const { open } = this.state;
    return (
      <>
        <TableRow key={id} className="singleDeviceRow">
          <TableCell
            className="tableCell dropdownButton"
            style={{ width: 1, padding: 0, paddingLeft: 5 }}
          >
            <IconButton onClick={() => this.setState({ open: !open })}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </TableCell>
          <TableCell className="tableCell">{name}</TableCell>
          <TableCell className="tableCell numeric">{serialNumber}</TableCell>
          <TableCell className="tableCell">
            <StatusIndicator status={status} />
          </TableCell>
          <TableCell className="tableCell numeric">{ip}</TableCell>
          <TableCell className="tableCell" align="center">
            <ActionMenu />
          </TableCell>
        </TableRow>
        <TableRow className="deviceDetails">
          <TableCell className="chevronText lightestGrey" colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={2}>
                <Typography variant="h6">Channels</Typography>
                {channels.map((channel) => {
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
SingleTableRow.propTypes = {
  deviceDetails: PropTypes.instanceOf(DeviceInfo).isRequired
};
