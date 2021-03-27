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

import StatusIndicator from "../general/StatusIndicator";
import StreamDetailsButton from "./StreamDetailsButton";
import StreamInfo from "../model/StreamInfo";

export default class StreamsTable extends React.Component {
  constructor(props) {
    super(props);

    this.columnInfo = [
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
        title: "Actions",
        field: "action",
        filtering: false,
        sorting: false,
        render: function Actions(rowData) {
          return <StreamDetailsButton streamInfo={rowData} />;
        },
        align: "center",
        export: false
      }
    ];
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

  getColumnInfo() {
    return this.columnInfo;
  }

  getOptions() {
    return this.options;
  }

  getIcons() {
    return this.icons;
  }

  render() {
    const { streams } = this.props;
    return (
      <>
        <Box>
          <TableContainer>
            <MaterialTable
              columns={this.getColumnInfo()}
              data={streams}
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

StreamsTable.propTypes = {
  streams: PropTypes.arrayOf(PropTypes.instanceOf(StreamInfo)).isRequired
};
