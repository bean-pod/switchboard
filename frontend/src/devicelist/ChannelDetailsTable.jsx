import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import PropTypes from "prop-types";
import InputChannelInfo from "../model/InputChannelInfo";
import OutputChannelInfo from "../model/OutputChannelInfo";

export default class ChannelDetailsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      channel: { id, name, port }
    } = this.props;
    return (
      <Table style={{ margin: "1em" }} className="flexContents">
        <TableHead>
          <TableRow>
            <TableCell className="lightGrey">ID</TableCell>
            <TableCell className="lightGrey">Name</TableCell>
            <TableCell className="lightGrey">Port</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{port}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
ChannelDetailsTable.propTypes = {
  channel: PropTypes.oneOfType([
    PropTypes.instanceOf(InputChannelInfo),
    PropTypes.instanceOf(OutputChannelInfo)
  ]).isRequired
};
