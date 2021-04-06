import React from "react";
import { Grid } from "@material-ui/core";

import DashboardCard from "../general/dashboard/DashboardCard";
import DashBoardButton from "../general/dashboard/DashboardButton";
import SimpleStreamsTableWrapper from "../streamlist/SimpleStreamsTableWrapper";

export default function ActiveStreamCard() {
  return (
    <DashboardCard title="Active Streams" style={{ height: "100%" }}>
      <Grid item xs={12}>
        <SimpleStreamsTableWrapper />
      </Grid>
      <Grid item xs={4}>
        <DashBoardButton href="/Streams">See more</DashBoardButton>
      </Grid>
      <Grid item xs={4}>
        <DashBoardButton href="/Streams/New">Start Stream</DashBoardButton>
      </Grid>
    </DashboardCard>
  );
}
