import React from "react";
import { TableContainer, Table, TableBody } from "@material-ui/core";
import PropTypes from "prop-types";

import DeviceInfoRow from "./DeviceInfoRow";
import DeviceInfo from "../../model/DeviceInfo";

export default function DeviceInfoTable(props) {
  const { device, properties, activeChannel } = props;
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {properties.map((property) => (
            <DeviceInfoRow
              name={property}
              value={property === "channel" ? activeChannel : device[property]}
              device={device}
              key={`device_${property}`}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DeviceInfoTable.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired,
  properties: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeChannel: PropTypes.number
};
DeviceInfoTable.defaultProps = {
  activeChannel: -1
};
