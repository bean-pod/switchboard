import React from "react";
import { TableContainer, Table, TableBody, Paper } from "@material-ui/core";

import DeviceDetailsConciseRow from "./DeviceDetailsConciseRow";
import DeviceInfo from "../model/DeviceInfo";

export default class DeviceDetailsConciseTable extends React.Component {
  constructor(props) {
    super(props);
    // some prop verification later
  }

  render() {
    // const properties = Object.keys(this.props.device);
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
