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

import StatusIndicator from "../StatusIndicator";
import ActionButtons from "./ActionButtons";

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
    return (
      <>
        <TableRow key={this.props.streamDetails.id} className="singleStreamRow">
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
          <TableCell className="tableCell numeric">
            {this.props.streamDetails.id}
          </TableCell>
          <TableCell className="tableCell">
            {this.props.streamDetails.date}
          </TableCell>
          <TableCell className="tableCell">
            {this.props.streamDetails.sender.name}
          </TableCell>
          <TableCell className="tableCell">
            {this.props.streamDetails.receiver.name}
          </TableCell>
          <TableCell className="tableCell">
            <StatusIndicator status={this.props.streamDetails.status} />
          </TableCell>
          <TableCell className="tableCell">
            {this.props.streamDetails.type}
          </TableCell>
          <TableCell className="tableCell">
            {this.props.streamDetails.time}
          </TableCell>
          <TableCell className="tableCell actionButtons">
            {ActionButtons()}
          </TableCell>
        </TableRow>
        <TableRow className="streamDetails">
          <TableCell className="chevronText lightestGrey" colSpan={9}>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <Box margin={2}>
                <Typography variant="caption">
                  {this.rowExtras(this.props.streamDetails.extras)}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
}
