import React from "react";
import PropTypes from "prop-types";

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import DeviceInfo from "../model/DeviceInfo";

export default function StreamDeviceDetails(props) {
  const { device } = props;

  return (
    <>
      <TableContainer style={{ maxHeight: 300 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{device.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>{device.serialNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

StreamDeviceDetails.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
