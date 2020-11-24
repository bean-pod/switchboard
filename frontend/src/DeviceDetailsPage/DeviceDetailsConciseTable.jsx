import React from "react";
import { TableContainer, Table, TableBody, Paper } from "@material-ui/core";
import PropTypes from "prop-types";

import DeviceDetailsConciseRow from "./DeviceDetailsConciseRow";
import DeviceInfo from "../model/DeviceInfo";

export default class DeviceDetailsConciseTable extends React.Component {
  render() {
    return (
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {DeviceInfo.getProperties().map((property) => (
                <DeviceDetailsConciseRow
                  name={property}
                  value={this.props.device[property]}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

DeviceDetailsConciseTable.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
