import React from "react";
import { TableContainer, Table, TableBody } from "@material-ui/core";
import PropTypes from "prop-types";

import DeviceDetailsConciseRow from "./DeviceDetailsConciseRow";
import DeviceInfo from "../model/DeviceInfo";

export default function DeviceDetailsConciseTable(props) {
  const { device } = props;
  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {DeviceInfo.getConciseProperties().map((property) => (
              <DeviceDetailsConciseRow
                name={property}
                value={device[property]}
                key={`device_${property}`}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

DeviceDetailsConciseTable.propTypes = {
  device: PropTypes.instanceOf(DeviceInfo).isRequired
};
