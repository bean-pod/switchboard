import React from "react";
import { Box, TableContainer } from "@material-ui/core";
import PropTypes from "prop-types";
import {
  Search,
  ArrowDownward,
  Clear,
  SaveAlt,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";
import MaterialTable from "material-table";
import LogInfo from "../model/LogInfo";

export default class LogsTable extends React.Component {
  constructor(props) {
    super(props);
    this.options = {
      toolbar: true,
      showTitle: false,
      search: true,
      exportButton: true,
      headerStyle: {
        backgroundColor: "#f1f1f1",
        fontWeight: "bold"
      },
      filtering: false,
      draggable: false,
      maxBodyHeight: "auto",
      minBodyHeight: "auto"
    };
    this.icons = {
      Search,
      ResetSearch: Clear,
      SortArrow: ArrowDownward,
      Export: SaveAlt,
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
    const { columns, logs, title } = this.props;
    return (
      <>
        <Box>
          <TableContainer>
            <MaterialTable
              title={title}
              columns={columns}
              data={logs}
              options={this.getOptions()}
              icons={this.getIcons()}
            />
          </TableContainer>
          <div className="textAlignRightPadded">
            {"Time Zone: ".concat(
              Intl.DateTimeFormat().resolvedOptions().timeZone
            )}
          </div>
        </Box>
      </>
    );
  }
}

LogsTable.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.instanceOf(LogInfo)).isRequired,
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
      sorting: PropTypes.bool,
      cellStyle: PropTypes.shape({
        width: PropTypes.string
      })
    })
  ).isRequired
};

LogsTable.defaultProps = {
  title: "Logs"
};
