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
import StatusIndicator from "../general/StatusIndicator";
import ActionButtons from "./ActionButtons";
import StreamInfo from "../model/StreamInfo";

export default class SingleStreamRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  rowExtras(extras) {
    return extras.join(" ");
  }

  render() {
    const {
      streamDetails: {
        date,
        id,
        receiver: { name: receiverName },
        sender: { name: senderName },
        status,
        type,
        time,
        extras
      }
    } = this.props;
    const { open } = this.state;
    return (
      <>
        <TableRow key={id} className="singleStreamRow">
          <TableCell
            className="tableCell dropdownButton"
            style={{ width: 1, padding: 0, paddingLeft: 5 }}
          >
            <IconButton onClick={() => this.setState({ open: !open })}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </TableCell>
          <TableCell className="tableCell numeric">{id}</TableCell>
          <TableCell className="tableCell">{date}</TableCell>
          <TableCell className="tableCell">{senderName}</TableCell>
          <TableCell className="tableCell">{receiverName}</TableCell>
          <TableCell className="tableCell">
            <StatusIndicator status={status} />
          </TableCell>
          <TableCell className="tableCell">{type}</TableCell>
          <TableCell className="tableCell">{time}</TableCell>
          <TableCell className="tableCell actionButtons">
            {ActionButtons()}
          </TableCell>
        </TableRow>
        <TableRow className="streamDetails">
          <TableCell className="chevronText lightestGrey" colSpan={9}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={2}>
                <Typography variant="caption">
                  {this.rowExtras(extras)}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
}
SingleStreamRow.propTypes = {
  streamDetails: PropTypes.instanceOf(StreamInfo).isRequired
};
