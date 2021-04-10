import React from "react";
import StreamsTableWrapper from "./StreamsTableWrapper";
import StatusIndicator from "../general/StatusIndicator";
import StreamDetailsButton from "./StreamDetailsButton";
import * as streamDataSource from "../api/StreamApi";

export default class DetailedStreamsTableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.detailedColumns = [
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
  }

  getDetailedColumns() {
    return this.detailedColumns;
  }

  render() {
    return (
      <StreamsTableWrapper
        dataSource={streamDataSource}
        columns={this.getDetailedColumns()}
      />
    );
  }
}
