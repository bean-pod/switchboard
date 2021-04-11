import React from "react";
import { Box, TableContainer } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  ArrowDownward,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";

import MaterialTable from "material-table";
import StreamInfo from "../model/StreamInfo";

export default class StreamTable extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
      toolbar: false,
      headerStyle: {
        backgroundColor: "#f1f1f1",
        fontWeight: "bold"
      },
      filtering: false,
      draggable: false
    };
    this.icons = {
      SortArrow: ArrowDownward,
      FirstPage,
      LastPage,
      NextPage: ChevronRight,
      PreviousPage: ChevronLeft
    };
  }

  getOptions() {
    return this.options;
  }

  getIcons() {
    return this.icons;
  }

  render() {
    const { streams, columns } = this.props;
    return (
      <>
        <Box>
          <TableContainer>
            <MaterialTable
              columns={columns}
              data={streams}
              options={this.getOptions()}
              icons={this.getIcons()}
            />
          </TableContainer>
        </Box>
      </>
    );
  }
}

StreamTable.propTypes = {
  streams: PropTypes.arrayOf(PropTypes.instanceOf(StreamInfo)).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      filtering: PropTypes.bool,
      sorting: PropTypes.bool,
      render: PropTypes.func,
      align: PropTypes.string,
      export: PropTypes.bool
    })
  ).isRequired
};
