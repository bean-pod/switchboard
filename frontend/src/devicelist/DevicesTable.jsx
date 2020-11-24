import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@material-ui/core";

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
