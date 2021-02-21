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

function getColumnInfo() {
  return [
    {
      title: "ID",
      field: "id",
      cellStyle: { width: "10%" }
    },
    {
      title: "Date",
      field: "dateTime",
      cellStyle: { width: "15%" }
    },
    {
      title: "Level",
      field: "level",
      cellStyle: { width: "10%" }
    },
    {
      title: "Message",
      field: "message",
      sorting: false
    }
  ];
}

function getOptions(bodyHeight) {
  return {
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
    maxBodyHeight: bodyHeight,
    minBodyHeight: bodyHeight
  };
}

function getIcons() {
  return {
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

export default function LogsTable(props) {
  const { logs, bodyHeight, title } = props;
  return (
    <>
      <Box>
        <TableContainer>
          <MaterialTable
            title={title}
            columns={getColumnInfo()}
            data={logs}
            options={getOptions(bodyHeight)}
            icons={getIcons()}
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

LogsTable.propTypes = {
  logs: PropTypes.arrayOf(PropTypes.instanceOf(LogInfo)).isRequired,
  bodyHeight: PropTypes.string,
  title: PropTypes.string
};

LogsTable.defaultProps = {
  bodyHeight: "auto",
  title: "Logs"
};
