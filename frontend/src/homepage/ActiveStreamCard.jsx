import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";
import StreamsTableWrapper from "../streamlist/StreamsTableWrapper";

import * as StreamApi from "../api/StreamApi";

export default function ActiveStreamCard() {
  const dataSource = StreamApi;

  return (
    <DashboardCard title="Active Streams" style={{ height: "100%" }}>
      <Grid container justify="center" direction="row" spacing={3}>
        <Grid item xs={12}>
          <StreamsTableWrapper dataSource={dataSource} />
        </Grid>
        <Grid item xs={4}>
          <DashBoardButton href="/Streaming">See more</DashBoardButton>
        </Grid>
        <Grid item xs={4}>
          {
            // TODO make it create stream
          }
          <DashBoardButton href="/Streaming">Start Stream</DashBoardButton>
        </Grid>
      </Grid>
    </DashboardCard>
  );
}
