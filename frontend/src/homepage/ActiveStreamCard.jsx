import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";
import StreamsTableWrapper from "../streamlist/StreamsTableWrapper";

import StatusIndicator from "../general/StatusIndicator";
import StreamDetailsButton from "../streamlist/StreamDetailsButton";

import * as StreamApi from "../api/StreamApi";

export default function ActiveStreamCard() {
  const dataSource = StreamApi;
  const simplifiedColumns = [
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

  return (
    <DashboardCard title="Active Streams" style={{ height: "100%" }}>
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={12}>
          <StreamsTableWrapper
            dataSource={dataSource}
            columns={simplifiedColumns}
          />
        </Grid>
        <Grid item xs={4}>
          <DashBoardButton href="/Streams">See More</DashBoardButton>
        </Grid>
        <Grid item xs={4}>
          <DashBoardButton href="/Streams/New">Start Stream</DashBoardButton>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
