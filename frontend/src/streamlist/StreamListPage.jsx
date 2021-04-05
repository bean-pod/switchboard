import React from "react";
import Page from "../general/Page";
import StreamsTableWrapper from "./StreamsTableWrapper";
import StatusIndicator from "../general/StatusIndicator";
import StreamDetailsButton from "./StreamDetailsButton";
import * as streamDataSource from "../api/StreamApi";

export default function StreamListPage() {
  const breadcrumbs = [
    ["Home", "/Home"],
    ["Active Streams", "/Streams"]
  ];
  const detailedColumns = [
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
        return <StreamDetailsButton streamInfo={rowData} />;
      },
      align: "center",
      export: false
    }
  ];
  return (
    <Page title="Active Streams" breadcrumbs={breadcrumbs}>
      <StreamsTableWrapper
        dataSource={streamDataSource}
        columns={detailedColumns}
      />
    </Page>
  );
}
