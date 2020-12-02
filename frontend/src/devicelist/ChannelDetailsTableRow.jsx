import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
import PropTypes from "prop-types";
import InputChannelInfo from "../model/InputChannelInfo";
import OutputChannelInfo from "../model/OutputChannelInfo";

export default function ChannelDetailsTableRow(props) {
  const {
    channel: { id, name, port }
  } = props;
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{port}</TableCell>
    </TableRow>
  );
}
ChannelDetailsTableRow.propTypes = {
  channel: PropTypes.oneOfType([
    PropTypes.instanceOf(InputChannelInfo),
    PropTypes.instanceOf(OutputChannelInfo)
  ]).isRequired
};
