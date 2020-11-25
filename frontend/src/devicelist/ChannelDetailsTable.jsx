import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import PropTypes from "prop-types";

export default class ChannelDetailsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            <TableCell>{this.props.channel.id}</TableCell>
            <TableCell>{this.props.channel.name}</TableCell>
            <TableCell>{this.props.channel.port}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}
ChannelDetailsTable.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    port: PropTypes.number
  }).isRequired
};
