import React from "react";
import { Box, TableContainer, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

import {
  ExpandLess,
  ExpandMore,
  ArrowDownward,
  FirstPage,
  LastPage,
  ChevronRight,
  ChevronLeft
} from "@material-ui/icons";

import MaterialTable from "material-table";

import StatusIndicator from "../general/StatusIndicator";
import ActionButtons from "./ActionButtons";
import StreamInfo from "../model/StreamInfo";

function getColumnInfo() {
  return [
    {
      title: "ID",
      field: "id"
    },
    {
      title: "Date",
      field: "date"
    },
    {
      title: "Sender",
      field: "sender"
    },
    {
      title: "Receiver",
      field: "receiver"
    },
    {
      title: "Status",
      field: "status",
      render: (rowData) => <StatusIndicator status={rowData.status} />
    },
    {
      title: "Type",
      field: "type"
    },
    {
      title: "Time Elapsed",
      field: "time"
    },
    {
      title: "Actions",
      field: "action",
      filtering: false,
      sorting: false,
      render: () => ActionButtons(),
      align: "center",
      export: false
    }
  ];
}

function getDetailPanel() {
  return [
    {
      icon: ExpandMore,
      openIcon: ExpandLess,
      tooltip: "Show Stream Details",
      render: (rowData) => {
        return (
          <div className="lightestGrey">
            <Typography variant="h6">Stream Details</Typography>
          </div>
        );
      }
    }
  ];
}

function getOptions() {
  return {
    toolbar: false,
    search: true,
    exportButton: true,
    headerStyle: {
      backgroundColor: "#f1f1f1",
      fontWeight: "bold"
    },
    actionsColumnIndex: -1,
    filtering: false,
    draggable: false
  };
}

function getIcons() {
  return {
    SortArrow: ArrowDownward,
    FirstPage,
    LastPage,
    NextPage: ChevronRight,
    PreviousPage: ChevronLeft
  };
}

export default class StreamsTable extends React.Component {
  render() {
    const { streamDetails } = this.props;
    return (
      <>
        <Box>
          <TableContainer>
            <MaterialTable
              columns={getColumnInfo()}
              data={streamDetails}
              detailPanel={getDetailPanel()}
              options={getOptions()}
              icons={getIcons()}
            />
          </TableContainer>
        </Box>
      </>
    );
  }
}

StreamsTable.propTypes = {
  streamDetails: PropTypes.arrayOf(PropTypes.instanceOf(StreamInfo)).isRequired
};
