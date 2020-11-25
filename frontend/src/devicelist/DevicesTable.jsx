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

export default class DevicesTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
                {this.props.devices.map((device) => {
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
  devices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      serialNumber: PropTypes.string,
      status: PropTypes.string,
      ip: PropTypes.string,
      channels: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          port: PropTypes.number
        })
      )
    })
  ).isRequired
};
