import React from "react";
import StreamTableWrapper from "./StreamTableWrapper";
import StatusIndicator from "../general/StatusIndicator";
import StreamDetailsButton from "./StreamDetailsButton";
import * as streamDataSource from "../api/StreamApi";

export default class SimpleStreamTableWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.simpleColumns = [
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

  getSimpleColumns() {
    return this.simpleColumns;
  }

  render() {
    return (
      <StreamTableWrapper
        dataSource={streamDataSource}
        columns={this.getSimpleColumns()}
      />
    );
  }
}
