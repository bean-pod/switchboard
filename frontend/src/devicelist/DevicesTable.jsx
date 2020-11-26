import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

import PropTypes from "prop-types";
import SingleTableRow from "./SingleTableRow";
import HeadCells from "./HeadCells";
import DeviceInfo from "../model/DeviceInfo";

export default class DevicesTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { devices } = this.props;
    return (
      <>
        <Box>
          <TableContainer style={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <HeadCells />
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device) => {
                  return (
                    <SingleTableRow
                      key={`DeviceListRow_${device.serialNumber}`}
                      deviceDetails={device}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
  }
}
DevicesTable.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.instanceOf(DeviceInfo)).isRequired
};
