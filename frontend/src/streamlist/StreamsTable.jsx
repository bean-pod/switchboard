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
import DeleteStream from "./DeleteStream";
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
      field: "sender.name"
    },
    {
      title: "Receiver",
      field: "receiver.name"
    },
    {
      title: "Status",
      field: "status",
      render: function Status(rowData) {
        return <StatusIndicator status={rowData.status} />;
      }
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
      render: function Actions(rowData) {
        return <DeleteStream deleteId={rowData.id} />;
      },
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
      render: function DetailPanel(rowData) {
        return (
          <div className="lightestGrey">
            <Typography variant="h6">{rowData.extras}</Typography>
          </div>
        );
      }
    }
  ];
}

function getOptions() {
  return {
    toolbar: false,
    headerStyle: {
      backgroundColor: "#f1f1f1",
      fontWeight: "bold"
    },
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

export default function StreamsTable(props) {
  const { streams } = props;
  return (
    <>
      <Box>
        <div className="textAlignRight">Time Zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</div>
        <TableContainer>
          <MaterialTable
            columns={getColumnInfo()}
            data={streams}
            detailPanel={getDetailPanel()}
            options={getOptions()}
            icons={getIcons()}
          />
        </TableContainer>
      </Box>
    </>
  );
}

StreamsTable.propTypes = {
  streams: PropTypes.arrayOf(PropTypes.instanceOf(StreamInfo)).isRequired
};
