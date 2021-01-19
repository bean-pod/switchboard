import React from "react";
import { Table, TableBody, TableHead } from "@material-ui/core";
import PropTypes from "prop-types";
import InputChannelInfo from "../model/InputChannelInfo";
import OutputChannelInfo from "../model/OutputChannelInfo";
import ChannelDetailsTableHead from "./ChannelDetailsTableHead";
import ChannelDetailsTableRow from "./ChannelDetailsTableRow";

export default function ChannelDetailsTable(props) {
  const { channels } = props;
  return (
    <Table className="flexContents">
      <TableHead>
        <ChannelDetailsTableHead />
      </TableHead>
      <TableBody>
        {channels.map((channel) => {
          return (
            <ChannelDetailsTableRow channel={channel} key={channel.name} />
          );
        })}
      </TableBody>
    </Table>
  );
}
ChannelDetailsTable.propTypes = {
  channels: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.instanceOf(InputChannelInfo),
      PropTypes.instanceOf(OutputChannelInfo)
    ])
  ).isRequired
};
